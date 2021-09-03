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
  formInputs.forEach((input) => console.log(input.value));
  const contact = {
    firstName: clientName.value,
    lastName: clientLastName.value,
    email: clientEmail.value,
    address: clientAddress.value,
    city: clientCity.value,
  };
  const dataToSend = { contact: contact, products: ordersId };
  console.log(dataToSend, "data");
  const sendData = async () => {
    const rawResponse = await fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    const content = await rawResponse.json();
    // regex check [0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}
    console.log(content);
  };
  await sendData();
};
