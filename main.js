document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const statusEl = document.getElementById('game-status');
  const resetBtn = document.getElementById('reset-btn');

  const GRID_SIZE = 5;
  const CELL_SIZE = 80;
  canvas.width = GRID_SIZE * CELL_SIZE;
  canvas.height = GRID_SIZE * CELL_SIZE;

  const GLYPHS = [
    { symbol: 'A', color: '#e74c3c' },
    { symbol: 'B', color: '#3498db' },
    { symbol: 'C', color: '#2ecc71' },
  ];

  let grid = [];
  let glyphPairs = [];
  let paths = {}; // { 'A': [[0,0], [0,1], ...], 'B': [...] }
  
  let isDrawing = false;
  let currentPath = [];
  let currentSymbol = null;

  function newGame() {
    statusEl.textContent = 'Connect the matching pairs without crossing lines!';
    statusEl.style.color = '#ccc';

    isDrawing = false;
    currentPath = [];
    currentSymbol = null;
    paths = {};
    
    // Hardcoded level
    glyphPairs = [
      { symbol: 'A', start: [0, 1], end: [3, 2] },
      { symbol: 'B', start: [1, 0], end: [4, 3] },
      { symbol: 'C', start: [2, 4], end: [4, 1] },
    ];
    
    draw();
  }

  function getSymbolAt(col, row) {
    for (const pair of glyphPairs) {
      if ((pair.start[0] === col && pair.start[1] === row) || (pair.end[0] === col && pair.end[1] === row)) {
        return pair.symbol;
      }
    }
    return null;
  }
  
  function getPairForSymbol(symbol) {
      return glyphPairs.find(p => p.symbol === symbol);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Glyphs
    glyphPairs.forEach(pair => {
      const glyphStyle = GLYPHS.find(g => g.symbol === pair.symbol);
      ctx.font = 'bold 30px Arial';
      ctx.fillStyle = glyphStyle.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const center1 = [pair.start[0] * CELL_SIZE + CELL_SIZE / 2, pair.start[1] * CELL_SIZE + CELL_SIZE / 2];
      const center2 = [pair.end[0] * CELL_SIZE + CELL_SIZE / 2, pair.end[1] * CELL_SIZE + CELL_SIZE / 2];
      
      ctx.fillText(pair.symbol, center1[0], center1[1]);
      ctx.fillText(pair.symbol, center2[0], center2[1]);
    });

    // Draw completed paths
    for (const symbol in paths) {
      const path = paths[symbol];
      const glyphStyle = GLYPHS.find(g => g.symbol === symbol);
      ctx.strokeStyle = glyphStyle.color;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      path.forEach((p, i) => {
        const center = [p[0] * CELL_SIZE + CELL_SIZE / 2, p[1] * CELL_SIZE + CELL_SIZE / 2];
        if (i === 0) ctx.moveTo(center[0], center[1]);
        else ctx.lineTo(center[0], center[1]);
      });
      ctx.stroke();
    }
    
    // Draw current path
    if (isDrawing && currentPath.length > 0) {
      const glyphStyle = GLYPHS.find(g => g.symbol === currentSymbol);
      ctx.strokeStyle = glyphStyle.color;
      ctx.lineWidth = 10;
      ctx.beginPath();
      currentPath.forEach((p, i) => {
        const center = [p[0] * CELL_SIZE + CELL_SIZE / 2, p[1] * CELL_SIZE + CELL_SIZE / 2];
        if (i === 0) ctx.moveTo(center[0], center[1]);
        else ctx.lineTo(center[0], center[1]);
      });
      ctx.stroke();
    }
  }

  function getGridPos(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) return null;
    return { col, row };
  }
  
  // Basic collision check: Do any two paths occupy the same cell?
  function checkCollision(newPath, newSymbol) {
      const pathSet = new Set(newPath.map(p => `${p[0]},${p[1]}`));
      for(const symbol in paths) {
          if (symbol === newSymbol) continue;
          for(const point of paths[symbol]) {
              if (pathSet.has(`${point[0]},${point[1]}`)) return true;
          }
      }
      return false;
  }
  
  function checkWin() {
      const allConnected = glyphPairs.every(p => paths[p.symbol]);
      if (allConnected) {
          statusEl.textContent = "You Win!";
          statusEl.style.color = '#d4af37';
      }
  }

  canvas.addEventListener('mousedown', (e) => {
    const pos = getGridPos(e);
    if (!pos) return;
    
    const symbol = getSymbolAt(pos.col, pos.row);
    if (symbol) {
        isDrawing = true;
        currentSymbol = symbol;
        currentPath = [[pos.col, pos.row]];
        // If path already exists, we are re-drawing it.
        delete paths[currentSymbol];
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const pos = getGridPos(e);
    if (!pos) return;

    const lastPoint = currentPath[currentPath.length - 1];
    if (pos.col !== lastPoint[0] || pos.row !== lastPoint[1]) {
      currentPath.push([pos.col, pos.row]);
      draw();
    }
  });

  canvas.addEventListener('mouseup', (e) => {
    if (!isDrawing) return;
    const pos = getGridPos(e);
    if (!pos) { // Mouse up outside canvas
        isDrawing = false;
        currentPath = [];
        draw();
        return;
    }

    isDrawing = false;
    const pair = getPairForSymbol(currentSymbol);
    const startPoint = pair.start;
    const endPoint = pair.end;
    const pathStart = currentPath[0];
    const pathEnd = currentPath[currentPath.length - 1];

    // Check if the path connects the correct start and end points
    const connectsCorrectly = 
        (pathStart[0] === startPoint[0] && pathStart[1] === startPoint[1] && pathEnd[0] === endPoint[0] && pathEnd[1] === endPoint[1]) ||
        (pathStart[0] === endPoint[0] && pathStart[1] === endPoint[1] && pathEnd[0] === startPoint[0] && pathEnd[1] === startPoint[1]);

    if (connectsCorrectly && !checkCollision(currentPath, currentSymbol)) {
        paths[currentSymbol] = currentPath;
        checkWin();
    }
    
    currentPath = [];
    draw();
  });
  
  canvas.addEventListener('mouseleave', () => {
      if (isDrawing) {
        isDrawing = false;
        currentPath = [];
        draw();
      }
  });

  resetBtn.addEventListener('click', newGame);

  newGame();
});
