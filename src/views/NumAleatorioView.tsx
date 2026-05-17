import React from 'react';
import NumAleatorio from '../components/NumAleatorio';

const NumAleatorioView: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        Generador de Números Aleatorios
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Haz clic en el botón para generar un número aleatorio entre 1 y 100.
      </p>
      <NumAleatorio />
    </div>
  );
};

export default NumAleatorioView;