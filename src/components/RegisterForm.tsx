import { useState } from "react";

interface User {
  name: string;
  email: string;
}

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const isDisabled = name.trim() === "" || email.trim() === "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = { name, email };
    setUsers(prev => [...prev, newUser]);
    setName("");
    setEmail("");
    setMessage("Registro exitoso. ¡Bienvenido!");
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Formulario de Registro</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isDisabled}
          className={`px-4 py-2 rounded-lg shadow ${
            isDisabled
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Registrar
        </button>
      </form>
      {message && <p className="text-green-600 font-bold">{message}</p>}

      {users.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Usuarios Registrados</h2>
          <ul className="space-y-2">
            {users.map((user, index) => (
              <li key={index} className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow">
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}