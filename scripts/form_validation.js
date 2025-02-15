const clientName = document.getElementById("clientName");
const clientLastName = document.getElementById("clientLastName");
const clientEmail = document.getElementById("clientEmail");
const clientAddress = document.getElementById("clientAddress");
const clientCity = document.getElementById("clientCity");
const clientZip = document.getElementById("clientZip");
const formInputs = [
  clientName,
  clientLastName,
  clientEmail,
  clientAddress,
  clientCity,
  clientZip,
];

// eslint-disable-next-line no-unused-vars
const displayBtn = () => {
  let classBtn = "btn btn-primary";
  formInputs.forEach(
    (input) => !input.value && (classBtn = "btn btn-primary disabled")
  );
  document.getElementById("submitFormBtn").className = classBtn;
};

// eslint-disable-next-line no-unused-vars
const submitForm = async () => {
  const camerasInCart = JSON.parse(sessionStorage.getItem("cart"));
  const ordersId = [];
  camerasInCart.forEach((camera) => {
    ordersId.push(camera.cameraId);
  });
  const contact = {
    firstName: clientName.value,
    lastName: clientLastName.value,
    email: clientEmail.value,
    address: clientAddress.value,
    city: clientCity.value,
  };
  const dataToSend = { contact: contact, products: ordersId };

  const rawResponse = await fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });

  const orderResponse = await rawResponse.json();
  const regexUUID = new RegExp(
    "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}"
  );
  const isOrderIdCorrect = regexUUID.test(orderResponse.orderId);

  if (isOrderIdCorrect) {
    sessionStorage.setItem("order", JSON.stringify(orderResponse));
    sessionStorage.removeItem("cart");
    window.location.replace("../pages/order_success.html");
  } else {
    console.log("erreur"); // display an errory saying there was an error with back end response
  }
};
