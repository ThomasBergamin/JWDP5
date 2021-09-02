const getCameraFromAPI = async (cameraId) => {
  try {
    let response = await fetch(`http://localhost:3000/api/cameras/${cameraId}`);
    return response.json();
  } catch (error) {
    let htmlAlert = `<div class="alert alert-warning" role="alert">
      There was an error while loading the product id=${camera} !</div>`;
    let container = document.getElementById("emptyDiv");
    container.innerHTML = htmlAlert;
    console.log(error);
  }
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cameraId = urlParams.get("id");

// Security check with REGEX
const checkID = new RegExp("^[A-Za-z0-9]*$");

const getCameraData = async () => {
  const camerasData = JSON.parse(sessionStorage.getItem("camerasData"));
  if (camerasData) {
    camerasData.forEach((camera) => {
      if (cameraId == camera._id) {
        cameraData = camera;
      }
    });
  } else {
    cameraData = await getCameraFromAPI(cameraId);
  }
  return cameraData;
};

console.log(
  getCameraData().then(function (camera) {
    displayCamera(camera);
  })
);

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
