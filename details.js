// DOM elements
const productDetailsContainer = document.getElementById("productDetails");
const titleElement = document.getElementById("productTitle");
const priceElement = document.getElementById("productPrice");
const descriptionElement = document.getElementById("productDescription");
const imageElement = document.getElementById("productImage");
const SelectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
console.log(SelectedProduct);

productDetailsContainer.textContent = JSON.stringify(SelectedProduct, null, 2);

if (SelectedProduct) {
  titleElement.textContent = SelectedProduct.title;
  priceElement.textContent = SelectedProduct.price;
  descriptionElement.textContent = SelectedProduct.description;
  imageElement.src = SelectedProduct.image;
  imageElement.alt = SelectedProduct.title;
  imageElement.style = "width:100px; height:100px;";
} else {
  productDetailsContainer.textContent = "No product details available.";
}
