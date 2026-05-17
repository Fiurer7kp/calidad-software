// src/components/Navbar.test.tsx
import { render, screen} from "@testing-library/react";
import Navbar from "./Navbar";

// Limpia los mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

// --- Pruebas de renderizado ---
describe("Navbar - Renderizado", () => {
  test("renderiza el título principal 'UCC : Prácticas Desarrollo'", () => {
    render(<Navbar />);
    expect(screen.getByText(/UCC : Prácticas Desarrollo/i)).toBeInTheDocument();
  });

  test("renderiza el botón con el texto 'Tema'", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /Tema/i })).toBeInTheDocument();
  });
});

// --- Pruebas de comportamiento del tema ---
describe("Navbar - Cambio de Tema", () => {
  test("al hacer clic en 'Tema', llama a classList.toggle con 'dark'", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /Tema/i });
    fireEvent.click(button);
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith("dark");
  });

  test("al hacer clic en 'Tema', guarda el nuevo tema en localStorage", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /Tema/i });
    fireEvent.click(button);
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", expect.stringMatching(/dark|light/));
  });
});

