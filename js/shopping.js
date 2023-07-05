/*
Authors:
Juan Carlo Soriano 
Batin Orene
*/
const PASS_SELECTION = [
  {
    type: "Standard",
    cost: 100,
  },
  {
    type: "Premium",
    cost: 200,
  },
  {
    type: "Elite",
    cost: 500,
  },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Variables
let shoppingCardContainer;
let selectedPassIndex = 0;

let dropDownMenu;
const MAX_PASSES_COUNT = 8;
let selectedPassCount;

let ccInfoContainer;
let ccCode;
let ccInput;
let ccExpiryMonth;
let ccExpiryYear;

let checkoutFees = 100;
let checkoutTaxRate = 0.1;

// Set up upon loading
window.onload = () => {
  // Dynamically add shopping card selections
  populateShoppingCards();

  // Populate selection choices
  populateItemSelection();

  // Configure data validation for numeric inputs
  configureCreditCardInputs();

  // Calculate Checkout Totals
  updateTotals();

  // Configure Checkout Button
  configureCheckoutButton();

  // Configure Modal
  configureModal();
};

const populateShoppingCards = () => {
  shoppingCardContainer = document.getElementById("shopping-card-selections");

  // Configure a card for each type
  PASS_SELECTION.forEach((pass, i) => {
    const selection = document.createElement("div");
    const text = document.createElement("p");

    // Configure div
    selection.className =
      i === 0
        ? "shopping-card-selection shopping-card-selection--active"
        : "shopping-card-selection";
    selection.id = "shopping-card-selection--" + i;

    // Append title
    selection.appendChild(text);

    // Create card title
    text.innerHTML = pass.type;

    // Create event listener for the div
    selection.addEventListener(
      "click",
      (e) => {
        const ACTIVE_CLASS_NAME = "shopping-card-selection--active";

        // Get all cards
        let cards = document.getElementsByClassName("shopping-card-selection");

        // Remove active class from all cards
        [...cards].forEach((card) => {
          card.classList.remove(ACTIVE_CLASS_NAME);
        });

        // Add active class to current card element
        selection.classList.add(ACTIVE_CLASS_NAME);

        // Update selected index
        selectedPassIndex = Number(
          selection.id.substring(selection.id.length - 1)
        );

        // Update Subtotals
        updateTotals();
      },
      false
    );

    // Append card to container
    shoppingCardContainer.appendChild(selection);
  });
};

const populateItemSelection = () => {
  // Configure dropdown selection
  dropDownMenu = document.createElement("select");
  dropDownMenu.id = "shopping-item-selected-dropdown";
  dropDownMenu.className = "shopping-item-selected-dropdown";

  // Add options to dropdown menu
  for (let index = 1; index <= MAX_PASSES_COUNT; index++) {
    const select = document.createElement("option");
    select.value = index;
    select.innerHTML = index;
    dropDownMenu.appendChild(select);
  }

  // Set selected pass count
  selectedPassCount = 1;

  // Set event listener
  dropDownMenu.addEventListener("change", (e) => {
    // Update pass count
    selectedPassCount = Number(e.target.value);

    // Update Subtotals
    updateTotals();
  });

  // Append dropdown
  const container = document.getElementById("shopping-item-selection");
  container.appendChild(dropDownMenu);
};

const configureCreditCardInputs = () => {
  // Get ccContainerInfo
  ccInfoContainer = document.getElementById("shopping-cc-info");

  // Insert Break
  ccInfoContainer.appendChild(document.createElement("br"));

  // Configure credit card input
  ccInput = document.getElementById("cc-number");

  // Set up event listener for credit card number
  ccInput.addEventListener("input", (e) => {
    const value = ccInput.value;
    const filteredInput = value.replace(/[^0-9]/g, "");
    ccInput.value = filteredInput.slice(0, 16);
  });

  // Configure credit card code
  ccCode = document.getElementById("cc-code");

  // Set up event listener for credit card code
  ccCode.addEventListener("input", (e) => {
    const value = ccCode.value;
    const filteredInput = value.replace(/[^0-9]/g, "");
    ccCode.value = filteredInput.slice(0, 3);
  });

  // Create description
  const tx = document.createElement("p");
  tx.className = "form-el-inline expiry label";
  tx.innerHTML = "Expiry Month / Year";
  ccInfoContainer.appendChild(tx);

  // Set up labels and dropdowns
  ccExpiryMonth = document.createElement("select");
  ccExpiryMonth.id = "cc-expiry-month";
  ccExpiryMonth.className = "shopping-cc-expiry-month form-el-inline";

  // Generate dropdown list of months
  for (let index = 0; index < MONTHS.length; index++) {
    let option = document.createElement("option");
    option.value = index + 1;
    option.innerHTML = MONTHS[index];
    ccExpiryMonth.appendChild(option);
  }

  ccInfoContainer.appendChild(ccExpiryMonth);

  // Expiry Year
  ccExpiryYear = document.createElement("select");
  ccExpiryYear.id = "cc-expiry-year";
  ccExpiryYear.className = "shopping-cc-expiry-year form-el-inline";

  const year = new Date().getFullYear();

  for (let index = year; index < year + 7; index++) {
    let option = document.createElement("option");
    option.value = index;
    option.innerHTML = index;
    ccExpiryYear.appendChild(option);
  }

  ccInfoContainer.appendChild(ccExpiryYear);
};

const updateTotals = () => {
  // Configure Pass Type
  const passTypeEl = document.getElementById("checkoutPassType");
  passTypeEl.innerHTML = PASS_SELECTION[selectedPassIndex].type;

  // Configure Number of Passes
  const passNumEl = document.getElementById("checkoutPassNum");
  passNumEl.innerHTML = selectedPassCount;

  // Configure Subtotal
  const checkoutSubtotalEl = document.getElementById("checkoutSubtotal");
  const subtotal = selectedPassCount * PASS_SELECTION[selectedPassIndex].cost;
  checkoutSubtotalEl.innerHTML = currencyFormatter.format(subtotal);

  // Configure Taxes
  const checkoutTaxesEl = document.getElementById("checkoutTaxes");
  const taxes = subtotal * checkoutTaxRate;
  checkoutTaxesEl.innerHTML = currencyFormatter.format(taxes);

  // Configure Total
  const checkoutTotalEl = document.getElementById("checkoutTotal");
  const total = subtotal + taxes + checkoutFees;
  checkoutTotalEl.innerHTML = currencyFormatter.format(total);
};

const configureCheckoutButton = () => {
  const checkoutBtn = document.getElementById("btn-checkout");

  checkoutBtn.addEventListener("click", (e) => {
    showCheckoutModal();

    const titleEl = document.getElementById("modal-title");
    const messageEl = document.getElementById("modal-message");
    const dismissBtnEl = document.getElementById("btn-modal-dismiss");
    const returnBtnEl = document.getElementById("btn-modal-return");

    if (validateFields()) {
      // Show check out message and link back to home
      titleEl.innerHTML = "Thanks you for your purchase!";
      messageEl.innerHTML = "Your purchase confirmation number is LOZBOTW375.";
      dismissBtnEl.style.visibility = "hidden";
      returnBtnEl.style.visibility = "visible";
    } else {
      // Show error message and dismiss button
      titleEl.innerHTML = "Error!";
      messageEl.innerHTML =
        "Missing or incorrect required fields! Please check the information you've provided.";
      dismissBtnEl.style.visibility = "visible";
      returnBtnEl.style.visibility = "hidden";
    }
  });
};

const configureModal = () => {
  const modalDismissBtn = document.getElementById("btn-modal-dismiss");
  modalDismissBtn.addEventListener("click", (e) => {
    dismissCheckoutModal();
  });
};

// Event Listener Functions
const toggleActiveShoppingCard = (el) => {
  const ACTIVE_CLASS_NAME = "shopping-card-selection--active";

  // Get all cards
  let cards = document.getElementsByClassName("shopping-card-selection");

  // Remove active class from all cards
  [...cards].forEach((card) => {
    card.classList.remove(ACTIVE_CLASS_NAME);
  });

  // Add active class to current card element
  this.classList.add(ACTIVE_CLASS_NAME);
};

// Helper Function
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const validateFields = () => {
  let isValid = true;

  const streetField = document.getElementById("street1");
  const cityField = document.getElementById("city");
  const stateField = document.getElementById("state");
  const postcodeField = document.getElementById("postcode");
  const fnameField = document.getElementById("fname");
  const lnameField = document.getElementById("lname");
  const emailField = document.getElementById("email");
  const ccNumberField = document.getElementById("cc-number");
  const ccCodeField = document.getElementById("cc-code");

  const fields = [
    streetField,
    cityField,
    stateField,
    postcodeField,
    fnameField,
    lnameField,
    emailField,
    ccNumberField,
    ccCodeField,
  ];

  fields.forEach((el, i) => {
    if (String(el.value) === "") {
      isValid = false;
    }
  });

  if (
    String(ccNumberField.value).length !== 16 ||
    String(ccCodeField.value).length !== 3
  ) {
    console.log("cc not valid");
    isValid = false;
  }

  if (!emailValidator(emailField.value)) {
    console.log("email is not valid");
    isValid = false;
  }

  return isValid;
};

const emailValidator = (email) => {
  const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(format);
};

const showCheckoutModal = () => {
  const modal = document.getElementById("checkout-modal");
  modal.style.visibility = "visible";

  const body = document.getElementById("main-body");
  body.style.overflow = "hidden";
  console.log("Show modal");
};

const dismissCheckoutModal = () => {
  const modal = document.getElementById("checkout-modal");
  modal.style.visibility = "hidden";

  const body = document.getElementById("main-body");
  body.style.overflow = "visible";

  const dismissBtnEl = document.getElementById("btn-modal-dismiss");
  const returnBtnEl = document.getElementById("btn-modal-return");

  dismissBtnEl.style.visibility = "hidden";
  returnBtnEl.style.visibility = "hidden";

  console.log("Dismissed modal");
};
