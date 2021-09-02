let quantity = 0;
let selectedLens = "";

const getSelectedQuantity = () => {
  quantity = parseInt(document.getElementById("select_lenses").value);
};

const changeSelectedLens = async (cameraId) => {
  // eslint-disable-next-line no-undef
  await getCameraData(cameraId)
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
  await changeSelectedLens(cameraId);

  let camerasToPush = [];
  if (camerasInCart) {
    camerasToPush = [...camerasInCart];
  }

  for (let i = 0; i < quantity; i++) {
    camerasToPush.push({
      cameraId: cameraId,
      lens: selectedLens,
    });
  }

  sessionStorage.setItem("cart", JSON.stringify(camerasToPush));
  // eslint-disable-next-line no-undef
  renderCartLabel();
  // action visuelle pour l'utilisateur
};
