class GameTimer {
    constructor() {
        this.startTime = null;
        this.timerElement = document.getElementById('timer');
        this.interval = null;
    }

    start() {
        this.startTime = new Date();
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        if (!this.startTime) return;
        
        const now = new Date();
        const diff = now - this.startTime;
        
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        
        const timeString = 
            hours.toString().padStart(2, '0') + ':' +
            minutes.toString().padStart(2, '0') + ':' +
            seconds.toString().padStart(2, '0');
            
        this.timerElement.textContent = `Time: ${timeString}`;
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    getTime() {
        if (!this.startTime) return '00:00:00';
        const diff = new Date() - this.startTime;
        return new Date(diff).toISOString().substr(11, 8);
    }
}

// Initialize game timer
const gameTimer = new GameTimer();

// Start timer when page loads if we're past the first room
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
        gameTimer.start();
    }
    
    // Add interactive elements
    initializeInteractiveElements();
});

function initializeInteractiveElements() {
    // Book hover effects
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        book.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            alert(`This book was published in ${year}`);
        });
    });
    
    // Painting interactions
    const paintings = document.querySelectorAll('.painting');
    paintings.forEach(painting => {
        painting.addEventListener('click', function() {
            const god = this.getAttribute('data-god');
            const position = this.getAttribute('data-position');
            alert(`${god} is planet number ${position} from the Sun`);
        });
    });
    
    // Candle animations
    const candles = document.querySelectorAll('.candle');
    candles.forEach(candle => {
        candle.addEventListener('mouseover', function() {
            this.style.filter = 'brightness(1.5)';
        });
        
        candle.addEventListener('mouseout', function() {
            this.style.filter = 'brightness(1)';
        });
    });
}

// Handle form submissions with validation
document.addEventListener('submit', function(e) {
    const form = e.target;
    const input = form.querySelector('input[type="text"]');
    
    if (input) {
        const value = input.value.trim();
        if (!value) {
            e.preventDefault();
            alert('Please enter a code before submitting!');
            input.focus();
        }
    }
});

// Add some atmospheric sound effects (optional)
function playSoundEffect(effect) {
    // This would integrate with Web Audio API for actual sound effects
    console.log(`Playing sound effect: ${effect}`);
}