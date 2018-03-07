import React, { Component } from 'react';
import Cards from './components/cards';
import './App.css';

const axios = require('axios');

class App extends Component {

  state = {
    cards:[],
    score:0,
    count: 16,
    status: 'gameOn',
    resetButton: false,
  };

  componentWillMount() {
    console.log("Mounting.");
  };

  componentDidMount() {
    // todo replace http below with route to my db
    axios.get("https://user.me/api", {params:{results: this.state.count}})
    .then(
      // todo: look at the results varible and change it to what I used
      res => this.setState({cards:res.data.results})
    )
    .catch(err => console.log(err));   
    console.log("Mount complete");
  };

  componentDidUpdate() {
    console.log("Checking to see if player won")
    if (this.state.score === this.state.count && this.state.status === 'active') {
      alert("You have won the game");
      this.endGame();
    };
  };

  componentWillUpdate() {
    console.log("will update");
    if (this.state.status === 'begin') {         
      this.state.cards.forEach(element => {
        element.id = element.login.md5;
        element.status = 'active';
        element.font = '';
      });
      console.log(this.state.cards);      
      this.setState({status:'active'});
    }; 
  };
  // function to set the clicked card to 'clicked' and shuffle the array again
  disableShuffle = id => {
    // Set current array to varible cardArray, 
    const cardArray = this.state.cards;
    
    // find index of cards array, set friend to notClicked
    const notClickedIndex = cardArray.findIndex(x => x.id===id);
    console.log(x.id);
    cardArray[notClickedIndex].status = 'clicked';
    this.randomShuffle(cardArray);
  };

  randomShuffle = (cardArray) =>{
  // create a new random array of friends by randomly splicing the nonRandom array and pushing into new random array
    const randomCards = [];
    for (let i = this.state.count; i > 0; i-- ) {
      let index = Math.floor(Math.random()*i);
      randomCards.push(cardArray[index]);
      cardArray.splice(index, 1);;
    };

  // setstate of friends to new Random array
    this.setState({cards:randomCards});    
  };

    // function to end the game if status is set to gameOver and allows for reset
  endGame = () => {
    if (this.state.status === "gameOn"){
      this.setState({status:"gameOver"});
      this.setState({resetButton:true});
      // todo: change this alert to a dynamic displayed Game Over on the screen
      alert("Game Over");
    };
  };



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  };
};

export default App;
