/* eslint-disable prettier/prettier */
import {Component} from 'react'

import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'

import './App.css'

import Item from './components/Item'

import {
  Navbar,
  Container,
  Paragraph,
  Image,
  Button,
  Heading,
  Unordered,
} from './styledComponents'

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
  score: 0,
}

class App extends Component {
  state = initial

  select = obj => {
    const no = Math.floor(Math.random() * l)
    console.log(no)
    const {id} = obj
    const randomObj = choicesList[no]
    const randomId = randomObj.id
    let status
    console.log(id, randomId)
    switch (true) {
      case (id === 'PAPER' && randomId === 'SCISSORS') ||
        (id === 'SCISSORS' && randomId === 'ROCK') ||
        (id === 'ROCK' && randomId === 'PAPER'):
        status = 'lost'
        this.setState(prevState => ({score: prevState.score - 1}))
        break
      case (id === 'PAPER' && randomId === 'ROCK') ||
        (id === 'SCISSORS' && randomId === 'PAPER') ||
        (id === 'ROCK' && randomId === 'SCISSORS'):
        status = 'won'
        this.setState(prevState => ({score: prevState.score + 1}))
        break
      case id === randomId:
        status = 'draw'
        this.setState(prevState => ({score: prevState.score}))
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

  buttonClick = () =>
    this.setState({gameStatus: '',randomObj: {},
  activeObj: {},
  isGameOver: false,
})

  gameView = () => (
    <Unordered>
      {choicesList.map(each => (
        <Item key={each.id} select={this.select} details={each} />
      ))}
    </Unordered>
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
      case 'draw':
        text = 'IT IS DRAW'
        break
      default:
        text = ''
        break
    }
    return (
      <Container>
        <Paragraph>You</Paragraph>
        <Image src={url1} alt="your choice" />
        <Paragraph>Opponent</Paragraph>
        <Image src={url2} alt="opponent choice" />
        <Paragraph>{text}</Paragraph>
        <Button type="button" onClick={this.buttonClick}>
          Play Again
        </Button>
      </Container>
    )
  }

  render() {
    const {isGameOver, score} = this.state
    console.log(score)
    return (
      <>
        <Navbar className="head-cont">
          <Heading>ROCK PAPER SCISSORS</Heading>
          <Container>
            <Paragraph className="score">Score</Paragraph>
            <Paragraph className="score">{score}</Paragraph>
          </Container>
        </Navbar>

        {isGameOver ? this.resultView() : this.gameView()}
        <Container className="popup-container">
          <Popup
            modal
            trigger={
              <Button type="button" className="trigger-button">
                Rules
              </Button>
            }
          >
            {close => (
              <>
                <Container>
                  <Image
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </Container>
                <Button type="button" onClick={() => close()}>
                  <RiCloseLine />
                </Button>
              </>
            )}
          </Popup>
        </Container>
      </>
    )
  }
}

export default App
