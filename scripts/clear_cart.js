const clearCart = () => {
  sessionStorage.removeItem("cart");
  document.location.reload();
};

document.getElementById("clearCartBtn").addEventListener("click", clearCart);
