const darkModeToggle = document.getElementById('darkModeToggle');
const checkbox = document.getElementById("click");
const body = document.body;
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
const navbar = document.querySelector("ul");
const sectionLinks = navbar.querySelectorAll("li a");
const form = document.getElementById("contact-form");

if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});

sectionLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.querySelector(".active").classList.remove("active");

    link.classList.add("active");

    if (body.classList.contains("dark-mode")) {
      sectionLinks.forEach((link) => {
        if (link.classList.contains("active")) {
          link.style.color = "var(--primary-color)";
        } else {
          link.style.color = "#fff";
        }
      });
    } else {
      sectionLinks.forEach((link) => {
        if (link.classList.contains("active")) {
          link.style.color = "var(--primary-color)";
        } else {
          link.style.color = "#000";
        }
      });
    }
    checkbox.checked = false;
  });
});

darkModeToggle.addEventListener("change", () => {
  if (body.classList.contains("dark-mode")) {
    sectionLinks.forEach((link) => {
      if (link.classList.contains("active")) {
        link.style.color = "var(--primary-color)";
      } else {
        link.style.color = "#fff";
      }
    });
  } else {
    sectionLinks.forEach((link) => {
      if (link.classList.contains("active")) {
        link.style.color = "var(--primary-color)";
      } else {
        link.style.color = "#000";
      }
    });
  }
});

form.addEventListener("submit", validateForm); 

  function validateForm(e) {
    let email = document.getElementById("email");
    let message = document.getElementById("message");
  
    let emailError = document.getElementById("email-error");
    let messageError = document.getElementById("message-error");

    let messageSent = document.getElementById("message-sent");
  
    let isValid = true;
  
    if (email.value == "") {
      isValid = false;
      emailError.textContent = "Email cannot be empty.";
    } else {
      let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email.value)) {
        isValid = false;
        emailError.textContent = "Email must have a valid format.";
      } else {
        emailError.textContent = "";
      }
    }
  
    if (message.value == "") {
      isValid = false;
      messageError.textContent = "Message cannot be empty.";
    } else {

      let scriptRegex = /<script.*?>.*?<\/script>/i;
      if (scriptRegex.test(message.value)) {
        isValid = false;
        messageError.textContent = "The message must not contain scripts.";
      } else {
        messageError.textContent = "";
      }
    }
  
    if (isValid) {
      let data = {
        email: email.value,
        message: message.value
      };
  
      fetch("https://formspree.io/f/mzbllbge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(function (response) {
          if (response.ok) {
            messageSent.style.display = "block";
  
            email.value = "";
            message.value = "";
          } else {
            return response.json();
          }
        })
        .then(function (data) {
          if(data){
            messageError.textContent = data.error;
            messageError.style.display = "block";
          }
        })
        .catch(function (error) {
          messageError.textContent = error.message;
          messageError.style.display = "block";
        });
    }
  
    e.preventDefault();
  }
  




