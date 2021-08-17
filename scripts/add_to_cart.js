const addToCart = (cameraId) => {
  const htmlNotification = `<span class="badge bg-danger rounded-pill">New</span>`;
  let container = document.getElementById("emptyNotification");
  container.innerHTML = htmlNotification;
  const itemsInCart = JSON.parse(sessionStorage.getItem("cart"));
  if (itemsInCart) {
    const camerasInCart = itemsInCart.cameras;
    if (!camerasInCart.includes(cameraId)) {
      sessionStorage.setItem(
        "cart",
        JSON.stringify({ cameras: [...camerasInCart, cameraId] })
      );
    } else {
      console.log("camera already in cart");
    }
  } else {
    sessionStorage.setItem("cart", JSON.stringify({ cameras: [cameraId] }));
  }
};
