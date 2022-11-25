import {Component} from 'react'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import './App.css'

import Item from './components/Item'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]
const l = choicesList.length

const initial = {
  gameStatus: '',
  randomObj: {},
  activeObj: {},
  isGameOver: false,
}

class App extends Component {
  state = initial

  select = obj => {
    const no = Math.floor(Math.random() * (l - 1))
    const {id} = obj

    const randomObj = choicesList[no]
    const randomId = randomObj.id
    let status
    switch (true) {
      case (id === 'PAPER' && randomId === 'SCISSORS') ||
        (id === 'SCISSORS' && randomId === 'ROCK') ||
        (id === 'ROCK' && randomId === 'PAPER'):
        status = 'lost'
        break
      case (id === 'PAPER' && randomId === 'ROCK') ||
        (id === 'SCISSORS' && randomId === 'PAPER') ||
        (id === 'ROCK' && randomId === 'SCISSORS'):
        status = 'won'
        break
      case id === randomId:
        status = 'draw'
        break
      default:
        status = 'nothing'
        break
    }

    this.setState({
      randomObj,
      gameStatus: status,
      activeObj: obj,
      isGameOver: true,
    })
  }

  buttonClick = () => {
    this.setState(initial)
  }

  gameView = () => (
    <ul>
      {choicesList.map(each => (
        <Item key={each.id} select={this.select} details={each} />
      ))}
    </ul>
  )

  resultView = () => {
    const {activeObj, randomObj, gameStatus} = this.state
    const url1 = activeObj.imageUrl
    const url2 = randomObj.imageUrl
    let text
    switch (gameStatus) {
      case 'won':
        text = 'YOU WON'
        break
      case 'lost':
        text = 'YOU LOSE'
        break
      default:
        text = 'IT IS DRAW'
        break
    }
    return (
      <div>
        <h1>Rock Paper Scissors</h1>
        <p>You</p>
        <img src={url1} alt="your choice" />
        <p>Opponent</p>
        <img src={url2} alt="opponent choice" />
        <p>{text}</p>
        <button type="button" onClick={this.buttonClick}>
          Play Again
        </button>
      </div>
    )
  }

  render() {
    const {isGameOver, gameStatus} = this.state
    let score
    switch (gameStatus) {
      case 'won':
        score = 1
        break
      case 'lost':
        score = -1
        break
      case 'draw':
        score = 0
        break
      default:
        score = 0
        break
    }
    return (
      <>
        <div className="head-cont">
          <h1>Rock Paper Scissors</h1>
          <div>
            <h1>ROCK</h1>
            <h1>PAPER</h1>
            <h1>SCISSORS</h1>
          </div>
          <div>
            <p>Score</p>
            <p>{score}</p>
          </div>
        </div>

        {isGameOver ? this.resultView() : this.gameView()}
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                Rules
              </button>
            }
          >
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
            </div>
          </Popup>
        </div>
      </>
    )
  }
}

export default App
