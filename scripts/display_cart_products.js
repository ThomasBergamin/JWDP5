const getCamerasFromCart = () => {
  const camerasInCart = JSON.parse(sessionStorage.getItem("cart"));
  return camerasInCart;
};

const displayShoppingCart = () => {
  const cameras = getCamerasFromCart();

  let contentToDisplay = `<div class="alert alert-primary" role="alert">
    You have no products in your cart :-(</div>`;

  if (cameras) {
    let tableRowsHTML = "";
    let rowIndex = 1;
    let totalPrice = 0;

    cameras.forEach((camera) => {
      const cameraPrice = parseInt(camera.price);
      totalPrice += cameraPrice;
      let row = `<tr>
                <th scope="row">${rowIndex}</th>
                <td>${camera.name}</td>
                <td>${camera.lens}</td>
                <td>${camera.price}€</td>
              </tr>`;
      tableRowsHTML = tableRowsHTML.concat(row);
      rowIndex++;
    });

    let tableHTML = `<table class="table table-striped table-hover table-bordered">
            <thead class="table-primary">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Camera Name</th>
                <th scope="col">Lens</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHTML}
            </tbody>
            <tfoot class="table-primary">
              <tr>
                <th scope="row">Total</th>
                <td>--</td>
                <td>--</td>
                <td class="fw-bold">${totalPrice},00€</td> 
              </tr>
            </tfoot>
          </table>`;
    contentToDisplay = tableHTML;
  }

  let container = document.getElementById("emptyDiv");
  container.innerHTML = contentToDisplay;
  return;
};

displayShoppingCart();
