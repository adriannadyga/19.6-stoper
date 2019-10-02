'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//szablon klasy z jednym konstruktorem
var Stopwatch = function () {
    function Stopwatch(display) {
        _classCallCheck(this, Stopwatch);

        //parametr konstruktora - pole w którym ma być timer
        this.running = false; //wartość początkowa - czy stoper pracuje
        this.display = display; //element DOM pod którym znajduje się stoper
        this.reset(); //metoda resetująca stoper
        this.print(this.times); //metoda drukująca wynik
    }

    //metody wykonujące się od razu po stworzeniu nowej instancji Stopwatch


    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            //obiekt
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }

        //ustawia tekst elementu DOM, który jest pod atrybutem display

    }, {
        key: 'print',
        value: function print() {
            this.display.innerText = this.format(this.times); //metoda format przygotowuje tekst do wyświetlenia
            this.save = {
                time: this.display.innerText
            };
        }
        /*metoda zwraca szablon wykorzystujący obiekt (times) podany do metody; 
        konstrukcja ${nazwa_zamiennej} umożliwia przekazanie wyniku kolejnej funkcji (pad0) jako jeden z elementów szablonu
        */

    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            if (!this.running) {
                this.running = true;
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
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

    }, {
        key: 'calculate',
        value: function calculate() {
            var _times = this.times,
                miliseconds = _times.miliseconds,
                seconds = _times.seconds,
                minutes = _times.minutes;

            miliseconds += 1;
            if (miliseconds >= 100) {
                seconds += 1;
                miliseconds = 0;
            }
            if (seconds >= 60) {
                minutes += 1;
                seconds = 0;
            }
            this.times = {
                miliseconds: miliseconds,
                seconds: seconds,
                minutes: minutes
                //console.log(this.times);
            };
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: 'resetWatch',
        value: function resetWatch() {
            this.running = false;
            this.reset();
            this.print();
        }
    }, {
        key: 'saveTime',
        value: function saveTime() {
            var timeItem = this.save.time;
            var node = document.createElement('li');
            var textnode = document.createTextNode(timeItem);
            node.appendChild(textnode);
            document.querySelector('.results').appendChild(node);
        }
    }, {
        key: 'removeTime',
        value: function removeTime() {
            var times = document.querySelector('.results');
            times.removeChild(times.lastChild);
        }
    }]);

    return Stopwatch;
}();

;

//funkcja pad0 dodaje zero do liczb jednocyfrowych
function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
};

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

//metody wykonywane po kliknięciu w przyciski
var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
    return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
    return stopwatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    return stopwatch.resetWatch();
});

var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function () {
    return stopwatch.saveTime();
});

var removeButton = document.getElementById('delete');
removeButton.addEventListener('click', function () {
    return stopwatch.removeTime();
});
