document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const responseMessage = document.getElementById("responseMessage");
    const submitButton = document.getElementById("submitButton");
    const emailInput = document.getElementById("email");
    const yearSpan = document.getElementById("year");

    // Set current year in footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Real-time email validation
    emailInput.addEventListener("input", function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value)) {
            emailInput.classList.add("valid");
            emailInput.classList.remove("invalid");
        } else if (emailInput.value === "") {
            emailInput.classList.remove("valid", "invalid");
        } else {
            emailInput.classList.add("invalid");
            emailInput.classList.remove("valid");
        }
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Change button text to "Submitting..."
        submitButton.innerHTML = '<span class="spinner"></span>Sending...';
        submitButton.disabled = true;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const formData = {
            name: name,
            email: email,
            message: message,
        };

        const apiEndpoint = window.location.hostname === "localhost" ? "http://localhost:3000/api/contact" : "https://contact-application-api.vercel.app/api/contacts";

        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                submitButton.innerHTML = 'Submit';
                submitButton.disabled = false;
                responseMessage.innerHTML = `<p>${data.message || 'Message sent successfully!'}</p>`;
                responseMessage.classList.add("success", "show");

                setTimeout(() => {
                    contactForm.reset();
                    responseMessage.innerHTML = "";
                    responseMessage.classList.remove("success", "show");
                }, 3000);
            })
            .catch(error => {
                console.error("Error:", error);
                submitButton.innerHTML = 'Submit';
                submitButton.disabled = false;
                responseMessage.innerHTML = `<p>Error submitting the form. Please try again later.</p>`;
                responseMessage.classList.add("error", "show");

                setTimeout(() => {
                    responseMessage.innerHTML = "";
                    responseMessage.classList.remove("error", "show");
                }, 5000);
            });
    });
});
