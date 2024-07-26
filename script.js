const cat = document.getElementById('cat');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button'); // New stop button

if (cat && scoreDisplay && startButton && stopButton) {
    let score = 0;
    let isPlaying = false;
    let gameInterval;
    const gameDuration = 15000; // 15 seconds

    startButton.addEventListener('click', startGame);
    stopButton.addEventListener('click', stopGame); // Event listener for stop button
    cat.addEventListener('click', debounce(catchCat, 200));

    function startGame() {
        score = 0;
        scoreDisplay.textContent = score;
        isPlaying = true;
        cat.style.display = 'block';
        startButton.disabled = true;
        stopButton.disabled = false; // Enable stop button

        gameInterval = setInterval(moveCat, 1000);

        setTimeout(endGame, gameDuration);
    }

    function stopGame() {
        if (isPlaying) {
            endGame();
        }
    }

    function catchCat() {
        if (isPlaying) {
            score++;
            scoreDisplay.textContent = score;
            moveCat();
        }
    }

    function endGame() {
        isPlaying = false;
        clearInterval(gameInterval);
        cat.style.display = 'none';
        startButton.disabled = false;
        stopButton.disabled = true; // Disable stop button
        alert(`Game over! Your score is ${score}`);
    }

    function moveCat() {
        const x = Math.random() * (window.innerWidth - cat.offsetWidth);
        const y = Math.random() * (window.innerHeight - cat.offsetHeight);
        cat.style.left = `${x}px`;
        cat.style.top = `${y}px`;
    }

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
} else {
    console.error('One or more elements not found');
}