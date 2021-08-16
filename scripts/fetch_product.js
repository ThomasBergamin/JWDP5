const displayElement = (element, className = "", HTMLTag, target) => {
  const elementToDisplay = document.createElement(HTMLTag);
  elementToDisplay.classList.add(className);
  elementToDisplay.innerHTML = element.name + " " + element.price;
  let emptyTarget = document.getElementById(target);
  emptyTarget.appendChild(elementToDisplay);
};

const getCameraFromAPI = (cameraID) =>
  fetch(`http://localhost:3000/api/cameras/${cameraID}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (camera) {
      displayElement(camera, "list-group-item", "li", "emptyDiv");
      console.log(cameras_list);
    })
    .catch(function (err) {
      console.log(err);
    });

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cameraId = urlParams.get("id");

getCameraFromAPI(cameraId);

// TO DO : Get ID from URL
// TO DO : Call API with ID
// TO DO : Display infos
// TO DO : Add to cart feature = stocker ID dans le sessionStorage
