document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const statusEl = document.getElementById('game-status');
  const levelEl = document.getElementById('level-indicator');
  const resetBtn = document.getElementById('reset-btn');
  const solveBtn = document.getElementById('solve-btn');

  const GRID_SIZE = 5;
  const CELL_SIZE = 80;
  canvas.width = GRID_SIZE * CELL_SIZE;
  canvas.height = GRID_SIZE * CELL_SIZE;
  
  const GLYPH_STYLES = {
    'A': { color: '#e74c3c', symbol: '⬟' },
    'B': { color: '#3498db', symbol: '⬢' },
    'C': { color: '#2ecc71', symbol: '▲' },
    'D': { color: '#f1c40f', symbol: '◆' },
  };

  const levels = [
    { // Level 1
      pairs: [ { s: 'A', p1: [0, 1], p2: [3, 2] }, { s: 'B', p1: [1, 0], p2: [4, 3] } ],
      solution: {
        'A': [[0, 1], [1, 1], [1, 2], [2, 2], [3, 2]],
        'B': [[1, 0], [2, 0], [2, 1], [3, 1], [3, 0], [4, 0], [4, 1], [4, 2], [4, 3]],
      }
    },
    { // Level 2
      pairs: [ { s: 'A', p1: [0, 0], p2: [4, 4] }, { s: 'B', p1: [1, 2], p2: [3, 2] }, { s: 'C', p1: [0, 3], p2: [3, 0] } ],
       solution: {
        'A': [[0,0],[0,1],[1,1],[2,1],[2,2],[2,3],[3,3],[4,3],[4,4]],
        'B': [[1,2],[2,2],[3,2]],
        'C': [[0,3],[0,4],[1,4],[1,3],[1,2],[1,1],[1,0],[2,0],[3,0]],
      }
    },
     { // Level 3
      pairs: [ { s: 'A', p1: [0, 4], p2: [4, 0] }, { s: 'B', p1: [0, 0], p2: [4, 4] }, { s: 'C', p1: [2, 1], p2: [2, 3] } ],
       solution: {
         'A': [[0,4],[1,4],[1,3],[2,3],[2,2],[2,1],[3,1],[3,0],[4,0]],
         'B': [[0,0],[0,1],[1,1],[1,0],[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4]],
         'C': [[2,1],[2,2],[2,3]],
       }
    },
  ];

  let currentLevel = 0;
  let paths = {};
  let isDrawing = false, currentPath = [], currentSymbol = null;
  let isWin = false;

  function loadLevel(levelIndex) {
    isWin = false;
    currentLevel = levelIndex % levels.length;
    paths = {};
    currentPath = [];
    isDrawing = false;
    
    levelEl.textContent = `Level ${currentLevel + 1}`;
    statusEl.textContent = 'Connect the matching pairs!';
    statusEl.style.color = '#ccc';
    resetBtn.textContent = 'Reset Level';

    draw();
  }

  function drawPath(path, color, lineWidth = 10) {
    if (path.length < 2) return;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(path[0][0] * CELL_SIZE + CELL_SIZE / 2, path[0][1] * CELL_SIZE + CELL_SIZE / 2);

    for (let i = 1; i < path.length - 1; i++) {
      const p1 = [path[i][0] * CELL_SIZE + CELL_SIZE / 2, path[i][1] * CELL_SIZE + CELL_SIZE / 2];
      const p2 = [path[i+1][0] * CELL_SIZE + CELL_SIZE / 2, path[i+1][1] * CELL_SIZE + CELL_SIZE / 2];
      const midPoint = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
      ctx.quadraticCurveTo(p1[0], p1[1], midPoint[0], midPoint[1]);
    }
    const lastPoint = path[path.length-1];
    ctx.lineTo(lastPoint[0] * CELL_SIZE + CELL_SIZE / 2, lastPoint[1] * CELL_SIZE + CELL_SIZE / 2);
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const level = levels[currentLevel];

    level.pairs.forEach(pair => {
      const style = GLYPH_STYLES[pair.s];
      ctx.font = 'bold 36px Arial';
      ctx.fillStyle = style.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const center1 = [pair.p1[0] * CELL_SIZE + CELL_SIZE / 2, pair.p1[1] * CELL_SIZE + CELL_SIZE / 2];
      const center2 = [pair.p2[0] * CELL_SIZE + CELL_SIZE / 2, pair.p2[1] * CELL_SIZE + CELL_SIZE / 2];
      ctx.fillText(style.symbol, center1[0], center1[1]);
      ctx.fillText(style.symbol, center2[0], center2[1]);
    });

    for (const symbol in paths) {
      drawPath(paths[symbol], GLYPH_STYLES[symbol].color);
    }
    
    if (isDrawing) {
      drawPath(currentPath, GLYPH_STYLES[currentSymbol].color);
    }
  }

  function getGridPos(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const col = Math.floor(x / CELL_SIZE), row = Math.floor(y / CELL_SIZE);
    if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) return null;
    return { col, row };
  }

  function checkCollision(newPath, newSymbol) {
    const pathSet = new Set(newPath.map(p => `${p[0]},${p[1]}`));
    for (const symbol in paths) {
      if (symbol === newSymbol) continue;
      for (const point of paths[symbol]) {
        if (pathSet.has(`${point[0]},${point[1]}`)) return true;
      }
    }
    return false;
  }

  function checkWin() {
    if (Object.keys(paths).length === levels[currentLevel].pairs.length) {
      isWin = true;
      statusEl.textContent = "You Win!";
      statusEl.style.color = '#d4af37';
      resetBtn.textContent = 'Next Level';
    }
  }

  function handleStart(e) {
    if (isWin) return;
    const pos = getGridPos(e);
    if (!pos) return;
    const pair = levels[currentLevel].pairs.find(p => (p.p1[0] === pos.col && p.p1[1] === pos.row) || (p.p2[0] === pos.col && p.p2[1] === pos.row));
    if (pair) {
      isDrawing = true;
      currentSymbol = pair.s;
      currentPath = [[pos.col, pos.row]];
      delete paths[currentSymbol];
    }
  }

  function handleMove(e) {
    if (!isDrawing) return;
    const pos = getGridPos(e);
    if (!pos) return;
    const lastPoint = currentPath[currentPath.length - 1];
    if (pos.col !== lastPoint[0] || pos.row !== lastPoint[1]) {
      currentPath.push([pos.col, pos.row]);
      draw();
    }
  }

  function handleEnd(e) {
    if (!isDrawing) return;
    isDrawing = false;
    const pos = getGridPos(e);
    if (!pos) { currentPath = []; draw(); return; }

    const pair = levels[currentLevel].pairs.find(p => p.s === currentSymbol);
    const pathStart = currentPath[0], pathEnd = currentPath[currentPath.length - 1];
    const connects = (pathStart[0] === pair.p1[0] && pathStart[1] === pair.p1[1] && pathEnd[0] === pair.p2[0] && pathEnd[1] === pair.p2[1]) ||
                     (pathStart[0] === pair.p2[0] && pathStart[1] === pair.p2[1] && pathEnd[0] === pair.p1[0] && pathEnd[1] === pair.p1[1]);

    if (connects && !checkCollision(currentPath, currentSymbol)) {
      paths[currentSymbol] = currentPath;
      checkWin();
    }
    currentPath = [];
    draw();
  }
  
  function showSolution() {
      if (isWin) return;
      const solution = levels[currentLevel].solution;
      paths = {}; // clear existing paths
      for (const symbol in solution) {
          paths[symbol] = solution[symbol];
      }
      draw();
      checkWin();
  }

  canvas.addEventListener('mousedown', handleStart);
  canvas.addEventListener('mousemove', handleMove);
  canvas.addEventListener('mouseup', handleEnd);
  canvas.addEventListener('mouseleave', () => { if(isDrawing) { isDrawing = false; currentPath = []; draw(); }});
  
  resetBtn.addEventListener('click', () => {
      if (isWin) {
          loadLevel(currentLevel + 1);
      } else {
          loadLevel(currentLevel);
      }
  });

  solveBtn.addEventListener('click', showSolution);

  loadLevel(0);
});