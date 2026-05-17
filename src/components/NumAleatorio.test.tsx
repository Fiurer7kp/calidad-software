import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NumAleatorio from "./NumAleatorio";

describe("NumAleatorio Component", () => {

  test("el número se muestra después de hacer clic", () => {
    render(<NumAleatorio />);

   
    expect(screen.queryByText(/Número generado:/)).not.toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Generar Número/i });

    fireEvent.click(button);


    expect(screen.getByText(/Número generado:/)).toBeInTheDocument();
  });


  test("el valor está dentro del rango [1,100]", () => {
    
    jest.spyOn(Math, 'random').mockReturnValue(0.5);


    render(<NumAleatorio />);

    const button = screen.getByRole("button", { name: /Generar Número/i });
    fireEvent.click(button);

    expect(screen.getByText("Número generado: 51")).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test("cada clic genera un nuevo número distinto", () => {
    
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);
    
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.1);

    render(<NumAleatorio />);

    const button = screen.getByRole("button", { name: /Generar Número/i });

    fireEvent.click(button);
    expect(screen.getByText("Número generado: 51")).toBeInTheDocument();


    fireEvent.click(button);
    expect(screen.getByText("Número generado: 11")).toBeInTheDocument();

    
    expect(51).not.toBe(11);


    
    jest.restoreAllMocks();
  });
});
