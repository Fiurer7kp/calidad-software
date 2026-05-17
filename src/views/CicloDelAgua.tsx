import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import GuideMascot from "../components/GuideMascot";
import Quiz, { QuizQuestion } from "../components/Quiz";

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "¿Cuál es la primera fase del ciclo del agua?",
    options: ["Precipitación", "Condensación", "Evaporación", "Acumulación"],
    correct: 2,
    explanation: "La evaporación es cuando el calor del sol convierte el agua líquida en vapor que sube hacia las nubes.",
  },
  {
    question: "¿Qué ocurre durante la condensación?",
    options: ["El agua cae como lluvia", "El vapor se convierte en pequeñas gotas que forman nubes", "El agua se evapora del mar", "El agua se acumula en ríos"],
    correct: 1,
    explanation: "En la condensación, el vapor de agua sube y se enfría, formando pequeñas gotas que crean las nubes.",
  },
  {
    question: "¿Cómo se llama la fase en que el agua cae de las nubes?",
    options: ["Evaporación", "Condensación", "Acumulación", "Precipitación"],
    correct: 3,
    explanation: "La precipitación es cuando el agua cae de las nubes en forma de lluvia, nieve o granizo.",
  },
  {
    question: "¿Cuántas fases tiene el ciclo del agua en esta simulación?",
    options: ["2", "3", "4", "5"],
    correct: 2,
    explanation: "Las 4 fases son: evaporación → condensación → precipitación → acumulación. ¡Y luego empieza de nuevo!",
  },
];

const PARTICLE_COUNT = 200;
const WATER_Y = -2.5;
const CLOUD_Y = 2.8;

// Palette: water blue, cyan, teal, lavender, white
const COLORS = [0x38bdf8, 0x22d3ee, 0x2dd4bf, 0xa78bfa, 0x818cf8, 0xffffff];

interface Particle {
  phase: "evaporation" | "condensation" | "precipitation" | "accumulation";
  progress: number; // 0..1 position along its phase path
  speed: number;
  x: number; // horizontal lane
  color: number;
}

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    phase: "evaporation",
    progress: Math.random(),
    speed: 0.002 + Math.random() * 0.004,
    x: (Math.random() - 0.5) * 7,
    color: COLORS[i % COLORS.length],
  }));
}

export default function CicloDelAgua() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const pausedRef = useRef(false);
  const speedRef = useRef(1);
  const rotHRef = useRef(0.52);   // ~30°
  const rotVRef = useRef(-0.35);  // ~-20°
  const pivotRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<Particle[]>(makeParticles());
  const instancedRef = useRef<THREE.InstancedMesh | null>(null);

  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [rotH, setRotH] = useState(30);
  const [rotV, setRotV] = useState(-20);
  const [cycles, setCycles] = useState(0);
  const cyclesRef = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(stage.clientWidth, stage.clientHeight);
    renderer.setClearColor(0x0a0f2e);
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f2e);

    const camera = new THREE.PerspectiveCamera(50, stage.clientWidth / stage.clientHeight, 0.1, 200);
    camera.position.set(0, 1, 10);
    camera.lookAt(0, 0, 0);

    /* ── Pivot group (rotatable) ── */
    const pivot = new THREE.Group();
    scene.add(pivot);
    pivotRef.current = pivot;

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const sun = new THREE.DirectionalLight(0xffeedd, 1.2);
    sun.position.set(4, 6, 4);
    scene.add(sun);

    /* ── Sun mesh ── */
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    sunMesh.position.set(3.5, 3, -1);
    scene.add(sunMesh);

    // Sun corona
    const coronaMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.25 })
    );
    coronaMesh.position.copy(sunMesh.position);
    scene.add(coronaMesh);

    /* ── Water plane ── */
    const waterGeo = new THREE.BoxGeometry(9, 0.5, 3);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9, transparent: true, opacity: 0.85, roughness: 0.3, metalness: 0.1
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(0, WATER_Y - 0.25, 0);
    pivot.add(water);

    // Water wave lines
    for (let i = 0; i < 5; i++) {
      const lineGeo = new THREE.BufferGeometry();
      const pts: number[] = [];
      for (let x = -4.5; x <= 4.5; x += 0.5) {
        pts.push(x, WATER_Y + 0.05 + Math.sin(i * 1.2 + x * 0.8) * 0.06, i * 0.3 - 0.6);
      }
      lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
      pivot.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.5 })));
    }

    /* ── Instanced particles ── */
    const pGeo = new THREE.SphereGeometry(0.09, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const instanced = new THREE.InstancedMesh(pGeo, pMat, PARTICLE_COUNT);
    instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    pivot.add(instanced);
    instancedRef.current = instanced;

    // Set per-instance colors
    const colorAttr = new THREE.InstancedBufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3);
    const tmpColor = new THREE.Color();
    particlesRef.current.forEach((p, i) => {
      tmpColor.setHex(p.color);
      colorAttr.setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
    });
    instanced.instanceColor = colorAttr;

    /* ── Animation ── */
    const dummy = new THREE.Object3D();
    let newCycles = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      // Rotate pivot
      if (pivotRef.current) {
        pivotRef.current.rotation.y = rotHRef.current;
        pivotRef.current.rotation.x = rotVRef.current;
      }

      if (!pausedRef.current) {
        particlesRef.current.forEach((p, i) => {
          p.progress += p.speed * speedRef.current;

          let px = p.x, py = 0;

          if (p.phase === "evaporation") {
            // Rise from water to cloud
            py = THREE.MathUtils.lerp(WATER_Y, CLOUD_Y, p.progress);
            px = p.x + Math.sin(p.progress * Math.PI * 3) * 0.3;
            if (p.progress >= 1) {
              p.phase = "condensation";
              p.progress = 0;
              p.x = (Math.random() - 0.5) * 7;
              newCycles++;
            }
          } else if (p.phase === "condensation") {
            // Float in cloud zone
            py = CLOUD_Y - Math.sin(p.progress * Math.PI) * 0.4;
            px = p.x + Math.cos(p.progress * Math.PI * 4) * 0.2;
            if (p.progress >= 1) {
              p.phase = "precipitation";
              p.progress = 0;
            }
          } else if (p.phase === "precipitation") {
            // Fall back down
            py = THREE.MathUtils.lerp(CLOUD_Y, WATER_Y, p.progress);
            px = p.x + Math.sin(p.progress * Math.PI * 2) * 0.1;
            if (p.progress >= 1) {
              p.phase = "accumulation";
              p.progress = 0;
            }
          } else {
            // Brief accumulation on water surface
            py = WATER_Y + 0.05;
            px = p.x;
            if (p.progress >= 0.3) {
              p.phase = "evaporation";
              p.progress = Math.random() * 0.3;
              p.x = (Math.random() - 0.5) * 7;
              p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
              tmpColor.setHex(p.color);
              (instanced.instanceColor as THREE.InstancedBufferAttribute).setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
            }
          }

          dummy.position.set(px, py, (Math.random() - 0.5) * 0.02);
          const scale = p.phase === "precipitation" ? 1.2 : 1;
          dummy.scale.setScalar(scale);
          dummy.updateMatrix();
          instanced.setMatrixAt(i, dummy.matrix);
        });

        instanced.instanceMatrix.needsUpdate = true;
        if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;

        if (newCycles > 0) {
          cyclesRef.current += newCycles;
          newCycles = 0;
          setCycles(cyclesRef.current);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(() => {
      renderer.setSize(stage.clientWidth, stage.clientHeight);
      camera.aspect = stage.clientWidth / stage.clientHeight;
      camera.updateProjectionMatrix();
    });
    ro.observe(stage);

    return () => {
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      ro.disconnect();
      if (stage.contains(renderer.domElement)) stage.removeChild(renderer.domElement);
    };
  }, []);

  const togglePause = useCallback(() => {
    pausedRef.current = !pausedRef.current;
    setPaused((p) => !p);
  }, []);

  const changeSpeed = useCallback((v: number) => {
    speedRef.current = v;
    setSpeed(v);
  }, []);

  const resetView = useCallback(() => {
    rotHRef.current = 0.52;
    rotVRef.current = -0.35;
    setRotH(30);
    setRotV(-20);
  }, []);

  const handleRotH = (v: number) => {
    rotHRef.current = (v * Math.PI) / 180;
    setRotH(v);
  };

  const handleRotV = (v: number) => {
    rotVRef.current = (v * Math.PI) / 180;
    setRotV(v);
  };

  return (
    <div className="bg-[#0d1117] min-h-full text-white">
      <div className="px-4 pt-4">
        <GuideMascot
          mood="excited"
          message="¡Observa cómo las partículas suben (evaporación), se juntan en nubes (condensación), caen como lluvia (precipitación) y vuelven al agua (acumulación). ¡Es el ciclo del agua en acción!"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 p-4">

        {/* Canvas + sliders */}
        <div className="flex-1 flex flex-col gap-3">
          <div
            ref={stageRef}
            className="w-full rounded-xl overflow-hidden border border-blue-900"
            style={{ height: 400 }}
          />

          {/* Rotation sliders */}
          <div className="bg-slate-800 rounded-xl px-4 py-3 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 flex items-center gap-1">🔄 Rotación Horizontal.</span>
              <span className="text-blue-400 font-bold">{rotH}°</span>
            </div>
            <input type="range" min={-180} max={180} value={rotH}
              onChange={(e) => handleRotH(Number(e.target.value))}
              className="w-full accent-blue-500" />

            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-slate-300 flex items-center gap-1">↕ Rotación Vertical</span>
              <span className="text-blue-400 font-bold">{rotV}°</span>
            </div>
            <input type="range" min={-90} max={90} value={rotV}
              onChange={(e) => handleRotV(Number(e.target.value))}
              className="w-full accent-blue-500" />
          </div>
        </div>

        {/* Controls panel */}
        <div className="w-full md:w-64 flex flex-col gap-3">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">🎮 Controles</h2>

            {/* Pause */}
            <button
              onClick={togglePause}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white flex items-center justify-center gap-2 mb-4 transition"
            >
              {paused ? "▶ Reanudar" : "⏸ Pausar"}
            </button>

            {/* Speed */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="flex items-center gap-1 text-slate-300">⚡ Velocidad de simulación</span>
                <span className="text-blue-400 font-bold">{speed.toFixed(1)}x</span>
              </div>
              <input type="range" min={0.5} max={2} step={0.5} value={speed}
                onChange={(e) => changeSpeed(Number(e.target.value))}
                className="w-full accent-blue-500" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>🐢 Lento</span>
                <span>🚶 Normal</span>
                <span>🚀 Rápido</span>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={resetView}
              className="w-full py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold flex items-center justify-center gap-2 mt-3 transition"
            >
              ↻ Reiniciar Vista
            </button>
          </div>

          {/* Stats */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="font-bold text-sm text-slate-300 mb-2">📊 Estadísticas</h3>
            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Partículas activas</span>
                <span className="text-blue-400 font-bold">{PARTICLE_COUNT}</span>
              </div>
              <div className="flex justify-between">
                <span>Ciclos completados</span>
                <span className="text-green-400 font-bold">{cycles}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="font-bold text-sm mb-2 flex items-center gap-1">💡 Instrucciones</h3>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>🎮 Usa los controles para pausar o ajustar la velocidad</li>
              <li>🔄 Gira la escena con los sliders de rotación</li>
              <li>💧 Observa las 4 fases: evaporación → condensación → precipitación → acumulación</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="px-4 pb-6">
        <Quiz title="Quiz del Ciclo del Agua" questions={QUIZ_QUESTIONS} />
      </div>
    </div>
  );
}
