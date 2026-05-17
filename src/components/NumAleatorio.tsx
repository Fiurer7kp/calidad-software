// hook useState permite majenar el estado del componente
import React, { useState } from 'react';

//definimos el componente
const NumAleatorio: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null); // Estado del componente

  //funcion para generar numero aleatorio

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(number);
  };

  //retornamos el componente.     Tailwind CSS 
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Generador de Números Aleatorios</h2>
      <button
        onClick={generateRandomNumber}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generar Número
      </button>
      {randomNumber !== null && (
        <p className="mt-4 text-lg border border-blue-400 bg-blue-200 text-blue-900 rounded-md p-3 shadow-sm">
          Número generado: {randomNumber}
        </p>
      )}
    </div>
  );
};

export default NumAleatorio;