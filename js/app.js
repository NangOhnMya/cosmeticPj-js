// selectors
const products = [
  {
    id: 1,
    name: "Toner",
    price: 20000,
  },
  {
    id: 2,
    name: "Moisture",
    price: 32000,
  },
  {
    id: 3,
    name: "Suncream",
    price: 35000,
  },
  {
    id: 4,
    name: "Serum",
    price: 20000,
  },
  {
    id: 5,
    name: "Lotion",
    price: 25000,
  },
  {
    id: 6,
    name: "Foundation",
    price: 48000,
  },
  {
    id: 7,
    name: "Lipstick",
    price: 15000,
  },
];

// let rowCount = 1;

const app = document.querySelector("#app");
const newRecord = document.querySelector("#newRecord");
const product = document.querySelector("#product");
const quantity = document.querySelector("#quantity");
const recordTable = document.querySelector("#recordTable");

const records = document.querySelector("#records");
const inventories = document.querySelector("#inventories");

const recordRows = document.querySelector("#record-rows");
const recordsTotal = document.querySelector(".records-total");
const recordsTax = document.querySelector(".records-tax");
const recordsSubtotal = document.querySelector(".records-subtotal");

const newItem = document.querySelector("#newItem");
const newItemName = document.querySelector("#newItemName");
const newItemPrice = document.querySelector("#newItemPrice");

// functions
const createItem = (name, price) => {
  const div = document.createElement("div");
  div.className =
    " item-list border border-2 p-3 mb-3 d-flex justify-content-between";
  div.innerHTML += ` 
  <p class="mb-0 item-name">${name}</p>
  <p class="text-black-50 mb-0 item-price">${price} mmk </p>`;
  // return div;
  inventories.append(div);
};
//create new record from select box table
const createRecordRow = (productId, quantity) => {
  // information
  const currentProduct = products.find((el) => el.id == productId);
  let cost = currentProduct.price * quantity.valueAsNumber;

  const tableRow = document.createElement("tr");
  tableRow.classList.add("record-rows", "animate__animated", "animate__fadeIn");

  tableRow.setAttribute("product-id", productId);
  tableRow.innerHTML = `
            <td class='record-no'></td>
            <td class="text-start record-product">${currentProduct.name}</td>
            <td class="text-end record-price">${currentProduct.price}</td>
            <td class="text-end ">
          
            <span>
            <i class =" record-quantity-control record-quantity-decrement bi bi-dash"></i>
            </span>

            <span class="record-quantity">
            ${quantity.valueAsNumber}
            </span>
            
            <span>
            <i class =" record-quantity-control record-quantity-increment
           bi bi-plus"></i>
            </span>
            </td>

            <td class=" text-end position-relative w-25">

            <span class='record-cost'>${cost} </span>
           
            
            <button class="record-row-del btn btn-sm btn-primary position-absolute  border-0 rounded-3">
            <i class="bi bi-trash3-fill"></i>
            </button>
           
            </td>
            
        `;
  //increment-decrement
  const recordQuantityIncrement = tableRow.querySelector(
    ".record-quantity-increment"
  );
  const recordQuantityDecrement = tableRow.querySelector(
    ".record-quantity-decrement"
  );
  const recordNewQuantity = tableRow.querySelector(".record-quantity");
  const recordNewPrice = tableRow.querySelector(".record-price");
  const recordNewCost = tableRow.querySelector(".record-cost");

  //Increment
  recordQuantityIncrement.addEventListener("click", () => {
    recordNewQuantity.innerText = parseFloat(recordNewQuantity.innerText) + 1;
    let incrementCost = recordNewQuantity.innerText * recordNewPrice.innerText;
    recordNewCost.innerText = incrementCost;
    calculateTotal();
    calculateTax();
    calculateSubtotal();
  });

  //decrement
  recordQuantityDecrement.addEventListener("click", () => {
    if (recordNewQuantity.innerText > 1) {
      recordNewQuantity.innerText = recordNewQuantity.innerText - 1;
      let decrementCost =
        recordNewQuantity.innerText * recordNewPrice.innerText;
      recordNewCost.innerText = decrementCost;
      calculateTotal();
      calculateTax();
      calculateSubtotal();
    } else {
      tableRow.remove();
      calculateTotal();
      calculateTax();
      calculateSubtotal();
    }
  });

  // row  delete
  // const rowDel = tableRow.querySelector(".record-row-del");
  // rowDel.addEventListener("click", () => {
  //   if (window.confirm("Are you sure?")) {
  //     tableRow.classList.add("animate__fadeIn", "animate__zoomOut");
  //     tableRow.addEventListener("animationend", () => {
  //       tableRow.remove();
  //       calculateTotal();
  //       calculateTax();
  //       calculateSubtotal();
  //     });
  //   }
  // });
  tableRow.querySelector(".record-row-del").addEventListener("click", () => {
    if (confirm("Are You Sure?")) {
      tableRow.remove();
      calculateTotal();
      calculateTax();
      calculateSubtotal();
    }
  });

  //   console.log(e.target.parentElement.parentElement.previousParen);

  //   console.log(e.target);
  // })

  return tableRow;
};

//calculate Total
const calculateTotal = () => {
  recordsTotal.innerText = [
    ...document.querySelectorAll(".record-cost"),
  ].reduce((pv, cv) => pv + parseFloat(cv.innerText), 0);
};
// console.clear();

// let total = 0;

//  const allRecords = document.querySelectorAll(".record-cost");
// console.log(allRecords);

// allRecords.forEach(el => {
//     // console.log(el);
//     total += parseFloat(el.innerText)
// })

// recordsTotal.innerText = total;

// Calculating Tax

const calculateTax = () => {
  let tax = recordsTotal.innerText * 0.02;
  recordsTax.innerText = tax;
};

// Calculating Subtotal

const calculateSubtotal = () => {
  let subtotal =
    parseFloat(recordsTotal.innerText) + parseFloat(recordsTax.innerText);
  recordsSubtotal.innerText = subtotal;
};

// process
newItem.addEventListener("submit", (e) => {
  e.preventDefault();
  //product array update
  let newItemId = products[products.length - 1].id + 1;
  const newItemObj = {
    id: newItemId,
    name: newItemName.value,
    price: newItemPrice.valueAsNumber,
  };
  //array update
  products.push(newItemObj);

  //form reset
  newItem.reset();

  // createItem(newItemName.value, newItemPrice.valueAsNumber);
  // createItem(newItemObj.name, newItemObj.price);

  // product.append(new Option(newItemObj.name, newItemObj.id));

  //   //ui update
  product.append(new Option(newItemObj.name, newItemObj.id));
  inventories.append(createItem(newItemObj.name, newItemObj.price));
  // console.log(products);
  //  });
  // const test = document.querySelector(".test");
  //

  // test.addEventListener("click", () => {
  //   console.log(test.children);
});

// generate product
products.forEach((el) => {
  // const newOption = document.createElement("option");
  // newOption.innerText = el.name;
  // newOption.value = el.id
  product.append(new Option(el.name, el.id));
  createItem(el.name, el.price);
});

// add record
newRecord.addEventListener("submit", (e) => {
  e.preventDefault();

  const isExistedRow = document.querySelector(
    `[product-id='${product.value}']`
  );
  if (isExistedRow) {
    let currentPrice = isExistedRow.querySelector(".record-price");
    let currentQuantity = isExistedRow.querySelector(".record-quantity");
    let currentCost = isExistedRow.querySelector(".record-cost");

    let newQuantity =
      parseFloat(currentQuantity.innerText) + quantity.valueAsNumber;
    let newCost = currentPrice.innerText * newQuantity;

    currentQuantity.innerText = newQuantity;
    currentCost.innerText = newCost;
  } else {
    // create new row
    recordRows.append(createRecordRow(product.value, quantity));
  }

  // clear form
  newRecord.reset();

  // calculate total cost
  calculateTotal();
  calculateTax();
  calculateSubtotal();

  // console.log(cost);
  // console.log(product.value);//productId
  // console.log(products.find(el => el.id == product.value));//productDetail
  // console.log(quantity.valueAsNumber);

  // const formData = new FormData(newRecord);
  // console.log(formData.get("product"));
  // console.log(formData.get("quantity"));
});
