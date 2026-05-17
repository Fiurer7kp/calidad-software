import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShoppingCart from "./ShoppingCart";

describe("ShoppingCart Component", () => {
  test("el carrito inicia vacío", () => {
    render(<ShoppingCart />);
    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
    expect(screen.getByText("Total: $0")).toBeInTheDocument();
  });

  test("agregar un producto aumenta el total", () => {
    render(<ShoppingCart />);
    const addButton = screen.getAllByText("Agregar al carrito")[0]; // Primer producto
    fireEvent.click(addButton);
    expect(screen.getByText("Producto A x1 - $10")).toBeInTheDocument();
    expect(screen.getByText("Total: $10")).toBeInTheDocument();
  });

  test("agregar el mismo producto aumenta la cantidad", () => {
    render(<ShoppingCart />);
    const addButton = screen.getAllByText("Agregar al carrito")[0];
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByText("Producto A x2 - $20")).toBeInTheDocument();
    expect(screen.getByText("Total: $20")).toBeInTheDocument();
  });

  test("eliminar un producto actualiza el total", () => {
    render(<ShoppingCart />);
    const addButton = screen.getAllByText("Agregar al carrito")[0];
    fireEvent.click(addButton);
    expect(screen.getByText("Total: $10")).toBeInTheDocument();

    const removeButton = screen.getByText("Eliminar");
    fireEvent.click(removeButton);
    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
    expect(screen.getByText("Total: $0")).toBeInTheDocument();
  });

  test("eliminar un producto de cantidad mayor a 1 disminuye la cantidad", () => {
    render(<ShoppingCart />);
    const addButton = screen.getAllByText("Agregar al carrito")[0];
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByText("Producto A x2 - $20")).toBeInTheDocument();

    const removeButton = screen.getByText("Eliminar");
    fireEvent.click(removeButton);
    expect(screen.getByText("Producto A x1 - $10")).toBeInTheDocument();
    expect(screen.getByText("Total: $10")).toBeInTheDocument();
  });

  test("se calcula el precio total correctamente con múltiples productos", () => {
    render(<ShoppingCart />);
    const addButtons = screen.getAllByText("Agregar al carrito");
    fireEvent.click(addButtons[0]); // Producto A: 10
    fireEvent.click(addButtons[1]); // Producto B: 20
    fireEvent.click(addButtons[1]); // Producto B: 20 más, total B: 40
    expect(screen.getByText("Producto A x1 - $10")).toBeInTheDocument();
    expect(screen.getByText("Producto B x2 - $40")).toBeInTheDocument();
    expect(screen.getByText("Total: $50")).toBeInTheDocument();
  });
});