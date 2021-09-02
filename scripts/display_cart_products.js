const getCamerasFromCart = () => {
  const camerasInCart = JSON.parse(sessionStorage.getItem("cart"));
  return camerasInCart;
};

const displayShoppingCart = () => {
  const cameras = getCamerasFromCart();

  let contentToDisplay = `<div class="alert alert-primary" role="alert">
    You have no product in your cart :-(</div>`;

  if (cameras) {
    let tableRowsHTML = "";
    let rowIndex = 1;

    cameras.forEach((camera) => {
      let row = `<tr>
                <th scope="row">${rowIndex}</th>
                <td>${camera.lens}</td>
                <td>${camera.lens}</td>
                <td>${camera.cameraId}</td>
              </tr>`;
      tableRowsHTML = tableRowsHTML.concat(row);
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
                <td class="fw-bold">570€</td>
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
