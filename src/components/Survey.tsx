import React, { useState } from 'react';

const Survey: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating !== null) {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Encuesta de Satisfacción</h2>
      {!submitted ? (
        <>
          <div className="mb-4">
            <p className="mb-2 text-white">Califica tu experiencia (1 a 5 estrellas):</p>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className="cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="hidden"
                  />
                  <span className={`text-3xl ${rating && rating >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}>
                    ★
                  </span>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={rating === null}
            className="bg-blue-600 hover:bg-blue-900 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </>
      ) : (
        <p className="mt-4 text-lg border border-blue-200 bg-blue-500 text-white rounded-md p-3 shadow-sm">
          Gracias por tu calificación: {rating} estrella{rating! > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default Survey;