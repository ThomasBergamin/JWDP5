import { getOneCamera, getAllCameras } from "../utils/getCameras.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cameraId = urlParams.get("id");

const checkId = async (id) => {
  const regexID = new RegExp("^[A-Za-z0-9]*$");
  const regexStart = new RegExp("^5be");
  const isIdCorrect = id.match(regexID) && id.match(regexStart);
  if (isIdCorrect) {
    const cameras = await getAllCameras();
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
      <select id='select_lenses' class="form-select text-center form-select-sm mb-3 mt-3" aria-label=".form-select-sm example">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      </select>
        <button id='addToCartBtn' class="btn btn-success"  data-bs-toggle="modal"
          data-bs-target="#exampleModal">Add to cart</button>
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
    getOneCamera(cameraId)
      .then((camera) => {
        displayCamera(camera);
      })
      .catch((error) => {
        console.log(error);
        let htmlAlert = `<div class="alert alert-danger" role="alert">
    There was an error while retrieving cameras :-(</div>`;
        let container = document.getElementById("emptyDiv");
        container.innerHTML = htmlAlert;
      });
  } else {
    let htmlAlert = `<div class="alert alert-danger" role="alert">
    No camera match with this ID :-(</div>`;
    let container = document.getElementById("emptyDiv");
    container.innerHTML = htmlAlert;
  }
};

checkIdAndDisplayCamera();
