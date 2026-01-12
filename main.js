document.addEventListener('DOMContentLoaded', () => {
  const titleElement = document.getElementById('hero-title');
  const originalText = titleElement.innerText;
  let i = 0;
  
  titleElement.innerText = '';

  function typeWriter() {
    if (i < originalText.length) {
      titleElement.innerHTML += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100); // Adjust typing speed here
    } else {
      // Animation is done
      titleElement.classList.add('animation-done');
    }
  }

  // Start the animation after a short delay
  setTimeout(typeWriter, 500);
});
