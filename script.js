/* script.js */

// 1. Select elements
const audio = document.getElementById('audio-track');
const playBtn = document.getElementById('playBtn');
const volumeSlider = document.getElementById('volumeSlider');
const statusText = document.getElementById('status-text');
const loader = document.getElementById('loader');

// 2. Play/Pause Function
playBtn.addEventListener('click', () => {
    // Check if audio is paused
    if (audio.paused) {
        // Try to play
        audio.play()
            .then(() => {
                playBtn.innerText = "PAUSE MUSIC";
                statusText.innerText = "Now Playing...";
                playBtn.style.boxShadow = "0 0 20px var(--primary-color)";
            })
            .catch(error => {
                console.error("Playback failed:", error);
                statusText.innerText = "Error: File not found or blocked";
            });
    } else {
        // Pause
        audio.pause();
        playBtn.innerText = "PLAY MUSIC";
        statusText.innerText = "Paused";
        playBtn.style.boxShadow = "none";
    }
});

// 3. Volume Control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// 4. Loading State (Optional visual polish)
audio.addEventListener('waiting', () => {
    loader.style.display = "block";
    statusText.innerText = "Buffering...";
});

audio.addEventListener('playing', () => {
    loader.style.display = "none";
});