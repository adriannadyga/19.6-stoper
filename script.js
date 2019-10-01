//szablon klasy z jednym konstruktorem
class Stopwatch {
    constructor(display) { //parametr konstruktora - pole w którym ma być timer
        this.running = false; //wartość początkowa - czy stoper pracuje
        this.display = display; //element DOM pod którym znajduje się stoper
        this.reset(); //metoda resetująca stoper
        this.print(this.times); //metoda drukująca wynik
    }

    //metody wykonujące się od razu po stworzeniu nowej instancji Stopwatch
    reset() { //obiekt
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    //ustawia tekst elementu DOM, który jest pod atrybutem display
    print() { 
        this.display.innerText = this.format(this.times); //metoda format przygotowuje tekst do wyświetlenia
        this.save = {
            time: this.display.innerText
        }
    }
    /*metoda zwraca szablon wykorzystujący obiekt (times) podany do metody; 
    konstrukcja ${nazwa_zamiennej} umożliwia przekazanie wyniku kolejnej funkcji (pad0) jako jeden z elementów szablonu
    */
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    // calculate() {
    //     this.times.miliseconds += 1;
    //     if (this.times.miliseconds >= 100) {
    //         this.times.seconds += 1;
    //         this.times.milisecondsmiliseconds = 0;
    //     }
    //     if (this.times.seconds >= 60) {
    //         this.times.minutes += 1;
    //         this.times.seconds = 0;
    //     }
    // }
    
    calculate() {
        let {miliseconds, seconds, minutes} = this.times;
        miliseconds += 1;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
    }
    
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    resetWatch() {
        this.running = false;
        this.reset();
        this.print();
    }

    saveTime() {
        let timeItem = this.save.time;
        let node = document.createElement('li');
        let textnode = document.createTextNode(timeItem);
        node.appendChild(textnode);
        document.querySelector('.results').appendChild(node);
    }

    removeTime() {
        let times = document.querySelector('.results');
        times.removeChild(times.lastChild);
    }
};

 //funkcja pad0 dodaje zero do liczb jednocyfrowych
 function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
};

const stopwatch = new Stopwatch(document.querySelector('.stopwatch')); 

//metody wykonywane po kliknięciu w przyciski
let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start()); 

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetWatch());

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.saveTime());

let removeButton = document.getElementById('delete');
removeButton.addEventListener('click', () => stopwatch.removeTime());