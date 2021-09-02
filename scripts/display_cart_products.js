const getProductsInCart = () => {
  let products = sessionStorage.getItem("cart");
  return products;
};

const renderProducts = () => {
  let cameras = getProductsInCart();
  if (cameras) {
    console.log(cameras);
  } else {
    // display nothing in cart -> go back to index to shop
  }
};

renderProducts();
