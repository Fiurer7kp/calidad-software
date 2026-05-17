import { render, screen, fireEvent } from "@testing-library/react";
import UnitConverter from "../components/UnitConverter";

describe("UnitConverter Component", () => {
  test("renderiza los inputs y el botón", () => {
    render(<UnitConverter />);

    // Verifica que existan los elementos principales
    expect(screen.getByText(/Conversor de Unidades/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Celsius/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fahrenheit/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Convertir/i })).toBeInTheDocument();
  });

  test("convierte Celsius a Fahrenheit correctamente", () => {
    render(<UnitConverter />);

    const inputCelsius = screen.getByLabelText(/Celsius/i) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Convertir/i });
    const inputFahrenheit = screen.getByLabelText(/Fahrenheit/i) as HTMLInputElement;

    // Escribir en el input de Celsius
    fireEvent.change(inputCelsius, { target: { value: "40" } });

    // Clic en el botón de convertir
    fireEvent.click(button);

    // Validar resultado: 40 °C = 104 °F
    expect(inputFahrenheit.value).toBe("104.00");
  });

  test("convierte 0°C a 32°F correctamente (punto de congelación del agua)", () => {
    render(<UnitConverter />);
    const inputCelsius = screen.getByLabelText(/Celsius/i) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Convertir/i });
    const inputFahrenheit = screen.getByLabelText(/Fahrenheit/i) as HTMLInputElement;

    fireEvent.change(inputCelsius, { target: { value: "0" } });
    fireEvent.click(button);

    expect(inputFahrenheit.value).toBe("32.00");
  });

  test("convierte -40°C a -40°F correctamente (punto de equivalencia)", () => {
    render(<UnitConverter />);
    const inputCelsius = screen.getByLabelText(/Celsius/i) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Convertir/i });
    const inputFahrenheit = screen.getByLabelText(/Fahrenheit/i) as HTMLInputElement;

    fireEvent.change(inputCelsius, { target: { value: "-40" } });
    fireEvent.click(button);

    expect(inputFahrenheit.value).toBe("-40.00");
  });

  test("convierte 100°C a 212°F correctamente (punto de ebullición del agua)", () => {
    render(<UnitConverter />);
    const inputCelsius = screen.getByLabelText(/Celsius/i) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Convertir/i });
    const inputFahrenheit = screen.getByLabelText(/Fahrenheit/i) as HTMLInputElement;

    fireEvent.change(inputCelsius, { target: { value: "100" } });
    fireEvent.click(button);

    expect(inputFahrenheit.value).toBe("212.00");
  });
});
