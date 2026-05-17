import { useNavigate } from "react-router-dom";

const FEATURES = [
  {
    icon: "🎮",
    title: "Interactivo",
    desc: "Controla la velocidad, rotación y visualiza cada fase",
    color: "from-purple-600 to-purple-800",
  },
  {
    icon: "📊",
    title: "Estadísticas",
    desc: "Observa datos en tiempo real y ciclos completados",
    color: "from-green-600 to-green-800",
  },
  {
    icon: "🎨",
    title: "Visual 3D",
    desc: "200 partículas animadas con efectos realistas",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: "📚",
    title: "Educativo",
    desc: "Aprende con información científica detallada",
    color: "from-orange-600 to-orange-800",
  },
];

export default function CienciasNaturalesPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-full flex flex-col items-center justify-center py-10 px-6"
      style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 40%, #0369a1 100%)" }}
    >
      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-3 drop-shadow-lg">
        Ciclo del Agua en 3D
      </h1>
      <p className="text-blue-100 text-center text-lg max-w-2xl mb-10">
        Explora de forma interactiva las cuatro fases del ciclo hidrológico:{" "}
        <strong>evaporación, condensación, precipitación y acumulación.</strong>
      </p>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl w-full mb-10">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className={`flex items-start gap-4 bg-gradient-to-br ${f.color} rounded-2xl p-5 shadow-lg`}
          >
            <span className="text-3xl">{f.icon}</span>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">{f.title}</h3>
              <p className="text-white/80 text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate("/ciclo-del-agua")}
        className="flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3 rounded-2xl shadow-xl hover:bg-blue-50 transition text-lg"
      >
        🚀 Comenzar Exploración
      </button>
    </div>
  );
}
