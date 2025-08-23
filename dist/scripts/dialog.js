document.addEventListener("DOMContentLoaded", () => {
  const contactDialog = document.getElementById("contact-dialog");
  const buttons = document.querySelectorAll("[data-contact-dialog]");
  const contactClose = document.getElementById('contact_close');

  buttons.forEach(btn => {
    btn.addEventListener("click", () => contactDialog?.showModal());
  });
  contactClose.addEventListener("click", () => contactDialog.close());
});
