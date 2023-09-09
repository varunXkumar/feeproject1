document.addEventListener("DOMContentLoaded", function () {

  const inventoryList = document.getElementById("inventoryList");
  const deletedProductsList = document.getElementById("deletedProductsList");
  const removeAllDeletedButton = document.getElementById("removeAllDeleted");
  const totalInventoryAmount = document.getElementById("totalAmount"); 

  function calculateTotalAmount() {
    const inventoryData = JSON.parse(localStorage.getItem("products")) || [];

    const total = inventoryData.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);

    return total.toFixed(2);
  }

  function renderInventory() {
    
    inventoryList.innerHTML = "";

    
    let inventoryData = JSON.parse(localStorage.getItem("products")) || [];

    inventoryData = inventoryData.filter((product) => product.quantity > 0);

    inventoryData.forEach(function (product) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td><span class="quantity">${product.quantity}</span> 
            <button class="edit-button">Edit</button></td>
        <td>${product.id}</td>
        <td>${product.price}</td>
        <td>${product.date}</td>
        <td class="total-amount">${(product.quantity * product.price).toFixed(2)}</td>
        <td><button class="delete-button">Delete</button></td>
      `;

      const editButton = row.querySelector(".edit-button");
      editButton.addEventListener("click", function () {
        const quantityElement = row.querySelector(".quantity");
        const newQuantity = prompt("Enter the new quantity:", product.quantity);
        if (newQuantity !== null && !isNaN(newQuantity)) {
          quantityElement.textContent = newQuantity;

          product.quantity = parseInt(newQuantity);
          localStorage.setItem("products", JSON.stringify(inventoryData));

          const totalAmountElement = row.querySelector(".total-amount");
          totalAmountElement.textContent = (product.quantity * product.price).toFixed(2);

      
          if (product.quantity === 0) {
           
            const deletedProducts = JSON.parse(localStorage.getItem("deletedProducts")) || [];
            deletedProducts.push(product);
            localStorage.setItem("deletedProducts", JSON.stringify(deletedProducts));

            const index = inventoryData.indexOf(product);
            if (index !== -1) {
              inventoryData.splice(index, 1);
              localStorage.setItem("products", JSON.stringify(inventoryData));
            }

            renderInventory();
            renderDeletedProducts();
          }

          totalInventoryAmount.textContent = `Total Amount: $${calculateTotalAmount()}`;
        }
      });

      
      const deleteButton = row.querySelector(".delete-button");
      deleteButton.addEventListener("click", function () {
        
        const deletedProducts = JSON.parse(localStorage.getItem("deletedProducts")) || [];
        deletedProducts.push(product);
        localStorage.setItem("deletedProducts", JSON.stringify(deletedProducts));

        
        const index = inventoryData.indexOf(product);
        if (index !== -1) {
          inventoryData.splice(index, 1);
          localStorage.setItem("products", JSON.stringify(inventoryData));
        }

        
        renderInventory();
        renderDeletedProducts();

        totalInventoryAmount.textContent = `Total Amount: $${calculateTotalAmount()}`;
      });

      inventoryList.appendChild(row);
    });
  }

  function renderDeletedProducts() {
    
    deletedProductsList.innerHTML = "";

    
    const deletedProducts = JSON.parse(localStorage.getItem("deletedProducts")) || [];

    deletedProducts.forEach(function (product) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.id}</td>
        <td>${product.price}</td>
        <td>${product.date}</td>
      `;

      deletedProductsList.appendChild(row);
    });
  }

  removeAllDeletedButton.addEventListener("click", function () {
    localStorage.removeItem("deletedProducts");
    renderDeletedProducts();
  });

  renderInventory();
  renderDeletedProducts();

  totalInventoryAmount.textContent = `Total Amount: Rs ${calculateTotalAmount()}`;
});
