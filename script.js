/*
const chatBox = document.getElementById("chatBox");
let lastWord = "";
let customMap = JSON.parse(localStorage.getItem("customMap")) || {};

function updateCustomList() {
  const list = document.getElementById("customList");
  if (!list) return; // avoid errors if not on customize page
  list.innerHTML = "<strong>Current Mappings:</strong><br/>";
  for (let gesture in customMap) {
    list.innerHTML += `${gesture} → ${customMap[gesture]}<br/>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("customForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const gestureId = document.getElementById("gestureId").value.trim();
      const customWord = document.getElementById("customWord").value.trim();
      if (gestureId && customWord) {
        customMap[gestureId] = customWord;
        localStorage.setItem("customMap", JSON.stringify(customMap));
        updateCustomList();
        this.reset();
      }
    });
    updateCustomList();
  }
});

// --- Real Prediction via Flask API ---
function getPrediction() {
  fetch("/predict")
    .then((res) => res.json())
    .then((data) => {
      let word = data.prediction;
      // Apply custom mapping if exists
      if (customMap[word]) {
        word = customMap[word];
      }
      displayMessage(word);
      lastWord = word;
    })
    .catch((err) => console.error("Error fetching prediction:", err));
}

function displayMessage(text) {
  const msg = document.createElement("div");
  msg.className = "message";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function speakLast() {
  if (lastWord) {
    const utterance = new SpeechSynthesisUtterance(lastWord);
    speechSynthesis.speak(utterance);
  }
}

// --- Auto update every second ---
setInterval(getPrediction, 1000);
*/
const chatBox = document.getElementById("chatBox");
let lastWord = "";
let customMap = JSON.parse(localStorage.getItem("customMap")) || {};

// --- Update custom mappings list (Customize page only) ---
function updateCustomList() {
  const list = document.getElementById("customList");
  if (!list) return; // avoid errors if not on customize page
  list.innerHTML = "<strong>Current Mappings:</strong><br/>";
  for (let gesture in customMap) {
    list.innerHTML += `${gesture} → ${customMap[gesture]}<br/>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("customForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const gestureId = document.getElementById("gestureId").value.trim();
      const customWord = document.getElementById("customWord").value.trim();
      if (gestureId && customWord) {
        customMap[gestureId] = customWord;
        localStorage.setItem("customMap", JSON.stringify(customMap));
        updateCustomList();
        this.reset();
      }
    });
    updateCustomList();
  }
});

// --- Fetch prediction from Flask API ---
function getPrediction() {
  fetch("/predict")
    .then((res) => res.json())
    .then((data) => {
      let word = data.prediction;

      // Apply custom mapping if exists
      if (customMap[word]) {
        word = customMap[word];
      }

      // Display prediction
      displayMessage("Predicted Gesture: " + word);

      // Save last word for speech
      lastWord = word;
    })
    .catch((err) => {
      console.error("Error fetching prediction:", err);
      displayMessage("Error fetching prediction");
    });
}

// --- Display message in chat box ---
function displayMessage(text) {
  const msg = document.createElement("div");
  msg.className = "message";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// --- Speak the last prediction ---
function speakLast() {
  if (lastWord && lastWord !== "No data") {
    const utterance = new SpeechSynthesisUtterance(lastWord);
    speechSynthesis.speak(utterance);
  } else {
    const utterance = new SpeechSynthesisUtterance("No gesture to speak");
    speechSynthesis.speak(utterance);
  }
}