document.getElementById('generateBtn').addEventListener('click', generateLottoNumbers);

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        numbers.add(num);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    displayNumbers(sortedNumbers);
}

function displayNumbers(numbers) {
    const container = document.getElementById('numbers');
    container.innerHTML = '';

    numbers.forEach(num => {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.textContent = num;
        ball.style.backgroundColor = getBallColor(num);
        container.appendChild(ball);
    });
}

function getBallColor(num) {
    if (num <= 10) return '#fbc400'; // 노랑
    if (num <= 20) return '#69c8f2'; // 파랑
    if (num <= 30) return '#ff7272'; // 빨강
    if (num <= 40) return '#aaaaaa'; // 회색
    return '#b0d840'; // 초록
}
