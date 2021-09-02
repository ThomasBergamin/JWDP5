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
  // eslint-disable-next-line no-undef
  await getCameraData(cameraId).then((camera) => {
    console.log(camera);
    console.log("triggered");
    let camerasToPush = [];
    if (camerasInCart) {
      camerasToPush = [...camerasInCart];
    }

    for (let i = 0; i < quantity; i++) {
      const formatPrice = (price) => {
        const arrayPrice = Array.from(price.toString());
        arrayPrice.splice(-2, 0, ",");
        let cleanPrice = arrayPrice.join("");
        return cleanPrice;
      };
      const cameraPrice = formatPrice(camera.price);
      camerasToPush.push({
        cameraId: cameraId,
        lens: selectedLens,
        name: camera.name,
        price: cameraPrice,
      });
    }
    sessionStorage.setItem("cart", JSON.stringify(camerasToPush));
    // eslint-disable-next-line no-undef
    renderCartLabel();
  });
};
