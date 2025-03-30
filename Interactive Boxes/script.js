
const bundles = [
  { id: 1, label: "1 Unit", price: 30, discount: "10% OFF", pairs: 1 },
  { id: 2, label: "2 Unit", price: 60, discount: "20% OFF", pairs: 2, mostPopular: true },
  { id: 3, label: "3 Unit", price: 90, discount: "30% OFF", pairs: 3 }
];

const bundlesContainer = document.getElementById("bundles");
const totalElement = document.getElementById("total");


const selections = {}; 


let selectedBundleId = 2;


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
          <p class="bundle-price">USD ${bundle.price}.00</p>
        </div>
        <div>
          ${bundle.mostPopular ? `<span class="most-popular">Most Popular</span>` : ""}
          <span class="discount">${bundle.discount}</span>
        </div>
      </div>

      ${bundle.id === selectedBundleId ? renderSizeColorSelectors(bundle.id, bundle.pairs) : ""}
    `;

    
    bundleElement.onclick = () => {
      selectedBundleId = bundle.id;
      renderBundles();
      updateTotal();
    };

    bundlesContainer.appendChild(bundleElement);
  });

  updateTotal();
}


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


function handleSelectionChange(event) {
  event.stopPropagation();  

  const bundleId = Number(event.target.dataset.bundle);
  const index = Number(event.target.dataset.index);
  const type = event.target.dataset.type;

  selections[bundleId][index][type] = event.target.value;
}


function updateTotal() {
  const selectedBundle = bundles.find(b => b.id === selectedBundleId);
  totalElement.textContent = `USD ${selectedBundle.price}.00`;
}


renderBundles();
