import React from 'react';
import Survey from '../components/Survey';

const SurveyView: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        Encuesta de Satisfacción
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Por favor, califica tu experiencia con nuestra aplicación.
      </p>
      <Survey />
    </div>
  );
};

export default SurveyView;