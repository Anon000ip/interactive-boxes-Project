// === JavaScript Code with Fixed Dropdown Behavior ===
const bundles = [
  { id: 1, label: "1 Pair", price: 195, discount: "50% OFF", pairs: 1 },
  { id: 2, label: "2 Pair", price: 345, discount: "40% OFF", pairs: 2, mostPopular: true },
  { id: 3, label: "3 Pair", price: 528, discount: "60% OFF", pairs: 3 }
];

const bundlesContainer = document.getElementById("bundles");
const totalElement = document.getElementById("total");

// Store selections in memory
const selections = {}; 

// Initialize the selected bundle ID
let selectedBundleId = 2;

// Function to render bundles
function renderBundles() {
  bundlesContainer.innerHTML = "";

  bundles.forEach(bundle => {
    const bundleElement = document.createElement("div");
    bundleElement.classList.add("bundle");
    if (bundle.id === selectedBundleId) {
      bundleElement.classList.add("selected");
    }

    bundleElement.innerHTML = `
      <div class="bundle-header">
        <div>
          <p class="bundle-label">${bundle.label}</p>
          <p class="bundle-price">DKK ${bundle.price}.00</p>
        </div>
        <div>
          ${bundle.mostPopular ? `<span class="most-popular">Most Popular</span>` : ""}
          <span class="discount">${bundle.discount}</span>
        </div>
      </div>

      ${bundle.id === selectedBundleId ? renderSizeColorSelectors(bundle.id, bundle.pairs) : ""}
    `;

    // Only trigger bundle selection when clicking outside the dropdowns
    bundleElement.onclick = () => {
      selectedBundleId = bundle.id;
      renderBundles();
      updateTotal();
    };

    bundlesContainer.appendChild(bundleElement);
  });

  updateTotal();
}

// Function to render size and color selectors
function renderSizeColorSelectors(bundleId, pairs) {
  if (!selections[bundleId]) {
    selections[bundleId] = Array.from({ length: pairs }, () => ({
      size: "S",
      color: "Colour"
    }));
  }

  let html = `<div class="options">`;

  selections[bundleId].forEach((pair, index) => {
    html += `
      <div class="options-row" onclick="event.stopPropagation()">   <!-- Prevent event bubbling -->
        <label>#${index + 1}</label>

        <label>Size</label>
        <select data-bundle="${bundleId}" data-index="${index}" data-type="size" onchange="handleSelectionChange(event)">
          <option ${pair.size === "S" ? "selected" : ""}>S</option>
          <option ${pair.size === "M" ? "selected" : ""}>M</option>
          <option ${pair.size === "L" ? "selected" : ""}>L</option>
        </select>

        <label>Colour</label>
        <select data-bundle="${bundleId}" data-index="${index}" data-type="color" onchange="handleSelectionChange(event)">
          <option ${pair.color === "Colour" ? "selected" : ""}>Colour</option>
          <option ${pair.color === "Red" ? "selected" : ""}>Red</option>
          <option ${pair.color === "Blue" ? "selected" : ""}>Blue</option>
          <option ${pair.color === "Green" ? "selected" : ""}>Green</option>
        </select>
      </div>
    `;
  });

  html += `</div>`;
  return html;
}

// Function to handle selection changes
function handleSelectionChange(event) {
  event.stopPropagation();  // Prevent closing on selection

  const bundleId = Number(event.target.dataset.bundle);
  const index = Number(event.target.dataset.index);
  const type = event.target.dataset.type;

  selections[bundleId][index][type] = event.target.value;
}

// Function to update the total price
function updateTotal() {
  const selectedBundle = bundles.find(b => b.id === selectedBundleId);
  totalElement.textContent = `DKK ${selectedBundle.price}.00`;
}

// Initial render
renderBundles();
