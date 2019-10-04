class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        this.running = false;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.removeTime = this.removeTime.bind(this);
        this.saveTime = this.saveTime.bind(this);
    }

    reset() {
        this.setState ({
            times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
            }
        });
    }

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
    }

    calculate() {
        let {miliseconds, seconds, minutes} = this.state.times;
        //const times = this.state.times;
        miliseconds += 1;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState ({
            times: {
            minutes,
            seconds,
            miliseconds
            }
        });
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    saveTime() {
        let timeItem = document.querySelector(".stopwatch").innerHTML;
        const node = document.createElement('li');//
        let textnode = document.createTextNode(timeItem);
        node.appendChild(textnode);//
        document.querySelector('.results').appendChild(node);//
    }

    removeTime() {
        let times = document.querySelector('.results');
        times.removeChild(times.lastChild);
    }

    render() {
        return (
            <div>
                <nav className = "controls">
                    <a href="#" className = "button" onClick={this.start}>Start</a>
                    <a href="#" className = "button" onClick={this.stop}>Stop</a>
                    <a href="#" className = "button" onClick={this.reset}>Reset</a>
                    <a href="#" className = "button" onClick={this.saveTime}>Save</a>
                    <a href="#" className = "button" onClick={this.removeTime}>Remove</a>
                </nav>
                <div className = "stopwatch">
                    {this.format(this.state.times)}
                </div>
                <ul className = "results">Results:</ul>
            </div>
        )
    }
};

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
};

const app = document.getElementById('root')
ReactDOM.render(<Stopwatch/>, app);
