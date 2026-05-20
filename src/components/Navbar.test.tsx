// src/components/Navbar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

// Limpia los mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

// --- Pruebas de renderizado ---
describe("Navbar - Renderizado", () => {
  test("renderiza el título principal 'Mentes Pensantes'", () => {
    render(<Navbar />);
    expect(screen.getByText(/Mentes Pensantes/i)).toBeInTheDocument();
  });

  test("renderiza el botón de cambio de tema", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /modo claro|modo oscuro|claro|oscuro/i })).toBeInTheDocument();
  });
});

// --- Pruebas de comportamiento del tema ---
describe("Navbar - Cambio de Tema", () => {
  test("al hacer clic en el botón de tema, llama a classList.toggle con 'dark'", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /cambiar a modo/i });
    fireEvent.click(button);
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith("dark");
  });

  test("al hacer clic en el botón de tema, guarda el nuevo tema en localStorage", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /cambiar a modo/i });
    fireEvent.click(button);
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", expect.stringMatching(/dark|light/));
  });
});

