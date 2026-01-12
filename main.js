const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.querySelector('.numbers-container');
const historyList = document.getElementById('history-list');

const generationHistory = [];

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
  sortedNumbers.forEach(number => {
    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.textContent = number;
    numbersContainer.appendChild(numberElement);
  });
});