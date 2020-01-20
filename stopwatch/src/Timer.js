import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timeElapsed: 0,
      timeElapsedArray: [],
      mainTimeElapsed: 0,
      splitTimePostArray: [],
      mainTimeHours: '00',
      mainTimeMinutes:  '00',
      mainTimeSeconds:  '00',
      mainTimeDeciseconds: '0',
      mainTimeMilliseconds: '00',
      mainTimeRunningDisplay: "none",
      splitTimeRunningDisplay: "none",
      pauseButtonDisplay: "none",
      splitButtonDisplay: "none",
      continueButtonDisplay: "none",
      resetButtonDisplay: "none",
    };
    this.timeCalculations = this.timeCalculations.bind(this);
    this.startMode = this.startMode.bind(this);
    this.splitMode = this.splitMode.bind(this);
    this.pauseMode = this.pauseMode.bind(this);
    this.continueMode = this.continueMode.bind(this);
    this.resetMode = this.resetMode.bind(this);
  }
  
  startTime() {
    this.setState({ startTimeValue: Date.now() });
  }

  timeCalculations() {
    this.setState({ timeElapsed: (Date.now() - this.state.startTimeValue) });
    var x = 0;
    for (let i = 0; i < this.state.timeElapsedArray.length; i++) {
      x += this.state.timeElapsedArray[i];
    }
    this.setState({ 
      mainTimeElapsed: (this.state.timeElapsed + x),
      mainTimeHours: ('0' + Math.floor((((this.state.mainTimeElapsed / 1000) / 60) / 60))).slice(-2),
      mainTimeMinutes: ('0' + Math.floor(((this.state.mainTimeElapsed / 1000) / 60) % 60)).slice(-2),
      mainTimeSeconds: ('0' + Math.floor(this.state.mainTimeElapsed / 1000) % 60).slice(-2),
      mainTimeDeciseconds: (((this.state.mainTimeElapsed / 1000).toFixed(3)).slice(-3)).slice(0, 1),
      mainTimeMilliseconds: ((this.state.mainTimeElapsed / 1000).toFixed(3).slice(-3)).slice(1, 3),
      splitTimeHours: ('0' + Math.floor((((this.state.timeElapsed / 1000) / 60) / 60))).slice(-2),
      splitTimeMinutes: ('0' + Math.floor(((this.state.timeElapsed / 1000) / 60) % 60)).slice(-2),
      splitTimeSeconds: ('0' + Math.floor(this.state.timeElapsed / 1000) % 60).slice(-2),
      splitTimeMilliseconds: ((this.state.timeElapsed / 1000).toFixed(3)).slice(-3)
    })
  }

  runInterval() {
    this.intervalTimeCalculations = setInterval(this.timeCalculations, 0);
  }

  clearInterval() {
    clearInterval(this.intervalTimeCalculations);
  }

  startMode() {
    this.setState({
      splitTimeRunningDisplay: "",
      splitTimeResetDisplay: "none",
      startButtonDisplay: "none",
      pauseButtonDisplay: "",
      splitButtonDisplay: "",
      continueButtonDisplay: "none",
      resetButtonDisplay: "none",
    });
    this.startTime();
    this.runInterval();
  }

  splitMode() {
    this.clearInterval();
    this.state.timeElapsedArray.push(this.state.timeElapsed);
    const split = { "value": this.state.timeElapsed, "source": 'Split' };
    this.state.splitTimePostArray.push(split);
    this.startTime();
    this.runInterval();
  }

  pauseMode() {
    this.clearInterval();
    this.state.timeElapsedArray.push(this.state.timeElapsed);
    const split = { "value": this.state.timeElapsed, "source": 'Pause' };
    this.state.splitTimePostArray.push(split);
    this.setState({
      startButtonDisplay: "none",
      pauseButtonDisplay: "none",
      splitButtonDisplay: "none",
      continueButtonDisplay: "",
      resetButtonDisplay: "",
    });
  }

  continueMode() {
    this.setState({
      startButtonDisplay: "none",
      pauseButtonDisplay: "",
      splitButtonDisplay: "",
      continueButtonDisplay: "none",
      resetButtonDisplay: "none",
    });
    this.startTime();
    this.runInterval();
  }

  resetMode() {
    this.clearInterval();
    this.setState({
      timeElapsed: 0,
      timeElapsedArray: [],
      mainTimeElapsed: 0,
      splitTimePostArray: [],
      mainTimeHours: '00',
      mainTimeMinutes:  '00',
      mainTimeSeconds:  '00',
      mainTimeDeciseconds: '0',
      mainTimeMilliseconds: '00',
      splitTimeResetDisplay: "",
      splitTimeRunningDisplay: "none",
      startButtonDisplay: "",
      pauseButtonDisplay: "none",
      splitButtonDisplay: "none",
      continueButtonDisplay: "none",
      resetButtonDisplay: "none",
    });
  }

  render() {
    return (
      <div>
        <div id="main-time">
          {this.state.mainTimeHours}:{this.state.mainTimeMinutes}:{this.state.mainTimeSeconds}.{this.state.mainTimeDeciseconds}
          <span id="milliseconds">{this.state.mainTimeMilliseconds}</span>
        </div>
        <div id="split-time">
          <span style={{ display: this.state.splitTimeResetDisplay }}>
            SPLIT TIME
          </span>
          <span style={{ display: this.state.splitTimeRunningDisplay }}>
            {this.state.splitTimeHours}:{this.state.splitTimeMinutes}:{this.state.splitTimeSeconds}.{this.state.splitTimeMilliseconds}
          </span>
        </div>
        <div id="buttons">
          <button onClick={this.startMode} style={{ display: this.state.startButtonDisplay }}>Start</button>
          <button onClick={this.splitMode} style={{ display: this.state.splitButtonDisplay }}>Split</button>
          <button onClick={this.pauseMode} style={{ display: this.state.pauseButtonDisplay }}>Pause</button>
          <button onClick={this.continueMode} style={{ display: this.state.continueButtonDisplay }}>Continue</button>
          <button onClick={this.resetMode} style={{ display: this.state.resetButtonDisplay }}>Reset</button>
        </div>
        <div id="div1">
          <div id="div2">
            <div id="output-area">
              {this.state.splitTimePostArray.map((output, i) => <p id="output"
                key={i}><span>{('0' + Math.floor((((output.value / 1000) / 60) / 60))).slice(-2)}:
                {('0' + Math.floor(((output.value / 1000) / 60) % 60)).slice(-2)}:
                {('0' + Math.floor(output.value / 1000) % 60).slice(-2)}.
                {(output.value / 1000).toFixed(3).slice(-3)}</span>
                <span id="source">{output.source}</span>
              </p>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;