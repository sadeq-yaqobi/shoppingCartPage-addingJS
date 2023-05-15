(function () {
  "use strict";

  // Select the necessary elements
  var state = document.getElementById("s-state");
  var btn = document.getElementById("btn-estimate");

  // Disable the estimate button initially
  btn.disabled = true;

  // Event listener for when the DOM content is loaded
  document.addEventListener("DOMContentLoaded", function () {

    // Event listener for the form submission
    document.getElementById("cart-hplus").addEventListener("submit", calcTotal);

    // Event listener for state selection change
    state.addEventListener("change", function () {
      btn.disabled = state.value === ""; // Enable or disable the estimate button based on state selection
    });
  });

  // Function to calculate the total
  function calcTotal(event) {
    event.preventDefault();

    // Retrieve the input values and selected options
    var itemBball = parseInt(document.getElementById("txt-q-bball").value, 10) || 0;
    var itemJersey = parseInt(document.getElementById("txt-q-jersey").value, 10) || 0;
    var itemPower = parseInt(document.getElementById("txt-q-power").value, 10) || 0;
    var shippingSate = state.value;
    var shippingMethod = document.querySelector("[name=r_method]:checked").value || "";

    // Initialize variables
    var totalQTY = itemBball + itemJersey + itemPower;
    var shippingCostPer;
    var shippingCost;
    var taxFactor = 1;
    var estimate;
    var totalItemPrice = 90 * itemBball + 25 * itemJersey + 30 * itemPower;

    // Apply tax factor based on the shipping state
    if (shippingSate === "CA") {
      taxFactor = 1.075;
    }

    // Calculate shipping cost based on the selected method
    switch (shippingMethod) {
      case "usps":
        shippingCostPer = 2;
        break;
      case "ups":
        shippingCostPer = 3;
        break;
      default:
        shippingCostPer = 0;
        break;
    }
    shippingCost = totalQTY * shippingCostPer;

    // Calculate the estimate
    estimate = "$ " + (totalItemPrice * taxFactor + shippingCost).toFixed(2);

    // Update the estimate display
    document.getElementById("txt-estimate").value = estimate;

    // Update the result display
    var result = document.getElementById("results");
    result.innerHTML = "Total Item: " + totalQTY + "<br>";
    result.innerHTML += "Total Shipping: $" + shippingCost.toFixed(2) + "<br>";
    result.innerHTML += "Tax: " + ((taxFactor - 1) * 100).toFixed(2) + "% (" + shippingSate + ")";
  }
})();
