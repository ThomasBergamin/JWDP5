const displayOrder = () => {
  const orderInfos = JSON.parse(sessionStorage.getItem("order"));
  if (orderInfos) {
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
    document.getElementById("orderTitle").innerHTML = `Thanks for your order!`;
    document.getElementById("greetingsDisplay").innerHTML = `<img
              src="../assets/img/thanks.jpg"
              class="img-fluid mb-2"
              alt="thank you"
              height="250px"
            />`;
    document.getElementById(
      "orderText"
    ).innerHTML = `You paid ${totalPrice}€, your order ID : ${orderInfos.orderId}`;
  } else {
    document.getElementById(
      "orderTitle"
    ).innerHTML = `Ooops, it looks like you haven't ordered anything yet`;
    document.getElementById("greetingsDisplay").innerHTML = `<img
              src="../assets/img/oops.jpg"
              class="img-fluid mb-2"
              alt="todler holding her lips"
              height="250px"
            />`;
  }
};

displayOrder();
