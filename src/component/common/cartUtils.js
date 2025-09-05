const CART_KEY = "cart";

// ✅ Get all cart items
export const getCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

// ✅ Save cart
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const isSameDay = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();
// ✅ Add or update cart item
export const addToCart = (item) => {
  let cart = getCart();

  // Find index based on same tour AND same day
  const index = cart.findIndex(
    (c) =>
      c?.tour?._id === item?.tour?._id &&
      isSameDay(new Date(c?.selectedDate), new Date(item?.selectedDate))
  );

  if (index !== -1) {
    // ✅ Update existing booking
    cart[index].numberOfPeople = item.numberOfPeople;
    cart[index].totalPrice = item.totalPrice;
    saveCart(cart);
    return { success: true, updated: true, message: "Cart updated", cart };
  }

  // ✅ Else → add new booking
  cart.push(item);
  saveCart(cart);
  return { success: true, updated: false, message: "Added to cart", cart };
};
// ✅ Remove from cart
export const removeFromCart = (tourId, selectedDate) => {
  let cart = getCart();

  cart = cart.filter(
    (c) => !(c.tour._id === tourId && c.selectedDate === selectedDate)
  );

  saveCart(cart);
  return { success: true, message: "Removed from cart", cart };
};

// ✅ Clear entire cart
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
