import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Survey from "./Survey";

describe("Survey Component", () => {
  test("se renderizan las 5 opciones de estrellas", () => {
    render(<Survey />);

    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(5);

    expect(screen.getByText("Califica tu experiencia (1 a 5 estrellas):")).toBeInTheDocument();
  });

  test("al seleccionar un valor, se refleja en el estado (botón habilitado)", () => {
    render(<Survey />);

    const button = screen.getByRole("button", { name: /Enviar/i });
    expect(button).toBeDisabled();

    const stars = screen.getAllByText("★");
    fireEvent.click(stars[2]); // 3ra estrella (índice 2)

    expect(button).not.toBeDisabled();
  });

  test("al enviar, aparece un mensaje de confirmación con la puntuación", () => {
    render(<Survey />);

    const stars = screen.getAllByText("★");
    fireEvent.click(stars[3]); // 4ta estrella (índice 3)

    const button = screen.getByRole("button", { name: /Enviar/i });
    fireEvent.click(button);

    expect(screen.getByText("Gracias por tu calificación: 4 estrellas")).toBeInTheDocument();
  });
});