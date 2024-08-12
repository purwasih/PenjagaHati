document.addEventListener('DOMContentLoaded', () => {
    const lyricsContainer = document.querySelector('.lyrics');
    const instructions = document.querySelector('.instructions');
    const thankYou = document.querySelector('.thank-you');
    const playButton = document.getElementById('playButton');
    const audio = document.getElementById('audio');
    let lyrics = [];
    let currentIndex = 0;

    // Memuat file lyrics-timing.json
    fetch('lyrics-timing.json')
        .then(response => response.json())
        .then(data => {
            lyrics = data;
            lyrics.forEach(line => {
                const p = document.createElement('p');
                p.textContent = line.text;
                p.style.opacity = 0;
                p.style.transform = 'scale(0.95)';
                lyricsContainer.appendChild(p);
            });
        });

    function updateLyrics() {
        if (lyrics.length > 0) {
            const currentTime = audio.currentTime;
            lyrics.forEach((line, index) => {
                const p = lyricsContainer.children[index];
                if (line.time <= currentTime && line.time + 5 > currentTime) {
                    p.style.opacity = 1;
                    p.style.transform = 'scale(1)';
                } else {
                    p.style.opacity = 0;
                    p.style.transform = 'scale(0.95)';
                }
            });

            if (currentIndex >= lyrics.length && !thankYou.classList.contains('show')) {
                thankYou.classList.add('show');
            }
        }
    }

    function playMusic() {
        audio.play();
        instructions.style.display = 'none';
        audio.addEventListener('timeupdate', updateLyrics);
    }

    playButton.addEventListener('click', playMusic);
});
