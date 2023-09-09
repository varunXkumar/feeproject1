document.addEventListener("DOMContentLoaded", function () {
    
    const productNameInput = document.getElementById("productName");
    const productQuantityInput = document.getElementById("productQuantity");
    const productIdInput = document.getElementById("productId");
    const productPriceInput = document.getElementById("productPrice");
    const productDateInput = document.getElementById("productDate");
    const addProductButton = document.getElementById("addProduct");
  
  
    addProductButton.addEventListener("click", function () {
 
      const productName = productNameInput.value.trim();
      const productQuantity = productQuantityInput.value.trim();
      const productId = productIdInput.value.trim();
      const productPrice = productPriceInput.value.trim();
      const productDate = productDateInput.value;
  
      
      if (
        productName === "" ||
        productQuantity === "" ||
        productId === "" ||
        productPrice === ""
      ) {
        alert("Please fill in all required fields.");
        return; 
      }
  
      const product = {
        name: productName,
        quantity: productQuantity,
        id: productId,
        price: productPrice,
        date: productDate,
      };
  
      if (typeof Storage !== "undefined") {
        let products = JSON.parse(localStorage.getItem("products")) || [];
  
        products.push(product);
  
        localStorage.setItem("products", JSON.stringify(products));
  
        productNameInput.value = "";
        productQuantityInput.value = "";
        productIdInput.value = "";
        productPriceInput.value = "";
        productDateInput.value = "";
  
        alert("Product added successfully!");
  
        window.location.href = "./view_products.html";
      } else {
        alert("Local storage is not supported by your browser.");
      }
    });
  });
  