const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.querySelector('.numbers-container');

generateBtn.addEventListener('click', () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    lottoNumbers.add(randomNumber);
  }

  const sortedNumbers = Array.from(lottoNumbers).sort((a, b) => a - b);

  numbersContainer.innerHTML = ''; 

  sortedNumbers.forEach(number => {
    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.textContent = number;
    numbersContainer.appendChild(numberElement);
  });
});