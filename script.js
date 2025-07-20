document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const responseMessage = document.getElementById("responseMessage");
    const submitButton = document.getElementById("submitButton");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Change button text to "Submitting..."
        submitButton.value = 'Submitting...';
        submitButton.disabled = true; // Optional: disable the button to prevent multiple submissions

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // const formData = new FormData(contactForm);
        const formData = {
            name: name,
            email: email,
            message: message,
        };

        const apiEndpoint = window.location.hostname === "localhost" ? "http://localhost:3000/api/contact" : "https://contact-application-api.vercel.app/api/contacts";

        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                submitButton.value = 'Submit';
                submitButton.disabled = false; // Re-enable the button
                responseMessage.innerHTML = `<p>${data.message}</p>`;
                responseMessage.classList.add("success", "show"); // Add 'show' class to make the message visible

                setTimeout(() => {
                    contactForm.reset();
                    responseMessage.innerHTML = "";
                    responseMessage.classList.remove("success", "show");
                }, 2000);
            })
            .catch(error => {
                console.error("Error:", error);
                submitButton.value = 'Submit';
                submitButton.disabled = false; // Re-enable the button
                responseMessage.innerHTML = `<p>Error submitting the form. Please try again later.</p>`;
                responseMessage.classList.add("error", "show"); // Add 'show' class to make the message visible

                setTimeout(() => {
                    responseMessage.innerHTML = "";
                    responseMessage.classList.remove("error", "show");
                }, 3000);
            });
    });
});
