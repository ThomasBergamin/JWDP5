const getCameraFromAPI = async (cameraId) => {
  try {
    let response = await fetch(`http://localhost:3000/api/cameras/${cameraId}`); // change base url of back ent
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

export const getAllCameras = async () => {
  let cameras = JSON.parse(sessionStorage.getItem("camerasData"));

  if (!cameras) {
    cameras = await getCamerasFromAPI();
    sessionStorage.setItem("camerasData", JSON.stringify(cameras));
  }

  return cameras;
};

export const getOneCamera = async (cameraId) => {
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
