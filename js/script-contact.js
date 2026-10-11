/* ================== Contact Form & EmailJS Logic ================== */

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const nameInput = document.getElementById("full-name");
    const emailInput = document.getElementById("email-address");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submit-btn");
    const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
    const btnSpinner = submitBtn ? submitBtn.querySelector(".btn-spinner") : null;
    const statusBox = document.getElementById("form-status");

    // Email format regex
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Toggle error styles on form-group
    const setError = (input, isError) => {
        if (!input) return;
        const parent = input.parentElement;
        if (isError) {
            parent.classList.add("invalid");
            input.setAttribute("aria-invalid", "true");
        } else {
            parent.classList.remove("invalid");
            input.removeAttribute("aria-invalid");
        }
    };

    // Clear error message in real time as user types
    [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
        if (!field) return;
        field.addEventListener("input", () => {
            if (field.parentElement.classList.contains("invalid")) {
                setError(field, false);
            }
        });
    });

    const setSubmittingState = (isSubmitting) => {
        if (!submitBtn) return;
        submitBtn.disabled = isSubmitting;
        if (btnText) btnText.classList.toggle("hidden", isSubmitting);
        if (btnSpinner) btnSpinner.classList.toggle("hidden", !isSubmitting);
    };

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // 1. Honeypot check for bots
        const honeypot = contactForm.querySelector('input[name="_honeypot"], input[name="_hp_website"]');
        if (honeypot && honeypot.value.trim() !== "") {
            // Fake immediate success to trick scrapers
            setSubmittingState(true);
            setTimeout(() => {
                setSubmittingState(false);
                if (statusBox) {
                    statusBox.className = "form-status-msg success";
                    statusBox.innerHTML = "✓ <strong>Thank you!</strong> Your message has been sent successfully.";
                    statusBox.classList.remove("hidden");
                }
                contactForm.reset();
            }, 600);
            return;
        }

        // 2. Client-side field validations
        let isValid = true;

        if (nameInput.value.trim() === "") {
            setError(nameInput, true);
            isValid = false;
        } else {
            setError(nameInput, false);
        }

        if (!validateEmail(emailInput.value.trim())) {
            setError(emailInput, true);
            isValid = false;
        } else {
            setError(emailInput, false);
        }

        if (subjectInput.value.trim() === "") {
            setError(subjectInput, true);
            isValid = false;
        } else {
            setError(subjectInput, false);
        }

        if (messageInput.value.trim().length < 10) {
            setError(messageInput, true);
            isValid = false;
        } else {
            setError(messageInput, false);
        }

        if (!isValid) return;

        // 3. Verify EmailJS SDK presence
        if (typeof emailjs === "undefined") {
            if (statusBox) {
                statusBox.className = "form-status-msg error";
                statusBox.innerHTML = "Unable to connect to mail services. Please reach out directly via email.";
                statusBox.classList.remove("hidden");
            }
            return;
        }

        // 4. Set loading state
        setSubmittingState(true);
        if (statusBox) statusBox.classList.add("hidden");

        // 5. Send Form via EmailJS
        emailjs.sendForm('service_hs9b2xf', 'template_2h0mezz', this)
            .then(() => {
                setSubmittingState(false);

                if (statusBox) {
                    statusBox.className = "form-status-msg success";
                    statusBox.innerHTML = "✓ <strong>Thank you!</strong> Your message has been sent successfully. I'll get back to you as soon as possible.";
                    statusBox.classList.remove("hidden");
                }

                contactForm.reset();

                // Auto-hide alert after 6 seconds
                setTimeout(() => {
                    if (statusBox) statusBox.classList.add("hidden");
                }, 6000);
            })
            .catch((error) => {
                setSubmittingState(false);

                if (statusBox) {
                    statusBox.className = "form-status-msg error";
                    statusBox.innerHTML = "Something went wrong while sending. Please try again later.";
                    statusBox.classList.remove("hidden");
                }

                console.error("EmailJS Error:", error);
            });
    });
});