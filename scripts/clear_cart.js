const clearCart = () => {
  sessionStorage.removeItem("cart");
  document.location.reload();
};
