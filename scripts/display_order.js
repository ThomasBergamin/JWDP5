const displayOrder = () => {
  const orderInfos = JSON.parse(sessionStorage.getItem("order"));
  let totalPrice = 0;
  const formatPrice = (price) => {
    const arrayPrice = Array.from(price.toString());
    arrayPrice.splice(-2, 0, ",");
    let cleanPrice = parseInt(arrayPrice.join(""));
    return cleanPrice;
  };
  orderInfos.products.forEach((product) => {
    const productPrice = formatPrice(product.price);
    totalPrice += productPrice;
  });
  document.getElementById(
    "orderText"
  ).innerHTML = `You paid ${totalPrice}€, your order ID : ${orderInfos.orderId}`;
};

displayOrder();
