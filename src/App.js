import React, { Component } from 'react';
import './App.css';
import HistoryList from './components/historyList';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      number: undefined,
      history: [],
      message: '',
      isWon: false,
      isPreviousWon: false,
    }

    this.inputRef = React.createRef();
    this.btnRef = React.createRef();
  }


  handleClick = () => {
    const { number, history } = this.state;
    let value = this.inputRef.current.value;
    let message = '';
    this.setState({ history: history.concat(value) });
    if(+value === number){
      this.setState({ isWon: true, isPreviousWon: true });
      localStorage.setItem('history', history.concat(value));
      message = 'You won';
      this.numGenerator();
    }else if(value < number){
      message = 'Too Low';
      this.clearHistory(value)
    }else {
      message = 'Too High';
      this.clearHistory(value)
    }
    this.inputRef.current.value = '';
    this.setState({ message });
  }

  clearHistory = value => {
    const { isPreviousWon } = this.state;
    isPreviousWon &&
      this.setState({ history: [value], isWon: false, isPreviousWon: false })
  }

  numGenerator = () => {
    let number = Math.round(Math.random() * 100);
    console.log(number);
    this.setState({ number });
  }

  componentDidMount() {
    this.inputRef.current.focus();
    this.numGenerator();
  }

  render() {
    const { 
      message,
      history,
      isWon,
    } = this.state;
    return (
      <div className="App">
        <input
          ref={this.inputRef}
        />
        <input 
          type="submit"
          onClick={this.handleClick}
        />
        <p>
          {message}
        </p>
        {
          isWon && (
            <HistoryList 
              history={localStorage.getItem('history')} 
            />
          )
        }
      </div>
    );
  }
}

export default App;
