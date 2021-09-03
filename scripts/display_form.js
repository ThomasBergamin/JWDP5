const displayForm = () => {
  let cartForm = document.getElementById("cartForm");
  cartForm.className = "visible";
};

document.getElementById("orderBtn").addEventListener("click", displayForm);
