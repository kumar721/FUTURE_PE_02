// 🌙 DARK MODE TOGGLE
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "🌙 Dark Mode";
toggleBtn.classList.add("button");
toggleBtn.setAttribute("aria-label", "Toggle dark mode");
toggleBtn.setAttribute("id", "dark-mode-toggle");
document.body.prepend(toggleBtn);

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");

    if (document.body.classList.contains("dark-mode")) {
        toggleBtn.innerText = "☀️ Light Mode";
        toggleBtn.setAttribute("aria-label", "Switch to light mode");
    } else {
        toggleBtn.innerText = "🌙 Dark Mode";
        toggleBtn.setAttribute("aria-label", "Switch to dark mode");
    }
});

// Load saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.innerText = "☀️ Light Mode";
    toggleBtn.setAttribute("aria-label", "Switch to light mode");
}


// 🎨 DARK MODE STYLES (applied dynamically)
const darkStyle = document.createElement("style");
darkStyle.innerHTML = `
.dark-mode {
    background: #121212;
    color: #f1f1f1;
    transition: background 0.3s ease, color 0.3s ease;
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
    color: #ddd;
}
.dark-mode .button {
    background: #333;
    color: #f1f1f1;
    border: 1px solid #555;
}
.dark-mode .button:hover {
    background: #444;
}
`;
document.head.appendChild(darkStyle);


// 📋 COPY TO CLIPBOARD BUTTONS
const boxes = document.querySelectorAll(".box, .highlight");

boxes.forEach((box, index) => {
    const btn = document.createElement("button");
    btn.innerText = "📋 Copy";
    btn.classList.add("button");
    btn.setAttribute("aria-label", `Copy content from box ${index + 1}`);
    btn.style.float = "right";
    btn.style.marginBottom = "10px";
    btn.style.padding = "8px 12px";
    btn.style.cursor = "pointer";

    box.prepend(btn);

    btn.addEventListener("click", () => {
        const text = box.innerText.replace("📋 Copy", "").replace("Copy", "").trim();

        // Check if clipboard API is available
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                const originalText = btn.innerText;
                btn.innerText = "✅ Copied!";
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 1500);
            }).catch((err) => {
                console.error("Failed to copy:", err);
                btn.innerText = "❌ Failed";
                setTimeout(() => (btn.innerText = "📋 Copy"), 1500);
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
                btn.innerText = "✅ Copied!";
                setTimeout(() => (btn.innerText = "📋 Copy"), 1500);
            } catch (err) {
                console.error("Fallback copy failed:", err);
                btn.innerText = "❌ Failed";
                setTimeout(() => (btn.innerText = "📋 Copy"), 1500);
            }
            document.body.removeChild(textarea);
        }
    });
});


// 🎯 SMOOTH SCROLL (for anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else {
            console.warn(`Target element ${targetId} not found`);
        }
    });
});


// ✨ SCROLL REVEAL ANIMATION
const sections = document.querySelectorAll("section");

const reveal = () => {
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            section.classList.add("revealed");
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

// Debounce scroll for better performance
let scrollTimeout;
window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(reveal, 50);
}, { passive: true });
