const displayForm = () => {
  let cartForm = document.getElementById("cartForm");
  cartForm.className = "visible row";
};

document.getElementById("orderBtn").addEventListener("click", displayForm);
