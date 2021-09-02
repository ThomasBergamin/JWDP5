// eslint-disable-next-line no-unused-vars
const clearCart = () => {
  sessionStorage.removeItem("cart");
  document.location.reload();
};
