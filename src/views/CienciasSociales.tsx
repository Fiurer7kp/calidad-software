import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import GuideMascot from "../components/GuideMascot";
import Quiz, { QuizQuestion } from "../components/Quiz";

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "¿Cuál es el continente más grande del mundo?",
    options: ["América", "África", "Asia", "Europa"],
    correct: 2,
    explanation: "Asia es el continente más grande del mundo, con más de 44 millones de km². ¡Cabe casi toda América dos veces!",
  },
  {
    question: "¿En qué continente está Colombia?",
    options: ["Europa", "Asia", "África", "América"],
    correct: 3,
    explanation: "Colombia está en América del Sur, en el noroeste del continente, bañada por el Pacífico y el Caribe.",
  },
  {
    question: "¿Cuántos continentes hay en el planeta Tierra?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    explanation: "Los 7 continentes son: América del Norte, América del Sur, Europa, África, Asia, Oceanía y la Antártida.",
  },
  {
    question: "¿Qué continente aparece al este de África en el globo?",
    options: ["Europa", "América", "Oceanía", "Asia"],
    correct: 3,
    explanation: "Asia está al este de Europa y Africa. Es el continente con mayor población del mundo.",
  },
];

const GLOBE_R = 1.5;
const EARTH_TEX = "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";

const CONTINENTS = [
  { name: "América",  lon: -80,  lat: 15  },
  { name: "Europa",   lon: 15,   lat: 50  },
  { name: "África",   lon: 20,   lat: 0   },
  { name: "Asia",     lon: 100,  lat: 40  },
  { name: "Oceanía",  lon: 135,  lat: -25 },
];

// Converts geographic lat/lon to Three.js SphereGeometry local position.
// SphereGeometry UV: phi=0 → LEFT, phi=π/2 → FRONT, so lon=-90° faces front at rotation.y=0.
function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (lon + 180) * (Math.PI / 180);
  const theta = (90 - lat) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.cos(phi) * Math.sin(theta),
    r * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function createLabelSprite(text: string): THREE.Sprite {
  const w = 220, h = 52;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "rgba(5, 10, 40, 0.75)";
  ctx.strokeStyle = "rgba(200, 220, 255, 0.5)";
  ctx.lineWidth = 2;
  const rad = 12;
  ctx.beginPath();
  ctx.moveTo(rad, 0); ctx.lineTo(w - rad, 0);
  ctx.quadraticCurveTo(w, 0, w, rad);
  ctx.lineTo(w, h - rad);
  ctx.quadraticCurveTo(w, h, w - rad, h);
  ctx.lineTo(rad, h);
  ctx.quadraticCurveTo(0, h, 0, h - rad);
  ctx.lineTo(0, rad);
  ctx.quadraticCurveTo(0, 0, rad, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.font = "bold 20px Arial, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2);

  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.3, 0.31, 1);
  return sprite;
}

interface SpriteEntry {
  sprite: THREE.Sprite;
  localPos: THREE.Vector3;
}

export default function CienciasSociales() {
  const stageRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const spritesRef = useRef<SpriteEntry[]>([]);
  const targetRotYRef = useRef(0);
  const autoRotateRef = useRef(true);
  const rafRef = useRef(0);

  const [isDaytime, setIsDaytime] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(stage.clientWidth, stage.clientHeight);
    stage.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Starfield
    const starPositions = new Float32Array(3000 * 3);
    for (let i = 0; i < starPositions.length; i++) {
      starPositions[i] = (Math.random() - 0.5) * 300;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.4 })));

    // Camera
    const camera = new THREE.PerspectiveCamera(45, stage.clientWidth / stage.clientHeight, 0.1, 500);
    camera.position.z = 4.5;
    cameraRef.current = camera;

    // Lighting
    scene.add(new THREE.AmbientLight(0x223366, 3));
    const sun = new THREE.DirectionalLight(0xfff5e0, 2.5);
    sun.position.set(5, 3, 5);
    scene.add(sun);
    sunLightRef.current = sun;

    // Sun visual
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffaa00 })
    );
    sunMesh.position.set(2.2, 1.8, 2.5);
    scene.add(sunMesh);

    // Sun corona glow
    const coronaMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true, opacity: 0.25 })
    );
    coronaMesh.position.copy(sunMesh.position);
    scene.add(coronaMesh);

    // Earth globe
    const earthMat = new THREE.MeshStandardMaterial({ roughness: 0.75, metalness: 0.05 });
    const globe = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_R, 64, 64), earthMat);
    scene.add(globe);
    globeRef.current = globe;

    new THREE.TextureLoader().load(
      EARTH_TEX,
      (tex) => { earthMat.map = tex; earthMat.needsUpdate = true; },
      undefined,
      () => { earthMat.color.set(0x2255aa); }
    );

    // Atmosphere rim
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_R + 0.07, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x4499ff, transparent: true, opacity: 0.08, side: THREE.BackSide })
    ));

    // Continent label sprites (children of globe so they rotate with it)
    const sprites: SpriteEntry[] = [];
    CONTINENTS.forEach(({ name, lat, lon }) => {
      const sprite = createLabelSprite(name);
      const localPos = latLonToVec3(lat, lon, GLOBE_R + 0.22);
      sprite.position.copy(localPos);
      globe.add(sprite);
      sprites.push({ sprite, localPos });
    });
    spritesRef.current = sprites;

    // Animation loop
    let running = true;
    const camDir = new THREE.Vector3();

    const animate = () => {
      if (!running) return;
      rafRef.current = requestAnimationFrame(animate);

      const g = globeRef.current!;

      if (autoRotateRef.current) {
        targetRotYRef.current += 0.003;
      }
      g.rotation.y += (targetRotYRef.current - g.rotation.y) * 0.04;

      // Show sprites only when facing the camera
      camera.getWorldDirection(camDir);
      sprites.forEach(({ sprite, localPos }) => {
        const worldPos = localPos.clone().applyMatrix4(g.matrixWorld);
        const toCam = camera.position.clone().sub(worldPos).normalize();
        const normal = worldPos.clone().normalize();
        sprite.visible = normal.dot(toCam) > 0.15;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize observer
    const ro = new ResizeObserver(() => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(stage);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      ro.disconnect();
      if (stage.contains(renderer.domElement)) stage.removeChild(renderer.domElement);
    };
  }, []);

  // Day / night toggle
  useEffect(() => {
    if (sunLightRef.current) {
      sunLightRef.current.intensity = isDaytime ? 2.5 : 0.15;
    }
  }, [isDaytime]);

  const focusContinent = (c: typeof CONTINENTS[0]) => {
    setSelectedContinent(c.name);
    autoRotateRef.current = false;
    // To show longitude L at front: rotation.y = -(L + 90) * π/180
    const target = -(c.lon + 90) * (Math.PI / 180);
    if (globeRef.current) {
      const cur = globeRef.current.rotation.y;
      // Shortest rotation path (avoid spinning more than 180°)
      const diff = ((target - cur + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      targetRotYRef.current = cur + diff;
    } else {
      targetRotYRef.current = target;
    }
  };

  const resetAutoRotate = () => {
    setSelectedContinent(null);
    autoRotateRef.current = true;
  };

  return (
    <div
      className="flex flex-col"
      style={{ minHeight: "calc(100vh - 112px)", background: "radial-gradient(ellipse at 50% 0%, #0d1b3e 0%, #03031a 60%)" }}
    >
      {/* Title */}
      <div className="text-center pt-6 pb-3 px-4">
        <h1 className="text-3xl md:text-4xl font-black text-yellow-400 drop-shadow-lg mb-1">
          Ciencias Sociales: Nuestro Planeta
        </h1>
        <p className="text-sm md:text-base text-blue-200">
          ¡Explora el mundo en 3D, aprende sobre los continentes y cuida nuestro planeta!
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-2 px-4 pb-3">
        <button
          onClick={() => setIsDaytime(d => !d)}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
            isDaytime
              ? "bg-yellow-400 text-black border-yellow-400"
              : "bg-transparent text-gray-300 border-gray-600 hover:border-yellow-500"
          }`}
        >
          ☀️ Día
        </button>

        <button
          onClick={() => setMusicOn(m => !m)}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
            musicOn
              ? "bg-blue-500 text-white border-blue-400"
              : "bg-transparent text-gray-300 border-gray-600 hover:border-blue-400"
          }`}
        >
          {musicOn ? "🔊" : "🔇"} Música
        </button>

        <button className="px-3 py-1.5 rounded-full text-sm font-semibold border-2 bg-transparent text-gray-300 border-gray-600">
          🌿 Silencio eco
        </button>

        <span className="border-l border-gray-600 mx-1 self-stretch" />

        {CONTINENTS.map((c) => (
          <button
            key={c.name}
            onClick={() => focusContinent(c)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
              selectedContinent === c.name
                ? "bg-emerald-500 text-white border-emerald-400"
                : "bg-transparent text-gray-300 border-gray-600 hover:border-emerald-400 hover:text-white"
            }`}
          >
            {c.name}
          </button>
        ))}

        {selectedContinent && (
          <button
            onClick={resetAutoRotate}
            className="px-3 py-1.5 rounded-full text-sm font-semibold border-2 bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white transition-all"
          >
            ↻ Auto
          </button>
        )}
      </div>

      {/* Globe */}
      <div className="flex-1 flex items-center justify-center px-4 pb-6">
        <div
          ref={stageRef}
          className="w-full max-w-3xl rounded-2xl overflow-hidden border border-blue-900 shadow-[0_0_40px_rgba(30,80,200,0.3)]"
          style={{ height: "440px", background: "radial-gradient(ellipse at center, #0d1b3e 0%, #03031a 80%)" }}
        />
      </div>

      {/* Info footer */}
      {selectedContinent && (
        <div className="text-center pb-4 text-blue-300 text-sm animate-pulse">
          Mostrando: <span className="font-bold text-white">{selectedContinent}</span>
        </div>
      )}

      {/* Mascot + Quiz */}
      <div className="px-4 pb-6 space-y-4 max-w-2xl mx-auto w-full">
        <GuideMascot
          mood="happy"
          message="¡Haz clic en los botones de los continentes para girar el globo y ver dónde están! América, Europa, África, Asia y Oceanía son los 5 continentes principales que puedes explorar aquí."
        />
        <Quiz title="Quiz de Geografía" questions={QUIZ_QUESTIONS} />
      </div>
    </div>
  );
}
