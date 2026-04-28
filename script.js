// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {

  // 🔹 Copy to Clipboard Function
  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification("Copied to clipboard!");
    });
  }

  // 🔹 Add Copy Buttons to Cards
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const btn = document.createElement("button");
    btn.innerText = "Copy";
    btn.style.marginTop = "10px";
    btn.style.padding = "5px 10px";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    btn.style.background = "#28a745";
    btn.style.color = "#fff";

    btn.addEventListener("click", () => {
      copyText(card.innerText);
    });

    card.appendChild(btn);
  });

  // 🔹 Toggle Sections
  const sections = document.querySelectorAll("section");

  sections.forEach(section => {
    const header = section.querySelector("h2");

    header.style.cursor = "pointer";

    header.addEventListener("click", () => {
      const content = Array.from(section.children).slice(1);

      content.forEach(el => {
        if (el.style.display === "none") {
          el.style.display = "block";
        } else {
          el.style.display = "none";
        }
      });
    });
  });

  // 🔹 Smooth Scroll for Links (if added later)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // 🔹 Notification System
  function showNotification(message) {
    let notif = document.createElement("div");
    notif.innerText = message;

    notif.style.position = "fixed";
    notif.style.bottom = "20px";
    notif.style.right = "20px";
    notif.style.background = "#333";
    notif.style.color = "#fff";
    notif.style.padding = "10px 15px";
    notif.style.borderRadius = "8px";
    notif.style.boxShadow = "0 3px 10px rgba(0,0,0,0.2)";
    notif.style.zIndex = "1000";

    document.body.appendChild(notif);

    setTimeout(() => {
      notif.remove();
    }, 2000);
  }

});
