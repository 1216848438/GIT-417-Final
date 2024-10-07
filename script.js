//the free points referenced in an earlier module.
"use strict";

//product array
const product = [
    {
        name: "Lewis Hamilton Poster",
        description: "Celebrate the 7-time F1 champion with this exclusive poster of Lewis Hamilton.",
        cost: 24.99,
        picture: "LHPoster.png"
    },

    {
        name: "Las Vegas Grand Prix Poster",
        description: "Capture the thrill of the Las Vegas Grand Prix with the incredible Vegas backdrop.",
        cost: 14.99,
        picture: "lasVegasPoster.jpg"
    },

    {
        name: "Team Red Bull Poster",
        description: "Show your support for Team Red Bull with this high-quality poster!",
        cost: 19.99,
        picture: "redbullposter.png"
    }
];

let currentProduct = 0;

function display() {
    const productDisplay = document.getElementById("product-display");
    const {name, picture, description, cost} = product[currentProduct];
    productDisplay.innerHTML = `<h3>${name}</h3>
    <img src = "${picture}" alt = "${name}">
    <p>${description}</p>
    <p>Cost: $${cost.toFixed(2)}</p>`;
}

display();

document.getElementById("previous-product").addEventListener("click", function() {
    currentProduct = (currentProduct === 0) ? product.length - 1 : currentProduct -1;
    display();
});

document.getElementById("next-product").addEventListener("click", function() {
    currentProduct = (currentProduct === product.length - 1) ? 0 : currentProduct + 1;
    display();
});

document.getElementById("guess-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const userGuess = parseInt(document.getElementById("car-guess").value, 10);
    const randomCar = Math.floor(Math.random() * 10) + 1;
    let resultMessage;

    if (userGuess === randomCar) {
        resultMessage = `Congratulations, you guessed correctly! Car #${randomCar} is the winner!`;
    } else {
        resultMessage = `Try again! The winning car was #${randomCar}`;
    }

    document.getElementById("game-result").textContent = resultMessage;
});

//contact form
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const contactMethod = document.querySelector("input[name='contact-method']:checked");
    const comment = document.getElementById("comment").value.trim();
    let isValid = true;

    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    if(!name) {
        isValid = false;
        document.getElementById("name-error").textContent = "Name is required.";
    }

    if(!comment) {
        isValid = false;
        document.getElementById("comment-error").textContent = "Comment is required.";
    }

    const phoneValidation = /^\+?[0-9]{10,15}$/;
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(contactMethod && contactMethod.value === "phone" && !phoneValidation.test(phone)) {
        isValid = false;
        document.getElementById("phone-error").textContent = "Please enter a valid phone number";
    } else if (contactMethod && contactMethod.value === "email" && !emailValidation.test(email)) {
        isValid = false;
        document.getElementById("email-error").textContent = "Please enter a valid email";
    }

    if (isValid) {
        const customer = {
            name: name,
            phone: contactMethod.value === "phone" ? phone: null,
            email: contactMethod.value === "email" ? email: null,
            contactMethod: contactMethod.value,
            comment: comment
        };

        document.getElementById("form-result").textContent = `Thank you very much, ${customer.name}! We'll contact you by your chosen method.`;
        document.getElementById("contact-form").reset();
    }
});

// adding in the theme toggle per instructions
const toggleTheme = document.getElementById("toggle-theme");
toggleTheme.addEventListener("click", function() {
    document.body.dataset.theme = document.body.dataset.theme === "light" ? "dark" : "light";
});