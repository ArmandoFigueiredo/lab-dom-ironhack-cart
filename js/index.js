// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input');

  const priceValue = price.innerText;
  const quantityValue = quantity.valueAsNumber;

  const total = priceValue * quantityValue;

  const subtotal = product.querySelector('.subtotal span');
  subtotal.innerText = total;
  return total;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  const singleProduct = document.querySelector('.product');
  updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  const products = document.getElementsByClassName('product');
  let total = 0;
  for (let product of products) {
    total += updateSubtotal(product);
  }

  // ITERATION 3
  document.querySelector('#total-value span') .innerHTML = total;
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  
  const row = target.parentNode.parentNode;
  console.log('row:', row);

  const parent = row.parentNode;
  console.log('parent:', parent);

  parent.removeChild(row);
  row.remove();

  calculateAll();
}

// ITERATION 5

function createProduct(event) {
  console.log("Starting createProduct");

  const createRow = document.querySelector('.create-product');
  let newProdNameInput = createRow.querySelector("input[type='text']");
  let newProdNameValue = newProdNameInput.value;
  let newProdPriceInput = createRow.querySelector("input[type='number']");
  let newProdPriceValue = Number(newProdPriceInput.valueAsNumber).toFixed(2);

  console.log("Nome:" + newProdNameValue);
  console.log("Price:" + newProdPriceValue);

  const newTableRow = document.createElement('tr');
  newTableRow.className = 'product';
  newTableRow.innerHTML = `
    <td class="name">
      <span>${newProdNameValue}</span>
    </td>
    <td class="price">$<span>${newProdPriceValue}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</>
    </td>
  `;

  const tableBody = document.querySelector('#cart tbody');
  tableBody.appendChild(newTableRow);

  const removeButtons = document.getElementsByClassName('btn-remove');
  lastRemoveButton = removeButtons[removeButtons.length-1];
  lastRemoveButton.addEventListener('click', (e) => removeProduct(e));

  
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //   document.getElementsByClassName('btn-remove') é equivalente a document.querySelect(".btn-remove")
  const removeButton = document.getElementsByClassName('btn-remove');
  for (let i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener('click', (e) => removeProduct(e));
  }
  
  const createBtn = document.getElementById('create');
  
  if (createBtn) {
    createBtn.addEventListener('click', createProduct);
  }


});
