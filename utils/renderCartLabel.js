export const renderCartLabel = () => {
  const camerasInCart = JSON.parse(sessionStorage.getItem("cart"));
  let container = document.getElementById("emptyNotification");
  if (camerasInCart) {
    let quantity = camerasInCart.length;
    const htmlNotification = `<span class="badge bg-danger rounded-pill">${quantity}</span>`;
    container.innerHTML = htmlNotification;
  } else {
    container.innerHTML = "";
  }
};
