class PomodoroTimer {
    constructor() {
        this.timeLeft = 55 * 60; // 55 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        this.mode = 'pomodoro';
        
        // Timer durations in minutes
        this.durations = {
            pomodoro: 55,
            shortBreak: 5,
            longBreak: 15
        };

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.pomodoroButton = document.getElementById('pomodoro');
        this.shortBreakButton = document.getElementById('shortBreak');
        this.longBreakButton = document.getElementById('longBreak');
        this.taskDialog = document.getElementById('task-dialog');
        this.taskInput = document.getElementById('task-input');
        this.taskDisplay = document.getElementById('task-display');

        // Event listeners
        this.startButton.addEventListener('click', () => this.showTaskDialog());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.pomodoroButton.addEventListener('click', () => this.setMode('pomodoro'));
        this.shortBreakButton.addEventListener('click', () => this.setMode('shortBreak'));
        this.longBreakButton.addEventListener('click', () => this.setMode('longBreak'));
        
        // Task dialog form submission
        this.taskDialog.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const task = this.taskInput.value.trim();
            if (task) {
                this.taskDisplay.textContent = `Current Focus: ${task}`;
                this.taskDialog.close();
                this.start();
            }
        });

        // Initialize display
        this.updateDisplay();
    }

    showTaskDialog() {
        if (!this.isRunning) {
            this.taskInput.value = '';
            this.taskDialog.showModal();
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.playAlarm();
                    this.pause();
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }

    reset() {
        this.pause();
        this.timeLeft = this.durations[this.mode] * 60;
        this.updateDisplay();
    }

    setMode(mode) {
        this.mode = mode;
        this.pause();
        this.timeLeft = this.durations[mode] * 60;
        this.updateDisplay();

        // Update active button
        [this.pomodoroButton, this.shortBreakButton, this.longBreakButton].forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(mode).classList.add('active');
    }

    playAlarm() {
        const audio = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz5f9jfT2IAAA');
        audio.play();
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 