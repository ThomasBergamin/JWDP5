const displayElement = (element, className = "", HTMLTag, target) => {
  const elementToDisplay = document.createElement(HTMLTag);
  elementToDisplay.classList.add(className);
  elementToDisplay.innerHTML = element.name + " " + element.price;
  let emptyTarget = document.getElementById(target);
  emptyTarget.appendChild(elementToDisplay);
};

const getCamera = () =>
  fetch("http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061")
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

getCamera();
