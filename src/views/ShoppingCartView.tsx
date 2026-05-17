import React from 'react';
import ShoppingCart from '../components/ShoppingCart';

const ShoppingCartView: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        Carrito de Compras
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Agrega productos al carrito y gestiona tus compras.
      </p>
      <ShoppingCart />
    </div>
  );
};

export default ShoppingCartView;