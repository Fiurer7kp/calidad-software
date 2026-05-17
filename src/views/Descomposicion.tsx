import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import GuideMascot from "../components/GuideMascot";
import Quiz, { QuizQuestion } from "../components/Quiz";

/* ── Datos de cada figura ─────────────────────────────────── */
const FIGURES = {
  cubo: {
    label: "Cubo",
    caras: 6, aristas: 12, vertices: 8,
    icon: "🟦",
    description: "Un cubo tiene 6 caras cuadradas, 12 aristas y 8 vértices",
    euler: "6 - 12 + 8 = 2 ✓",
    buildGeo: () => new THREE.BoxGeometry(1.8, 1.8, 1.8),
  },
  piramide: {
    label: "Pirámide Triangular",
    caras: 4, aristas: 6, vertices: 4,
    icon: "🔺",
    description: "Una pirámide triangular (tetraedro) tiene 4 caras triangulares, 6 aristas y 4 vértices",
    euler: "4 - 6 + 4 = 2 ✓",
    buildGeo: () => new THREE.ConeGeometry(1.2, 2, 3),
  },
  cono: {
    label: "Cono",
    caras: 2, aristas: 1, vertices: 1,
    icon: "🔻",
    description: "Un cono tiene 2 caras (base circular y superficie lateral), 1 arista circular y 1 vértice en el ápice",
    euler: "2 - 1 + 1 = 2 ✓",
    buildGeo: () => new THREE.ConeGeometry(1.2, 2.2, 64),
  },
} as const;

type FigKey = keyof typeof FIGURES;

/* ── Vistas de cámara ─────────────────────────────────────── */
const VIEWS = [
  { label: "Frontal",     pos: [0, 0, 4]    as [number,number,number], up: [0,1,0] as [number,number,number] },
  { label: "Lateral",     pos: [4, 0, 0]    as [number,number,number], up: [0,1,0] as [number,number,number] },
  { label: "Superior",    pos: [0, 4, 0.01] as [number,number,number], up: [0,0,-1] as [number,number,number] },
  { label: "Perspectiva", pos: [3, 2.5, 3]  as [number,number,number], up: [0,1,0] as [number,number,number] },
];

/* ── Componente de mini-vista ─────────────────────────────── */
function MiniView({
  buildGeo,
  camPos,
  camUp,
  label,
}: {
  buildGeo: () => THREE.BufferGeometry;
  camPos: [number, number, number];
  camUp: [number, number, number];
  label: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x111827, 1);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);

    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(...camPos);
    camera.up.set(...camUp);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(5, 8, 5);
    scene.add(dir);
    scene.add(new THREE.DirectionalLight(0x88aaff, 0.4).position.set(-5, -3, -5) && dir);

    const geo = buildGeo();
    const mat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.4, metalness: 0.2 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Wireframe overlay
    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
    scene.add(new THREE.LineSegments(edges, lineMat));

    let running = true;
    const animate = () => {
      if (!running) return;
      requestAnimationFrame(animate);
      if (label === "Perspectiva") mesh.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(() => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
    });
    ro.observe(el);

    return () => {
      running = false;
      renderer.dispose();
      ro.disconnect();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildGeo]);

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-slate-700">
      <div className="bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-300 tracking-widest uppercase">
        {label}
      </div>
      <div ref={mountRef} style={{ height: 160 }} />
    </div>
  );
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "¿Cuántas caras tiene un cubo?",
    options: ["4", "6", "8", "12"],
    correct: 1,
    explanation: "Un cubo tiene 6 caras cuadradas, todas iguales. ¡Como los dados!",
  },
  {
    question: "¿Qué son las aristas de una figura 3D?",
    options: ["Los puntos de las esquinas", "Las líneas donde se unen dos caras", "Las superficies planas", "Los colores de la figura"],
    correct: 1,
    explanation: "Las aristas son las líneas o bordes donde se encuentran dos caras de la figura.",
  },
  {
    question: "La fórmula de Euler dice que C - A + V = ?",
    options: ["0", "1", "2", "3"],
    correct: 2,
    explanation: "Para cualquier sólido convexo: Caras - Aristas + Vértices = 2. ¡Es siempre igual!",
  },
  {
    question: "¿Cuántos vértices tiene una pirámide triangular (tetraedro)?",
    options: ["3", "4", "5", "6"],
    correct: 1,
    explanation: "Una pirámide triangular tiene 4 vértices: 3 en la base y 1 en la punta.",
  },
];

/* ── Vista principal ──────────────────────────────────────── */
export default function Descomposicion() {
  const [fig, setFig] = useState<FigKey>("cubo");
  const data = FIGURES[fig];

  return (
    <div className="bg-[#0d1117] min-h-full text-white px-4 py-8">
      {/* Encabezado */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-900/50 mb-3">
          <span className="text-3xl">⚙️</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-purple-400 mb-1">
          Descomposición de Figuras 🔧
        </h1>
        <p className="text-slate-400">
          Explora la descomposición de figuras 3D en sus elementos fundamentales: caras, aristas y vértices.
        </p>
      </div>

      {/* Selector de figura */}
      <div className="flex justify-center gap-3 mb-6">
        <p className="self-center text-slate-300 font-medium mr-2">Selecciona una Figura:</p>
        {(Object.keys(FIGURES) as FigKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setFig(key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
              fig === key
                ? "bg-purple-600 border-purple-500 text-white"
                : "bg-slate-800 border-slate-600 text-slate-300 hover:border-purple-400"
            }`}
          >
            {FIGURES[key].label}
          </button>
        ))}
      </div>

      {/* Grid 2×2 de vistas */}
      <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto mb-8">
        {VIEWS.map((v) => (
          <MiniView
            key={v.label}
            label={v.label}
            buildGeo={data.buildGeo}
            camPos={v.pos}
            camUp={v.up}
          />
        ))}
      </div>

      {/* Elementos de la figura */}
      <div className="max-w-2xl mx-auto mb-6">
        <h2 className="text-xl font-bold text-purple-400 text-center mb-4">Elementos de la Figura</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Caras", value: data.caras, icon: "◻️", desc: "Superficies que forman la figura" },
            { label: "Aristas", value: data.aristas, icon: "📏", desc: "Líneas donde se encuentran caras" },
            { label: "Vértices", value: data.vertices, icon: "⚡", desc: "Puntos donde se encuentran aristas" },
          ].map((el) => (
            <div key={el.label} className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
              <div className="text-2xl mb-1">{el.icon}</div>
              <div className="text-sm text-slate-400 font-medium mb-1">{el.label}</div>
              <div className="text-4xl font-black text-purple-400 mb-1">{el.value}</div>
              <div className="text-xs text-slate-500">{el.desc}</div>
            </div>
          ))}
        </div>

        {/* Descripción */}
        <div className="mt-4 bg-purple-800/30 border border-purple-700 rounded-xl px-5 py-3 text-center text-purple-200 font-medium">
          {data.description}
        </div>
      </div>

      {/* Fórmula de Euler */}
      <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
        <h2 className="text-xl font-bold text-white text-center mb-4">Fórmula de Euler</h2>
        <div className="bg-slate-900 rounded-lg px-6 py-4 text-center mb-4">
          <span className="text-3xl md:text-4xl font-black text-white font-mono tracking-widest">
            C - A + V = 2
          </span>
        </div>
        <p className="text-slate-400 text-sm text-center mb-2">
          <span className="text-white font-semibold">C</span> = Caras,{" "}
          <span className="text-white font-semibold">A</span> = Aristas,{" "}
          <span className="text-white font-semibold">V</span> = Vértices
        </p>
        <div className="text-center text-lg font-bold text-green-400">{data.euler}</div>
      </div>

      {/* Mascota guía */}
      <div className="max-w-2xl mx-auto mb-5">
        <GuideMascot
          mood="explaining"
          message={`¡Muy bien! El ${data.label} tiene ${data.caras} caras, ${data.aristas} aristas y ${data.vertices} vértices. Comprueba la fórmula de Euler: ${data.euler} — ¡siempre da 2 en sólidos convexos!`}
        />
      </div>

      {/* Quiz */}
      <div className="max-w-2xl mx-auto">
        <Quiz title="Quiz de Figuras 3D" questions={QUIZ_QUESTIONS} />
      </div>
    </div>
  );
}
