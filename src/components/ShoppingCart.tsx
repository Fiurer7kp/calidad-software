import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: "Producto A", price: 10 },
  { id: 2, name: "Producto B", price: 20 },
  { id: 3, name: "Producto C", price: 30 },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-6 bg-blue-200 text-slate-900 dark:bg-slate-900 dark:text-white
                border border-blue-200 rounded-md shadow-sm">
      <h1 className="text-2xl font-bold">Carrito de Compras</h1>

      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Productos Disponibles</h2>
        <ul className="space-y-2">
          {products.map(product => (
            <li key={product.id} className="flex justify-between items-center p-2 border rounded">
              <span>{product.name} - ${product.price}</span>
              <button
                onClick={() => addToCart(product)}
                className="px-3 py-1 bg-green-900 text-white rounded hover:bg-green-600"
              >
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map(item => (
              <li key={item.product.id} className="flex justify-between items-center p-2 border rounded">
                <span>{item.product.name} x{item.quantity} - ${item.product.price * item.quantity}</span>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="px-3 py-1 bg-red-900 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="text-lg font-bold mt-4">Total: ${total}</p>
      </div>
    </div>
  );
}