/* Take a list of elements, a class name, a HTML tag and a target and display elements on the page */
const displayElements = (elements, className = "", HTMLTag, target) => {
  elements.map((element) => {
    const elementToDisplay = document.createElement(HTMLTag);
    elementToDisplay.classList.add(className);
    elementToDisplay.innerHTML = element.name;
    let emptyTarget = document.getElementById(target);
    emptyTarget.appendChild(elementToDisplay);
  });
};

/* Fetch camera list from the API & display them on the page */

const getCameras = () =>
  fetch("http://localhost:3000/api/cameras")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (cameras_list) {
      displayElements(cameras_list, "list-group-item", "li", "emptyDiv");
      console.log(cameras_list);
    })
    .catch(function (err) {
      console.log(err);
    });

getCameras();
