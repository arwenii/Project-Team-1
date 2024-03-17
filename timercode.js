export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            work: root.querySelector(".timer__btn--work"),
            break: root.querySelector(".timer__btn--break"),
            count: root.querySelector(".pomodoroCount")
        };

        this.interval = null;
        this.remainingSeconds = 0;
        this.befShortBreak = false;
        this.pomodoroCount = 0;

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }
        });

        this.el.work.addEventListener("click", () => {
            this.stop();
            this.remainingSeconds = 25 * 60;
            this.updateInterfaceTime();
            this.befShortBreak = true;
            this.pomodoroCount++;
            this.updatePomodoroCount();
        });

        this.el.break.addEventListener("click", () => {
            this.stop();
            this.remainingSeconds = 30 * 60;
            this.updateInterfaceTime();
            this.pomodoroCount = 0;
            this.updatePomodoroCount();
        });
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="pomodoro">Start</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="pomodoro">Pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    updatePomodoroCount() {
        this.el.count.innerHTML = `<span class="pomodoroCount">Pomodoro Count: ${this.pomodoroCount}</span>`;
    }

    start() {
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();
                if (this.befShortBreak === true) {
                    this.remainingSeconds = 5 * 60;
                    this.befShortBreak = false;
                    this.start();
                }
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
            <div>
                <span class="timer__part timer__part--minutes">00</span>
                <span class="timer__part">:</span>
                <span class="timer__part timer__part--seconds">00</span>
            </div>
            <div>
                <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                    <span class="pomodoro">Start</span>
                </button>
                <button type="button" class="timer__btn timer__btn--pomodoro timer__btn--work">
                    <span class="pomodoro">1 Pomodoro</span>
                </button>
                <button type="button" class="timer__btn timer__btn--pomodoro timer__btn--break">
                    <span class="pomodoro">Long Break</span>
                </button>
    
                <span class="pomodoroCount">Pomodoro Count: 0</span>
            </div>
        `;
    }
}
