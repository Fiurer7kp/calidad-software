import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterForm from "./RegisterForm";

describe("RegisterForm Component", () => {
  test("el botón está deshabilitado si los campos están vacíos", () => {
    render(<RegisterForm />);
    const button = screen.getByRole("button", { name: /Registrar/i });
    expect(button).toBeDisabled();
  });

  test("el botón se habilita al completar los campos", () => {
    render(<RegisterForm />);
    const nameInput = screen.getByPlaceholderText(/Nombre/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const button = screen.getByRole("button", { name: /Registrar/i });

    fireEvent.change(nameInput, { target: { value: "Juan" } });
    fireEvent.change(emailInput, { target: { value: "juan@example.com" } });

    expect(button).toBeEnabled();
  });

  test("al hacer submit, se limpia el formulario y aparece mensaje de confirmación", () => {
    render(<RegisterForm />);
    const nameInput = screen.getByPlaceholderText(/Nombre/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const button = screen.getByRole("button", { name: /Registrar/i });

    fireEvent.change(nameInput, { target: { value: "Juan" } });
    fireEvent.change(emailInput, { target: { value: "juan@example.com" } });
    fireEvent.click(button);

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(screen.getByText("Registro exitoso. ¡Bienvenido!")).toBeInTheDocument();
  });

  test("al hacer submit, se agrega usuario a la lista de registrados", () => {
    render(<RegisterForm />);
    const nameInput = screen.getByPlaceholderText(/Nombre/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const button = screen.getByRole("button", { name: /Registrar/i });

    fireEvent.change(nameInput, { target: { value: "Juan" } });
    fireEvent.change(emailInput, { target: { value: "juan@example.com" } });
    fireEvent.click(button);

    expect(screen.getByText("Usuarios Registrados")).toBeInTheDocument();
    expect(screen.getByText(/Nombre:/)).toBeInTheDocument();
    expect(screen.getByText("Juan")).toBeInTheDocument();
    expect(screen.getByText(/Email:/)).toBeInTheDocument();
    expect(screen.getByText("juan@example.com")).toBeInTheDocument();
  });
});