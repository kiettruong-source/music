/* script.js */

document.addEventListener('DOMContentLoaded', () => {

    const playlist = [
        { title: "Drill Love 2", src: "media/drill love 2.mp3" },
        { title: "Drill Love 3", src: "media/drill love 3.mp3" },
        { title: "Drill Love 7", src: "media/drill love 7.mp3" },
        { title: "Anh Đã Quen Với Cô Đơn", src: "media/Anh Đã Quen Với Cô Đơn - Soobin Hoàng Sơn .mp3" },
        { title: "Thằng Điên", src: "media/Thằng Điên - Justatee x Phương Ly. mp3" },
        { title: "Where u at", src: "media/Where u at - Andree .mp3" },
        { title: "Yêu 5", src: "media/Yêu 5 - Rhymastic .mp3" }
    ];

    let currentTrackIndex = 0;
    let isShuffle = false; // New variable to track Shuffle State

    const audio = document.getElementById('audio-track');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const statusText = document.getElementById('status-text');
    const trackTitle = document.getElementById('track-title');
    const loader = document.getElementById('loader');
    const playlistList = document.getElementById('playlist-list');

    initPlaylistUI();
    loadTrack(currentTrackIndex);

    function initPlaylistUI() {
        playlistList.innerHTML = "";
        playlist.forEach((song, index) => {
            const li = document.createElement('li');
            li.classList.add('song-item');
            const trackNumber = (index + 1).toString().padStart(2, '0');
            li.innerHTML = `<span style="margin-right:10px; opacity:0.5; font-size:0.8em;">${trackNumber}</span> ${song.title}`;
            li.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                playMusic();
            });
            playlistList.appendChild(li);
        });
    }

    function updateActiveSongInList() {
        const items = document.querySelectorAll('.song-item');
        items.forEach((item, index) => {
            if (index === currentTrackIndex) {
                item.classList.add('active-song');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active-song');
            }
        });
    }

    function loadTrack(index) {
        audio.src = encodeURI(playlist[index].src);
        trackTitle.innerText = playlist[index].title;
        statusText.innerText = "Ready to Vibe";
        loader.style.display = "none";
        updateActiveSongInList();
    }

    function playMusic() {
        loader.style.display = "block";
        statusText.innerText = "Loading...";
        audio.play().then(() => {
            playBtn.innerText = "PAUSE";
            statusText.innerText = "Now Playing...";
            playBtn.style.boxShadow = "0 0 20px var(--primary-color)";
            loader.style.display = "none";
        }).catch(error => {
            console.error(error);
            statusText.innerText = "Error: File Not Found!";
            loader.style.display = "none";
        });
    }

    function pauseMusic() {
        audio.pause();
        playBtn.innerText = "PLAY MUSIC";
        statusText.innerText = "Paused";
        playBtn.style.boxShadow = "none";
        loader.style.display = "none";
    }

    // --- MAIN PLAYBACK LOGIC ---

    function playNext() {
        if (isShuffle) {
            // Random Logic
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * playlist.length);
            } while (randomIndex === currentTrackIndex && playlist.length > 1);
            currentTrackIndex = randomIndex;
        } else {
            // Sequential Logic
            currentTrackIndex++;
            if (currentTrackIndex > playlist.length - 1) currentTrackIndex = 0;
        }
        loadTrack(currentTrackIndex);
        playMusic();
    }

    function playPrev() {
        // Prev button usually just goes back sequentially, even in shuffle mode
        currentTrackIndex--;
        if (currentTrackIndex < 0) currentTrackIndex = playlist.length - 1;
        loadTrack(currentTrackIndex);
        playMusic();
    }

    // --- EVENT LISTENERS ---

    playBtn.addEventListener('click', () => {
        if (audio.paused) playMusic();
        else pauseMusic();
    });

    nextBtn.addEventListener('click', playNext);

    prevBtn.addEventListener('click', playPrev);

    // TOGGLE SHUFFLE MODE
    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle; // Flip true/false
        shuffleBtn.classList.toggle('active'); // Toggle visual glow
    });

    // Auto-play next song (uses same logic as Next Button)
    audio.addEventListener('ended', playNext);

    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    audio.addEventListener('error', () => {
        statusText.innerText = "Error: File missing";
        playBtn.innerText = "ERROR";
        loader.style.display = "none";
    });

    audio.addEventListener('waiting', () => { loader.style.display = "block"; });
    audio.addEventListener('playing', () => { loader.style.display = "none"; });
});