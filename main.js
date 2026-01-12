document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');

  generateBtn.addEventListener('click', () => {
    // A simple alert for now, as we are not implementing the backend.
    alert("Imagine your BaitLink is ready! ✨");
    
    // Confetti animation
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1000';

    const ctx = canvas.getContext('2d');
    const confettiCount = 200;
    const confetti = [];

    const colors = ['#ff79c6', '#bd93f9', '#8be9fd', '#50fa7b'];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        radius: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      confetti.forEach(c => {
        c.y += c.speed;
        c.x += Math.sin(c.y / 10) * 2;
        
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
      });

      // Continue animation if confetti are still on screen
      if (confetti.some(c => c.y < canvas.height)) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }

    // Resize canvas to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    animate();
  });
});