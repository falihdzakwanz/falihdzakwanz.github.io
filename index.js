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

// Add a click event listener to each section link
sectionLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove the active class from the previous active section link
    navbar.querySelector(".active").classList.remove("active");

    // Add the active class to the current section link
    link.classList.add("active");

    // Change the color of the section links based on the mode
    if (body.classList.contains("dark-mode")) {
      // If dark mode is enabled, set the color of the active section link to var(--primary-color) and the others to #fff
      sectionLinks.forEach((link) => {
        if (link.classList.contains("active")) {
          link.style.color = "var(--primary-color)";
        } else {
          link.style.color = "#fff";
        }
      });
    } else {
      // If dark mode is disabled, set the color of the active section link to var(--primary-color) and the others to #000
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

// Add a change event listener to the dark mode toggle
darkModeToggle.addEventListener("change", () => {
  // Change the color of the section links based on the mode
  if (body.classList.contains("dark-mode")) {
    // If dark mode is enabled, set the color of the active section link to var(--primary-color) and the others to #fff
    sectionLinks.forEach((link) => {
      if (link.classList.contains("active")) {
        link.style.color = "var(--primary-color)";
      } else {
        link.style.color = "#fff";
      }
    });
  } else {
    // If dark mode is disabled, set the color of the active section link to var(--primary-color) and the others to #000
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
    // Mendapatkan elemen-elemen dari form
    let email = document.getElementById("email");
    let message = document.getElementById("message");
  
    // Mendapatkan elemen-elemen untuk menampilkan error message
    let emailError = document.getElementById("email-error");
    let messageError = document.getElementById("message-error");

    let messageSent = document.getElementById("message-sent");
  
    // Mendefinisikan variabel untuk menyimpan hasil validasi
    let isValid = true;
  
    // Memeriksa apakah email kosong
    if (email.value == "") {
      // Jika email kosong, ubah nilai isValid menjadi false dan tampilkan error message
      isValid = false;
      emailError.textContent = "Email tidak boleh kosong.";
    } else {
      // Jika email tidak kosong, periksa apakah email memiliki format yang benar
      // Menggunakan regex untuk memeriksa format email
      let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email.value)) {
        // Jika email tidak memiliki format yang benar, ubah nilai isValid menjadi false dan tampilkan error message
        isValid = false;
        emailError.textContent = "Email harus memiliki format yang benar.";
      } else {
        // Jika email memiliki format yang benar, sembunyikan error message
        emailError.textContent = "";
      }
    }
  
    // Memeriksa apakah pesan kosong
    if (message.value == "") {
      // Jika pesan kosong, ubah nilai isValid menjadi false dan tampilkan error message
      isValid = false;
      messageError.textContent = "Pesan tidak boleh kosong.";
    } else {
      // Jika pesan tidak kosong, periksa apakah pesan mengandung script
      // Menggunakan regex untuk memeriksa script
      let scriptRegex = /<script.*?>.*?<\/script>/i;
      if (scriptRegex.test(message.value)) {
        // Jika pesan mengandung script, ubah nilai isValid menjadi false dan tampilkan error message
        isValid = false;
        messageError.textContent = "Pesan tidak boleh mengandung script.";
      } else {
        // Jika pesan tidak mengandung script, sembunyikan error message
        messageError.textContent = "";
      }
    }
  
    // Jika nilai isValid adalah true, kirim data form ke Formspree dengan menggunakan fetch
    if (isValid) {
      // Membuat objek data yang berisi email dan pesan
      let data = {
        email: email.value,
        message: message.value
      };
  
      // Menggunakan fetch untuk mengirim data dengan metode POST
      fetch("https://formspree.io/f/mzbllbge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(function (response) {
          // Jika promise berhasil, periksa apakah respons ok atau tidak
          if (response.ok) {
            // Jika respons ok, berarti email berhasil dikirim
            // Tampilkan pesan teks email berhasil dikirim
            messageSent.style.display = "block";
  
            // Kosongkan lagi kolom input
            email.value = "";
            message.value = "";
          } else {
            // Jika respons tidak ok, berarti ada kesalahan
            // Ubah respons menjadi objek JavaScript
            return response.json();
          }
        })
        .then(function (data) {
          // Jika ada data, berarti ada kesalahan
          // Tampilkan pesan kesalahan
          if(data){
            messageError.textContent = data.error;
            messageError.style.display = "block";
          }
        })
        .catch(function (error) {
          // Jika promise gagal, berarti ada kesalahan
          // Tampilkan pesan kesalahan
          messageError.textContent = error.message;
          messageError.style.display = "block";
        });
    }
  
    e.preventDefault();
  }
  




