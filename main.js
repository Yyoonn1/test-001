const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.querySelector('.numbers-container');
const historyList = document.getElementById('history-list');

const generationHistory = [];
const elegantColors = [
  '#2c3e50', // Midnight Blue
  '#e74c3c', // Pomegranate
  '#3498db', // Peter River
  '#f1c40f', // Sunflower
  '#8e44ad', // Wisteria
  '#1abc9c'  // Turquoise
];

function updateHistoryView() {
  historyList.innerHTML = '';
  generationHistory.forEach(historyEntry => {
    const entryElement = document.createElement('div');
    entryElement.classList.add('history-entry');
    entryElement.textContent = historyEntry.join(', ');
    historyList.appendChild(entryElement);
  });
}

generateBtn.addEventListener('click', () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    lottoNumbers.add(randomNumber);
  }

  const sortedNumbers = Array.from(lottoNumbers).sort((a, b) => a - b);
  
  generationHistory.unshift(sortedNumbers);
  if (generationHistory.length > 5) {
    generationHistory.pop(); // Keep last 5 entries
  }
  
  updateHistoryView();

  numbersContainer.innerHTML = ''; 
  sortedNumbers.forEach((number, index) => {
    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.textContent = number;
    numberElement.style.backgroundColor = elegantColors[index % elegantColors.length];
    numbersContainer.appendChild(numberElement);
  });
});