import { getAllCameras } from "../utils/getCameras.js";

/* Function to render cameras fetched into the HTML */

const renderCameras = async () => {
  let cameras = await getAllCameras();

  let htmlToDisplay = "";

  const formatPrice = (price) => {
    const arrayPrice = Array.from(price.toString());
    arrayPrice.splice(-2, 0, ",");
    let cleanPrice = arrayPrice.join("");
    return cleanPrice;
  };

  cameras.forEach((camera) => {
    const cameraPrice = formatPrice(camera.price);
    let htmlSegment = `<div class="col">
    <div class="card mt-4">
      <img src="${camera.imageUrl}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${camera.name}</h5>
        <p class="card-text lead text-success">
          <strong>${cameraPrice + "€"}</strong>
        </p>
      </div>
      <div class="card-footer">
        <a href="/pages/product.html?id=${
          camera._id
        }" class="btn btn-primary">Go to product page</a>
      </div>
    </div>
  </div>`;
    htmlToDisplay += htmlSegment;
  });
  let container = document.querySelector(".cameras-container");
  container.innerHTML = htmlToDisplay;
};

renderCameras();
