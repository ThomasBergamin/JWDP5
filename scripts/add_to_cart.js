let quantity = 0;
let lens = [""];

const getSelectedQuantity = () => {
  quantity = parseInt(document.getElementById("select_lenses").value);
};

/* const getSelectedLens = (camera) => {
  lenses = camera.lenses;
  lenses.forEach((cameraLense) => {
    cameralLense = document.getElementById(lens);
    if (cameraLense.is(":checked")) {
      lens.push(cameraLense);
    }
    console.log("lens", lens);
  });
}; */

const addToCart = (cameraId) => {
  const htmlNotification = `<span class="badge bg-danger rounded-pill">New</span>`;
  let container = document.getElementById("emptyNotification");
  container.innerHTML = htmlNotification;

  const camerasInCart = JSON.parse(sessionStorage.getItem("cart"));
  getSelectedQuantity();
  /* getSelectedLens(); */

  if (camerasInCart) {
    if (!camerasInCart.some((camera) => camera.cameraId === cameraId)) {
      camerasInCart.push({
        cameraId: cameraId,
        lens: lens,
        quantity: quantity,
      });
      sessionStorage.setItem("cart", JSON.stringify(camerasInCart));
    } else {
      camerasInCart.forEach((camera) => {
        if (camera.cameraId === cameraId) {
          if (camera.lens !== lens) {
            camera.lens = lens;
          }
          camera.quantity = camera.quantity + quantity;
          console.log(camera.quantity);
        }
        sessionStorage.setItem("cart", JSON.stringify(camerasInCart));
      });
    }
  } else {
    sessionStorage.setItem(
      "cart",
      JSON.stringify([{ cameraId: cameraId, lens: lens, quantity: quantity }])
    );
  }
};
