// if session.storage -> grab quantity and display it

const renderCartLabel = () => {
  const camerasInCart = JSON.parse(sessionStorage.getItem("cart"));
  if (camerasInCart) {
    console.log("changed");
    console.log(camerasInCart);
    console.log(camerasInCart.length, "number in cart");
    quantity = camerasInCart.length;
    const htmlNotification = `<span class="badge bg-danger rounded-pill">${quantity}</span>`;
    let container = document.getElementById("emptyNotification");
    container.innerHTML = htmlNotification;
  }
};

renderCartLabel();
