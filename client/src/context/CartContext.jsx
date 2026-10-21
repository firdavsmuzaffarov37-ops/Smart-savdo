import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts } from '../data/products';

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('smartsavdo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('smartsavdo_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('smartsavdo_favorites');
      return saved ? JSON.parse(saved) : [allProducts[0], allProducts[2]]; // default favorites
    } catch {
      return [allProducts[0], allProducts[2]];
    }
  });

  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('smartsavdo_compare');
      return saved ? JSON.parse(saved) : [allProducts[0], allProducts[1]]; // default iPhone vs Galaxy
    } catch {
      return [allProducts[0], allProducts[1]];
    }
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('smartsavdo_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('smartsavdo_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('smartsavdo_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('smartsavdo_compare', JSON.stringify(compareList));
    } catch (e) {
      console.error(e);
    }
  }, [compareList]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const addToCart = (product, selectedShop = null) => {
    const shop = selectedShop || (product.shops && product.shops[0] ? product.shops[0].name : product.shop);
    const price = selectedShop?.price || product.price;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.shop === shop);
      if (existing) {
        showToast(`"${product.name}" miqdori savatda oshirildi!`);
        return prev.map(item =>
          item.id === product.id && item.shop === shop
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        showToast(`"${product.name}" savatga muvaffaqiyatli qo'shildi! ✓`);
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: price,
            priceNum: product.priceNum,
            img: product.img,
            shop: shop,
            quantity: 1
          }
        ];
      }
    });
  };

  const removeFromCart = (id, shop) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.shop === shop)));
    showToast("Mahsulot savatdan olib tashlandi");
  };

  const updateQuantity = (id, shop, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id && item.shop === shop) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  // Favorites management
  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`"${product.name}" sevimlilardan olib tashlandi`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`"${product.name}" sevimlilarga qo'shildi! ❤️`);
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  // Compare management
  const addToCompare = (product) => {
    setCompareList(prev => {
      if (prev.some(item => item.id === product.id)) {
        showToast(`"${product.name}" allaqachon taqqoslashda mavjud!`);
        return prev;
      }
      if (prev.length >= 4) {
        showToast("Bir vaqtning o'zida ko'pi bilan 4 ta mahsulotni taqqoslash mumkin!");
        return prev;
      }
      showToast(`"${product.name}" taqqoslashga qo'shildi! ⚖️`);
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(item => item.id !== productId));
    showToast("Mahsulot taqqoslashdan olib tashlandi");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartDrawerOpen,
        setCartDrawerOpen,
        toastMessage,
        setToastMessage,
        showToast,
        orders,
        addOrder,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        addToCompare,
        removeFromCompare
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
