let totalProducts = [];
const productsTableElements = document.getElementById("productsTable");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

const goToProductDetails = (productId) => {
  const SelectedProduct = totalProducts.find(
    (product) => product.id === productId
  );
  localStorage.setItem("selectedProduct", JSON.stringify(SelectedProduct));
  window.location.href = `product-details.html?id=${productId}`;
};

function RenderProducts(products) {
  let tableContent = "";
  products.forEach((product) => {
    tableContent += `
        <tr>
          <td onclick='goToProductDetails(${product.id})'><a href=#/>${product.title}</td>
          <td>$${product.price}</td>
          <td>
            <img src='${product.image}'
                 alt='${product.title}'
                 style='width:100px; height:100px;' />
          </td>
        </tr>
      `;
  });
  productsTableElements.innerHTML = tableContent;
}

function populateCategories() {
  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json())
    .then((categories) => {
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent =
          category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Error fetching categories:", err);
      productsTableElements.innerHTML = `Error loading categories: ${err.message}`;
    });
}

function applyFiltersAndSort() {
  let processedProducts = [...totalProducts];
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    processedProducts = processedProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    processedProducts = processedProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  const sortValue = sortFilter.value;
  if (sortValue === "low-high") {
    processedProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high-low") {
    processedProducts.sort((a, b) => b.price - a.price);
  }

  RenderProducts(processedProducts);
}

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {
    totalProducts = products;
    RenderProducts(totalProducts);
    populateCategories();
  })
  .catch((err) => {
    console.error("Error fetching products:", err);
    productsTableElements.innerHTML = `Error showing products: ${err.message}`;
  });

searchInput.addEventListener("input", applyFiltersAndSort);
categoryFilter.addEventListener("change", applyFiltersAndSort);
sortFilter.addEventListener("change", applyFiltersAndSort);
