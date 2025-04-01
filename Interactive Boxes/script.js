/* Bundle selection system - Mike's implementation */



// Our available packages data

var bundlesData = [

  { 
 
   identifier: 1, 
 
   title: "Single Pack", 
 
   cost: 30, 
 
   promo: "10% OFF", 
 
   quantity: 1 
 
  },
 
  { 
 
   identifier: 2, 
 
   title: "Double Pack", 
 
   cost: 60, 
 
   promo: "20% OFF", 
 
   quantity: 2,
 
   isPopularChoice: true 
 
  },
 
  { 
 
   identifier: 3, 
 
   title: "Triple Pack", 
 
   cost: 90, 
 
   promo: "30% OFF", 
 
   quantity: 3 
 
  }
 
 ];
 
 
 
 // Track user selections
 
 var selectedOptions = {};
 
 var currentSelectedBundle = getDefaultBundle();
 
 
 
 // When page loads
 
 window.onload = function() {
 
  setupBundleDisplay();
 
  setupCartButton();
 
 };
 
 
 
 function getDefaultBundle() {
 
  for (var i = 0; i < bundlesData.length; i++) {
 
   if (bundlesData[i].isPopularChoice) {
 
    return bundlesData[i].identifier;
 
   }
 
  }
 
  return 2; // Fallback to middle option
 
 }
 
 
 
 function setupBundleDisplay() {
 
  var container = document.querySelector('#bundles-container');
 
  container.innerHTML = ''; // Clear previous
 
 
 
  bundlesData.forEach(function(bundle) {
 
   var bundleElement = makeBundleElement(bundle);
 
   container.appendChild(bundleElement);
 
  });
 
 
 
  updatePriceDisplay();
 
 }
 
 
 
 function makeBundleElement(bundle) {
 
  var element = document.createElement('div');
 
  element.className = bundleClass(bundle);
 
   
 
  element.innerHTML = bundleHeaderHTML(bundle);
 
 
 
  if (bundle.identifier === currentSelectedBundle) {
 
   element.innerHTML += bundleOptionsHTML(bundle);
 
  }
 
 
 
  element.onclick = function() {
 
   if (currentSelectedBundle !== bundle.identifier) {
 
    currentSelectedBundle = bundle.identifier;
 
    setupBundleDisplay();
 
   }
 
  };
 
 
 
  return element;
 
 }
 
 
 
 function bundleClass(bundle) {
 
  var baseClass = 'bundle-card';
 
  return bundle.identifier === currentSelectedBundle ? 
 
      baseClass + ' active' : baseClass;
 
 }
 
 
 
 function bundleHeaderHTML(bundle) {
 
  var html = '<div class="bundle-header"><div>';
 
  html += '<div class="bundle-name">' + bundle.title + '</div>';
 
  html += '<div class="bundle-price">$' + bundle.cost + '.00</div>';
 
  html += '</div><div>';
 
 
 
  if (bundle.isPopularChoice) {
 
   html += '<span class="popular-tag">Popular</span>';
 
  }
 
 
 
  html += '<span style="color:#3d9970">' + bundle.promo + '</span>';
 
  html += '</div></div>';
 
  return html;
 
 }
 
 
 
 function bundleOptionsHTML(bundle) {
 
  var html = '<div class="options-wrapper">';
 
  for (var i = 0; i < bundle.quantity; i++) {
 
   html += '<div class="option-row">';
 
   html += '<span class="option-label">Item ' +(i+1) + '</span>';
 
   html += sizeDropdown(bundle, i);
 
   html += colorDropdown(bundle, i);
 
   html += '</div>';
 
  }
 
  html += '</div>';
 
  return html;
 
 }
 
 
 
 function sizeDropdown(bundle, index) {
 
  return '<select class="select-dropdown" onchange="updateSizeSelection(' + 
 
      bundle.identifier + ',' + index + ', this.value)">' +
 
      '<option value="S">Small</option>' +
 
      '<option value="M">Medium</option>' +
 
      '<option value="L">Large</option></select>';
 
 }
 
 
 
 function colorDropdown(bundle, index) {
 
  return '<select class="select-dropdown" onchange="updateColorSelection(' + 
 
      bundle.identifier + ',' + index + ', this.value)">' +
 
      '<option>Color</option>' +
 
      '<option>Red</option>' +
 
      '<option>Blue</option>' +
 
      '<option>Green</option></select>';
 
 }
 
 
 
 function updateSizeSelection(bundleId, itemIndex, value) {
 
  if (!selectedOptions[bundleId]) selectedOptions[bundleId] = [];
 
  if (!selectedOptions[bundleId][itemIndex]) selectedOptions[bundleId][itemIndex] = {};
 
  selectedOptions[bundleId][itemIndex].size = value;
 
 }
 
 
 
 function updateColorSelection(bundleId, itemIndex, value) {
 
  if (!selectedOptions[bundleId]) selectedOptions[bundleId] = [];
 
  if (!selectedOptions[bundleId][itemIndex]) selectedOptions[bundleId][itemIndex] = {};
 
  selectedOptions[bundleId][itemIndex].color = value;
 
 }
 
 
 
 function updatePriceDisplay() {
 
  var bundle = bundlesData.find(function(b) {
 
   return b.identifier === currentSelectedBundle;
 
  });
 
  document.getElementById('total-price').textContent = '$' + bundle.cost + '.00';
 
 }
 
 
 
 function setupCartButton() {
 
  document.getElementById('add-to-cart').onclick = function() {
 
   var bundleName = bundlesData.find(function(b) {
 
    return b.identifier === currentSelectedBundle;
 
   }).title;
 
   alert('Added ' + bundleName + ' to your cart!');
 
  };
 
 }