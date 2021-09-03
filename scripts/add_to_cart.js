let quantity = 0;
let selectedLens = "";
const getCameraFromAPI = async (cameraId) => {
  try {
    let response = await fetch(`http://localhost:3000/api/cameras/${cameraId}`); // change hard coded url of back ent
    return response.json();
  } catch (error) {
    let htmlAlert = `<div class="alert alert-warning" role="alert">
      There was an error while loading the product id=${cameraId} !</div>`;
    let container = document.getElementById("emptyDiv");
    container.innerHTML = htmlAlert;
    console.log(error);
  }
};
const getOneCamera = async (cameraId) => {
  const camerasData = JSON.parse(sessionStorage.getItem("camerasData"));
  let cameraInfos;
  if (camerasData) {
    camerasData.forEach((camera) => {
      if (cameraId == camera._id) {
        cameraInfos = camera;
      }
    });
  } else {
    cameraInfos = await getCameraFromAPI(cameraId);
  }
  return cameraInfos;
};

const getSelectedQuantity = () => {
  quantity = parseInt(document.getElementById("select_lenses").value);
};

const changeSelectedLens = async (cameraId) => {
  await getOneCamera(cameraId)
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
  await getOneCamera(cameraId).then((camera) => {
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
