// --- PART 1: CSS3 Transitions & Animations Interactive Controls ---

// Toggle fading animation on box
const fadingBox = document.getElementById('fadingBox');
const toggleFadeBtn = document.getElementById('toggleFadeBtn');
toggleFadeBtn.addEventListener('click', () => {
    fadingBox.classList.toggle('paused');
});

// Adjust fade animation speed live
const fadeSpeed = document.getElementById('fadeSpeed');
const fadeSpeedValue = document.getElementById('fadeSpeedValue');
fadeSpeed.addEventListener('input', () => {
    fadingBox.style.animationDuration = fadeSpeed.value + 's';
    fadeSpeedValue.textContent = fadeSpeed.value;
});

// Add animated item to animated-list
const addItemBtn = document.getElementById('addItemBtn');
const animatedList = document.getElementById('animatedList');
let itemCount = 1;
addItemBtn.addEventListener('click', () => {
    const li = document.createElement('li');
    li.textContent = `Item ${itemCount++}`;
    animatedList.appendChild(li);
    // Remove after 6 items for demo
    if (animatedList.children.length > 6) animatedList.removeChild(animatedList.firstChild);
});

// --- PART 2: JavaScript Functions — Scope, Parameters, Return Values ---

let globalColor = "#b2ff59";

function getRandomColor() {
    // Returns a random readable RGB color
    const r = Math.floor(100 + Math.random() * 156);
    const g = Math.floor(100 + Math.random() * 156);
    const b = Math.floor(100 + Math.random() * 156);
    return `rgb(${r},${g},${b})`;
}

function setBoxColor(elementId, color) {
    const el = document.getElementById(elementId);
    if (el) {
        el.style.background = color;
        // Adjust text color for contrast
        el.style.color = isDark(color) ? "#fff" : "#222";
        return true;
    }
    return false;
}

// Helper to check if color is dark
function isDark(rgb) {
    // Parse rgb(r,g,b)
    const res = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
    if (!res) return false;
    const [r,g,b] = [+res[1],+res[2],+res[3]];
    // Perceived luminance
    return (0.299*r + 0.587*g + 0.114*b) < 150;
}

function updateGlobalColor() {
    globalColor = getRandomColor();
    return globalColor;
}

// Sums two numbers, returns sum
function sum(a, b) {
    return a + b;
}

// --- DOM Event: Color Box ---
const randomColorBtn = document.getElementById('randomColorBtn');
randomColorBtn.addEventListener('click', () => {
    const newColor = updateGlobalColor();
    setBoxColor('colorBox', newColor);
});

// --- DOM Event: Sum Button ---
const sumBtn = document.getElementById('sumBtn');
sumBtn.addEventListener('click', () => {
    const num1 = Number(document.getElementById('num1').value);
    const num2 = Number(document.getElementById('num2').value);
    const result = sum(num1, num2);
    document.getElementById('sumOutput').textContent = `Sum: ${result}`;
});

// --- Scope Demo ---
const showScopeBtn = document.getElementById('showScopeBtn');
const scopeOutput = document.getElementById('scopeOutput');
showScopeBtn.addEventListener('click', () => {
    // Local variable doesn't affect global
    let globalColor = "local scope color";
    scopeOutput.textContent = 
      `Inside function, globalColor = "${globalColor}" (local), outside = "${window.globalColor}" (global)`;
});

// --- PART 3: Combining CSS & JS Animations ---

// Box animation
const animateBoxBtn = document.getElementById('animateBoxBtn');
const animatedBox = document.getElementById('animatedBox');
animateBoxBtn.addEventListener('click', () => {
    animatedBox.classList.remove('animate');
    void animatedBox.offsetWidth; // force reflow
    animatedBox.classList.add('animate');
});

// Modal logic
const showModalBtn = document.getElementById('showModalBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalColorPicker = document.getElementById('modalColorPicker');

function showModal() { modal.classList.add('show'); }
function hideModal() { modal.classList.remove('show'); }

showModalBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', hideModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
});
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show') && e.key === "Escape")
        hideModal();
});

// Modal color picker
modalColorPicker.addEventListener('input', (e) => {
    modal.querySelector('.modal-content').style.background = e.target.value;
});

// --- Accessibility: focus trap for modal ---
modal.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('show')) return;
    const focusables = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    const first = focusables[0], last = focusables[focusables.length-1];
    if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
            last.focus(); e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
            first.focus(); e.preventDefault();
        }
    }
});

// --- User experience tweaks: focus on open modal, animated box can be focused via keyboard ---
showModalBtn.addEventListener('click', () => {
    setTimeout(() => closeModalBtn.focus(), 300);
});
animatedBox.addEventListener('keydown', e => {
    if (e.key === "Enter" || e.key === " ") {
        animatedBox.classList.remove('animate');
        void animatedBox.offsetWidth;
        animatedBox.classList.add('animate');
    }
});
