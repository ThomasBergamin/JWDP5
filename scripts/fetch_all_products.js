/* Fetch camera list from the API & returns them */

const getCameras = async () => {
  try {
    let response = await fetch("http://localhost:3000/api/cameras");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

/* Function to render cameras fetched into the HTML */

const renderCameras = async () => {
  let cameras = await getCameras();
  let html = "";
  cameras.forEach((camera) => {
    let htmlSegment = `<div class="col">
    <div class="card mt-4">
      <img src="${camera.imageUrl}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${camera.name}</h5>
        <p class="card-text lead text-success">
          <strong>259,99€</strong>
        </p>
      </div>
      <div class="card-footer">
        <a href="http://127.0.0.1:5500/pages/product.html?id=${camera._id}" class="btn btn-primary">Go to product page</a>
      </div>
    </div>
  </div>`;
    html += htmlSegment;
  });
  let container = document.querySelector(".cameras-container");
  container.innerHTML = html;
};

renderCameras();
