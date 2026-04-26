// 🌙 DARK MODE TOGGLE
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "🌙 Dark Mode";
toggleBtn.classList.add("button");
document.body.prepend(toggleBtn);

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        toggleBtn.innerText = "☀️ Light Mode";
    } else {
        toggleBtn.innerText = "🌙 Dark Mode";
    }
});


// 🎨 DARK MODE STYLES (applied dynamically)
const darkStyle = document.createElement("style");
darkStyle.innerHTML = `
.dark-mode {
    background: #121212;
    color: #f1f1f1;
}
.dark-mode section {
    background: #1e1e1e;
    color: #ddd;
}
.dark-mode h2 {
    border-left: 5px solid #66aaff;
}
.dark-mode .box {
    background: #2a2a2a;
    border: 1px solid #444;
}
`;
document.head.appendChild(darkStyle);


// 📋 COPY TO CLIPBOARD BUTTONS
const boxes = document.querySelectorAll(".box, .highlight");

boxes.forEach((box) => {
    const btn = document.createElement("button");
    btn.innerText = "Copy";
    btn.classList.add("button");
    btn.style.float = "right";
    btn.style.marginBottom = "10px";

    box.prepend(btn);

    btn.addEventListener("click", () => {
        const text = box.innerText.replace("Copy", "").trim();

        navigator.clipboard.writeText(text).then(() => {
            btn.innerText = "Copied!";
            setTimeout(() => (btn.innerText = "Copy"), 1500);
        });
    });
});


// 🎯 SMOOTH SCROLL (for anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});


// ✨ SCROLL REVEAL ANIMATION
const sections = document.querySelectorAll("section");

const reveal = () => {
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        }
    });
};

// Initial hidden state
sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.6s ease";
});

window.addEventListener("scroll", reveal);
reveal();
