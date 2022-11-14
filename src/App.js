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
    console.log(no)
    const {id} = obj
    const randomId = choicesList[no].id
    const randomObj = choicesList[no]
    let status
    switch (true) {
      case (id === 'PAPER' && randomId === 'SCISSOR') ||
        (id === 'SCISSOR' && randomId === 'ROCK') ||
        (id === 'ROCK' && randomId === 'PAPER'):
        status = 'lost'
        break
      case (id === 'PAPER' && randomId === 'ROCK') ||
        (id === 'SCISSOR' && randomId === 'PAPER') ||
        (id === 'ROCK' && randomId === 'SCISSOR'):
        status = 'won'
        break
      default:
        status = 'draw'
    }

    this.setState({
      gameStatus: status,
      randomObj,
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
        text = 'ITS A DRAW'
    }
    return (
      <div>
        <p>You</p>
        <img src={url1} alt="me" />
        <p>Opponent</p>
        <img src={url2} alt="oppo" />
        <h1>{text}</h1>
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
    }
    return (
      <>
        <div className="head-cont">
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
