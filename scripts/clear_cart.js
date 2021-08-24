const clearCart = () => {
  sessionStorage.removeItem("cart");
  renderCartLabel();
};
