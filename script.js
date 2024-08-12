document.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.lyrics p');
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('playButton');
    let currentLine = 0;

    function showNextLine() {
        if (currentLine < lines.length) {
            lines[currentLine].style.opacity = 1;
            lines[currentLine].style.transform = 'scale(1)';
            currentLine++;
        }
    }

    function hideAllLines() {
        lines.forEach(line => {
            line.style.opacity = 0;
            line.style.transform = 'scale(0.95)';
        });
    }

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            hideAllLines();
            currentLine = 0;
            showNextLine();
            setInterval(showNextLine, 3000); // Adjust timing if needed
        } else {
            audio.pause();
        }
    });
});
