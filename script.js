
const resultDiv = document.getElementById("result");
const dailyWordEl = document.getElementById("dailyWord");

async function searchWord(wordInput = null) {
  const word = wordInput || document.getElementById("wordInput").value.trim();
  if (!word) {
    resultDiv.innerHTML = `<p>Please enter a word.</p>`;
    return;
  }

  resultDiv.innerHTML = `<p>Loading...</p>`;

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error("Word not found");
    const data = await res.json();

    const entry = data[0];
    const meaning = entry.meanings[0].definitions[0];
    const phonetic = entry.phonetics.find(p => p.text || p.audio) || {};

    resultDiv.innerHTML = `
      <h2>${entry.word}</h2>
      ${phonetic.text ? `<p><strong>Phonetic:</strong> ${phonetic.text}</p>` : ""}
      <p><strong>Definition:</strong> ${meaning.definition}</p>
      ${meaning.example ? `<p><strong>Example:</strong> ${meaning.example}</p>` : ""}
      ${
        phonetic.audio
          ? `<audio controls src="${phonetic.audio}"></audio>`
          : ""
      }
      ${entry.origin ? `<p><strong>Origin:</strong> ${entry.origin}</p>` : ""}
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>❌ Word not found. Try another.</p>`;
  }
}

function getRandomWord() {
  const wordList = [
    "serendipity", "elucidate", "quintessential", "petrichor",
    "ineffable", "sonder", "mellifluous", "ephemeral",
    "limerence", "sonder", "euphoria", "resilience"
  ];
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function loadWordOfTheDay() {
  const word = getRandomWord();
  dailyWordEl.textContent = word;
  searchWord(word);
}

// 🌙 Toggle Dark Mode
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// 🔄 Load daily word on start
window.onload = loadWordOfTheDay;
