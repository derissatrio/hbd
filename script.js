// Music functionality
let isPlaying = false;
const music = document.getElementById('birthdayMusic');
const playBtn = document.querySelector('.play-btn');
const playIcon = document.querySelector('.play-icon');
const musicText = document.querySelector('.music-text');

// Initialize music player
function initMusic() {
    // Update audio source with a working birthday song
    music.innerHTML = `
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav">
        <source src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" type="audio/ogg">
    `;
    music.load();
}

// Toggle music function
function toggleMusic() {
    if (isPlaying) {
        music.pause();
        playIcon.textContent = '▶️';
        musicText.textContent = 'Putar Lagu Ulang Tahun';
        playBtn.style.background = 'linear-gradient(45deg, #ff6b9d, #c44569)';
        isPlaying = false;
    } else {
        music.play().then(() => {
            playIcon.textContent = '⏸️';
            musicText.textContent = 'Hentikan Musik';
            playBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            isPlaying = true;
        }).catch(error => {
            console.log('Error playing music:', error);
            // Fallback: create a simple birthday melody using Web Audio API
            playBirthdayMelody();
        });
    }
}

// Fallback birthday melody using Web Audio API
function playBirthdayMelody() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Happy Birthday melody notes (simplified)
    const notes = [
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 293.66, duration: 1 },   // D
        { freq: 261.63, duration: 1 },   // C
        { freq: 349.23, duration: 1 },   // F
        { freq: 329.63, duration: 2 },   // E
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 293.66, duration: 1 },   // D
        { freq: 261.63, duration: 1 },   // C
        { freq: 392.00, duration: 1 },   // G
        { freq: 349.23, duration: 2 }    // F
    ];
    
    let currentTime = audioContext.currentTime;
    
    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(note.freq, currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        
        currentTime += note.duration;
    });
    
    // Update button state
    playIcon.textContent = '⏸️';
    musicText.textContent = 'Memainkan Melodi...';
    playBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
    isPlaying = true;
    
    // Reset button after melody ends
    setTimeout(() => {
        playIcon.textContent = '▶️';
        musicText.textContent = 'Putar Lagu Ulang Tahun';
        playBtn.style.background = 'linear-gradient(45deg, #ff6b9d, #c44569)';
        isPlaying = false;
    }, currentTime * 1000);
}

// Add sparkle effect on click
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #ff6b9d, #ffd700);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleAnimation 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Add click sparkle effect
document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
});

// Add floating hearts on photo hover
const photoFrame = document.querySelector('.photo-frame');
if (photoFrame) {
    photoFrame.addEventListener('mouseenter', () => {
        createFloatingHeart();
    });
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        font-size: 2rem;
        pointer-events: none;
        z-index: 1000;
        animation: floatingHeart 2s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Add floating heart animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatingHeart {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -100px) scale(1.2);
            opacity: 0.8;
        }
        100% {
            transform: translate(-50%, -150px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Add typewriter effect to messages
function typeWriter(element, text, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter effect for messages
function initTypewriter() {
    const messages = document.querySelectorAll('.message-text');
    const originalTexts = Array.from(messages).map(msg => msg.textContent);
    
    messages.forEach((msg, index) => {
        setTimeout(() => {
            typeWriter(msg, originalTexts[index], 30);
        }, index * 2000);
    });
}

// Add confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#ffd700', '#ff69b4', '#87ceeb', '#98fb98'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -10px;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                pointer-events: none;
                z-index: 1000;
                animation: confettiFall 3s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Add cake click interaction
const cake = document.querySelector('.birthday-cake');
if (cake) {
    cake.addEventListener('click', () => {
        createConfetti();
        // Add cake celebration animation
        cake.style.animation = 'none';
        setTimeout(() => {
            cake.style.animation = 'cakeFloat 2s ease-in-out infinite, cakeCelebrate 1s ease-out';
        }, 10);
    });
}

// Add cake celebration animation
const cakeStyle = document.createElement('style');
cakeStyle.textContent = `
    @keyframes cakeCelebrate {
        0%, 100% {
            transform: scale(1) rotate(0deg);
        }
        25% {
            transform: scale(1.1) rotate(-5deg);
        }
        75% {
            transform: scale(1.1) rotate(5deg);
        }
    }
`;
document.head.appendChild(cakeStyle);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // initMusic();
    
    // Start typewriter effect after a delay
    setTimeout(() => {
        initTypewriter();
    }, 1000);
    
    // Add welcome confetti
    setTimeout(() => {
        createConfetti();
    }, 2000);
});

// Add smooth scrolling for better mobile experience
document.documentElement.style.scrollBehavior = 'smooth';

// Add touch feedback for mobile
document.addEventListener('touchstart', (e) => {
    createSparkle(e.touches[0].clientX, e.touches[0].clientY);
});

// Prevent context menu on long press for better mobile experience
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});