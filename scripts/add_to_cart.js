let quantity = 0;
let selectedLens = "";

const getSelectedQuantity = () => {
  quantity = parseInt(document.getElementById("select_lenses").value);
};

const changeSelectedLens = async () => {
  // eslint-disable-next-line no-undef
  await getCameraData()
    .then((camera) => {
      let lenses = camera.lenses;
      lenses.forEach((cameraLense) => {
        let lens = document.getElementById(cameraLense);
        if (lens.checked) {
          if (selectedLens != lens.id) {
            selectedLens = lens.id;
          }
        }
      });
    })
    .catch((error) => console.log(error));
};

// eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-undef
  renderCartLabel();
  // action visuelle pour l'utilisateur
};
