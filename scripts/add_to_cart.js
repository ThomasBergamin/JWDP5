let quantity = 0;
let selectedLens = "";

const getSelectedQuantity = () => {
  quantity = parseInt(document.getElementById("select_lenses").value);
};

const changeSelectedLens = async () => {
  await getCameraData()
    .then((camera) => {
      lenses = camera.lenses;
      lenses.forEach((cameraLense) => {
        lens = document.getElementById(cameraLense);
        if (lens.checked) {
          if (selectedLens != lens.id) {
            selectedLens = lens.id;
          }
        }
      });
    })
    .catch((error) => console.log(error));
};

const addToCart = async (cameraId) => {
  const camerasInCart = JSON.parse(sessionStorage.getItem("cart"));
  getSelectedQuantity();
  await changeSelectedLens();

  if (camerasInCart) {
    camerasInCart.push({
      cameraId: cameraId,
      lens: selectedLens,
      quantity: quantity,
    });
    sessionStorage.setItem("cart", JSON.stringify(camerasInCart));
  } else {
    sessionStorage.setItem(
      "cart",
      JSON.stringify([
        { cameraId: cameraId, lens: selectedLens, quantity: quantity },
      ])
    );
  }
  renderCartLabel();
  // action visuelle pour l'utilisateur
};
