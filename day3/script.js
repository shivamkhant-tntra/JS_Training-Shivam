const form = document.querySelector("form");
const nameInput = document.getElementById("nameField");
const email = document.getElementById("emailField");
const age = document.getElementById("ageField");
const dob = document.getElementById("dobField");
const genderMale = document.getElementById("male");
const genderFemale = document.getElementById("female");
const country = document.getElementById("country");
const displayBox = document.getElementById("submissions");
if (localStorage.getItem("dark") === null) {
  localStorage.setItem("dark", "false");
}

function toggleTheme() {
  const dark = localStorage.getItem("dark");
  const curr = dark === "true";
  localStorage.setItem("dark", String(!curr));
  applyTheme();
}

function applyTheme(params) {
  const dark = localStorage.getItem("dark") === "true";
  const body = document.body;

  if (dark) {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    displayBox.style.borderColor = "white";
  } else {
    body.style.backgroundColor = "";
    body.style.color = "";
  }
}

applyTheme();

function validateName() {
  const input = nameInput.value;
  if (input === "") {
    document.getElementById("nameMessage").innerText = "Name is required";
    return false;
  } else if (input.length <= 1 || input.length > 50) {
    document.getElementById("nameMessage").innerText =
      "Enter valid length between 1 and 50";
    return false;
  } else {
    document.getElementById("nameMessage").innerText = "";
    return true;
  }
}
nameInput.addEventListener("input", validateName);

function validateEmail() {
  const emailInput = email.value;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailInput === "") {
    document.getElementById("emailMessage").innerText = "Email is required";
    return false;
  } else if (!regex.test(emailInput)) {
    document.getElementById("emailMessage").innerText = "Enter valid email";
    return false;
  } else if (emailFromData(emailInput)) {
    document.getElementById("emailMessage").innerText = "Email already exists";
    return false;
  } else {
    document.getElementById("emailMessage").innerText = "";
    return true;
  }
}

function emailFromData(emailInput) {
  const data = JSON.parse(localStorage.getItem("formData"));
  let isPresent = false;
  data.forEach((item) => {
    console.log(item.email);
    if (item.email == emailInput) {
      isPresent = true;
    }
  });
  return isPresent;
}

email.addEventListener("input", validateEmail);

function validateAge() {
  const ageInput = parseInt(age.value);
  if (isNaN(ageInput)) {
    document.getElementById("ageMessage").innerText = "Enter a number.";
    return false;
  } else if (ageInput < 2 || ageInput > 120) {
    document.getElementById("ageMessage").innerText = "Enter appropriate age.";
    return false;
  } else {
    document.getElementById("ageMessage").innerText = "";
    return true;
  }
}

age.addEventListener("input", validateAge);

function validateDOB() {
  const dobInput = new Date(dob.value);
  const today = new Date();
  if (dobInput === "") {
    document.getElementById("dobMessage").innerText = "Enter Date of birth.";
    return false;
  } else if (dobInput > today) {
    document.getElementById("dobMessage").innerText =
      "Enter valid Date of birth.";
    return false;
  } else {
    document.getElementById("dobMessage").innerText = "";
    return true;
  }
}

dob.addEventListener("input", validateDOB);

function validateGender() {
  const messageLine = document.getElementById("genderMessage");
  if (!genderFemale.checked && !genderMale.checked) {
    messageLine.innerText = "Select a gender.";
    return false;
  } else if (genderFemale.checked || genderMale.checked) {
    messageLine.innerText = "";
    return true;
  }
}

function validateHobby() {
  const checkbox = document.getElementsByName("checkbox-group");
  const messagebox = document.getElementById("hobbyMessage");
  let count = 0;

  checkbox.forEach((element) => {
    if (element.checked) {
      count++;
    }
  });

  if (count == 0) {
    messagebox.innerText = "Select any one hobby.";
    return false;
  } else {
    messagebox.innerText = "";
    return true;
  }
}

function validateCountry() {
  const countryMessage = document.getElementById("countryMessage");
  if (country.value === "") {
    countryMessage.textContent = "Select a country.";
    return false;
  } else {
    countryMessage.textContent = "";
    return true;
  }
}

function saveData() {
  const userData = {
    name: nameInput.value.trim(),
    email: email.value.trim(),
    age: age.value.trim(),
    dob: dob.value.trim(),
    gender: genderMale.checked ? "Male" : genderFemale.checked ? "Female" : "",
    hobbies: Array.from(document.getElementsByName("checkbox-group"))
      .filter((hb) => hb.checked)
      .map((hb) => hb.value),
    country: country.value.trim(),
  };

  let formData = JSON.parse(localStorage.getItem("formData"));
  if (!Array.isArray(formData)) {
    formData = [];
  }
  formData.push(userData);
  localStorage.setItem("formData", JSON.stringify(formData));
}

function displayData() {
  const list = document.getElementById("dataList");
  list.innerHTML = "";
  const dataList = JSON.parse(localStorage.getItem("formData"));
  dataList.forEach((data, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = JSON.stringify(data);
    list.appendChild(listItem);
  });
}

displayData();

function validateForm(event) {
  event.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isDOBValid = validateDOB();
  const isAgeValid = validateAge();
  const isGenderValid = validateGender();
  const isHobbyValid = validateHobby();
  const isCountryValid = validateCountry();
  if (
    isNameValid &&
    isEmailValid &&
    isDOBValid &&
    isAgeValid &&
    isGenderValid &&
    isHobbyValid &&
    isCountryValid
  ) {
    saveData();
    displayData();
  } else {
    document.getElementById("validationMessage").innerText =
      "Invalid details submitted.";
  }
}
