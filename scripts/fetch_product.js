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

const getCamerasFromAPI = async () => {
  try {
    let response = await fetch("http://localhost:3000/api/cameras");
    return response.json();
  } catch (error) {
    let htmlAlert = `<div class="alert alert-warning" role="alert">
    There was an error while loading cameras !</div>`;
    let container = document.querySelector(".cameras-container");
    container.innerHTML = htmlAlert;
    console.log(error);
  }
};

const getCamerasData = async () => {
  let cameras = JSON.parse(sessionStorage.getItem("camerasData"));

  if (!cameras) {
    cameras = await getCamerasFromAPI();
    sessionStorage.setItem("camerasData", JSON.stringify(cameras));
  }

  return cameras;
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cameraId = urlParams.get("id");

const checkId = async (id) => {
  const regexID = new RegExp("^[A-Za-z0-9]*$");
  const isIdCorrect = id.match(regexID);
  if (isIdCorrect) {
    const cameras = await getCamerasData();
    const cameraFound = cameras.some((camera) => camera._id === id);
    if (cameraFound) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const getCameraData = async (cameraId) => {
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

const displayCamera = (camera) => {
  const formatPrice = (price) => {
    const arrayPrice = Array.from(price.toString());
    arrayPrice.splice(-2, 0, ",");
    let cleanPrice = arrayPrice.join("");
    return cleanPrice;
  };

  camera.price = formatPrice(camera.price);

  let htmlLenses = ``;

  camera.lenses.forEach((lens) => {
    htmlLenses += `<div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      name="flexRadioDefault"
      id="${lens}"
      checked
    />
    <label class="form-check-label" for="${lens}">
      ${lens}
    </label>
  </div>`;
  });

  let htmlCamera = `<div class="row">
  <div class="col-6">
    <img
      class="img-fluid rounded"
      src="${camera.imageUrl}"
      alt="Camera"
    />
  </div>
  <div class="col-6">
    <div class="card">
      <h5 class="card-header text-center">${camera.name}</h5>
      <div class="card-body">
        <p class="card-text mt-3">
        ${camera.description}
        </p>
        <h4 class="card-subtitle mb-2 mt-5">Lenses</h4>
        ${htmlLenses}
        <h1 class="card-title mt-5">${camera.price}€</h1>
      </div>
      <div class="card-footer text-center">
      <select id='select_lenses' onchange='getSelectedQuantity()' class="form-select text-center form-select-sm mb-3 mt-3" aria-label=".form-select-sm example">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      </select>
        <button class="btn btn-success" onclick='addToCart("${camera._id}")'>Add to cart</button>
      </div>
    </div>
  </div>
</div>`;
  let container = document.getElementById("emptyDiv");
  container.innerHTML = htmlCamera;
  return;
};

const checkIdAndDisplayCamera = async () => {
  if (await checkId(cameraId)) {
    getCameraData(cameraId).then((camera) => {
      displayCamera(camera);
    });
  } else {
    let htmlAlert = `<div class="alert alert-danger" role="alert">
    No camera match with this ID :-(</div>`;
    let container = document.getElementById("emptyDiv");
    container.innerHTML = htmlAlert;
  }
};

checkIdAndDisplayCamera();
