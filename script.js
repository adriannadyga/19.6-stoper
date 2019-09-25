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

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
};

 //funkcja pad) dodaje zero do liczb jednocyfrowych
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
