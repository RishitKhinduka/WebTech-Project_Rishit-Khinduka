

document.addEventListener("DOMContentLoaded", function () {
  initRandomFact();
  initAuctions();
  initContactForm();
  showSavedName();
});

/* ----------------------------------------------------
   RANDOM FACT (Home Page)
   AI helped me choose this simple method of picking
   a random item from an array 
---------------------------------------------------- */

function initRandomFact() {
  const factElement = document.getElementById("fact-text");
  if (!factElement) return; // Only run on home page

  const diamondFacts = [
    "Most diamonds are over a billion years old.",
    "The hardest natural material on Earth is diamond.",
    "Diamonds form under extreme heat and pressure deep in the Earth.",
    "A diamond’s sparkle comes from how it bends light.",
    "Only a small part of mined diamonds are gem quality."
  ];

  const randomIndex = Math.floor(Math.random() * diamondFacts.length);
  factElement.textContent = diamondFacts[randomIndex];
}

/* ----------------------------------------------------
   AUCTIONS PAGE — FETCH JSON
   AI helped me remember how to use fetch() correctly
---------------------------------------------------- */

function initAuctions() {
  const upcomingList = document.getElementById("upcoming-auctions");
  const pastList = document.getElementById("past-auctions");

  if (!upcomingList && !pastList) return; 

  fetch("assets/data/auctions.json")
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data.upcoming)) {
        data.upcoming.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="auction-name">${item.name}</div>
            <div class="auction-date">${item.date} • ${item.location}</div>
            <div>${item.highlight}</div>
          `;
          upcomingList.appendChild(li);
        });
      }

      if (Array.isArray(data.past)) {
        data.past.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="auction-name">${item.name}</div>
            <div class="auction-date">${item.date} • ${item.location}</div>
            <div>${item.highlight}</div>
          `;
          pastList.appendChild(li);
        });
      }
    })
    .catch((error) => {
      console.error("Error loading auctions.json", error);
      upcomingList.innerHTML = "<li>Unable to load auctions right now.</li>";
    });
}


function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formMessage = document.getElementById("form-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let hasError = false;
    formMessage.textContent = "";
    formMessage.className = "";

    if (nameInput.value.trim() === "") hasError = true;
    if (emailInput.value.trim() === "") hasError = true;
    if (messageInput.value.trim() === "") hasError = true;

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(emailInput.value.trim())) {
      hasError = true;
    }

    if (hasError) {
      formMessage.textContent = "Please fill all fields correctly.";
      formMessage.classList.add("message-error");
      return;
    }

    formMessage.textContent =
      "Thank you for your message! We will reply soon.";
    formMessage.classList.add("message-success");

  
    localStorage.setItem("diamondEditName", nameInput.value.trim());

    form.reset();
  });
}


function showSavedName() {
  const greeting = document.getElementById("saved-name-greeting");
  if (!greeting) return;

  const savedName = localStorage.getItem("diamondEditName");
  if (savedName) {
    greeting.textContent = `Welcome back, ${savedName}.`;
  }
}
