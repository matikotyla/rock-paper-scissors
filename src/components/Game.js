import React, { Component } from 'react'

import paper from '../assets/paper.png';
import rock from '../assets/rock.png';
import scissors from '../assets/scissors.png';

import './Game.css';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: 0,
            computer: 0,
            fadeMatch: 'fadeOut',
            fadeIntro: 'fadeIn',
            winner: 'Wybierz opcję',
            playerHand: rock,
            computerHand: rock,
            playerHandStyle: {},
            computerHandStyle: {}
        }

        this.computerOptions = ['rock', 'paper', 'scissors'];
    }

    introButtonOnClick = (e) => {
        this.setState({
            fadeMatch: 'fadeIn',
            fadeIntro: 'fadeOut',
        })
    }

    optionsButtonOnClick = (e) => {
        const playerChoice = e.target.className;
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = this.computerOptions[computerNumber];

        this.setState({
            winner: 'Gra się rozpoczęła',
            playerHand: rock,
            computerHand: rock
        });

        setTimeout(() => {
            console.log(playerChoice);
            console.log(computerChoice);

            // Compare hands
            this.compareHands(playerChoice, computerChoice);

            // Update image for player
            this.updatePlayerImage(playerChoice);

            // Update image for computer
            this.updateComputerImage(computerChoice);
        }, 2000);

        // Update the animations
        this.setState({
            playerHandStyle: {
                animation: "shakePlayer 2s ease"
            },
            computerHandStyle: {
                animation: "shakeComputer 2s ease"
            }
        })
    }

    imageAnimationEnd = (e) => {
        const className = e.target.className;
        if(className === 'player-hand') {
            this.setState({
                playerHandStyle: {
                    animation: ''
                }
            })
        } else if(className === 'computer-hand') {
            this.setState({
                computerHandStyle: {
                    animation: ''
                }
            })
        }
    }

    updatePlayerImage = (playerChoice) => {
        if(playerChoice === 'rock') {
            this.setState({
                playerHand: rock
            })
        } else if(playerChoice === 'paper') {
            this.setState({
                playerHand: paper
            })
        } else if(playerChoice === 'scissors') {
            this.setState({
                playerHand: scissors
            })
        }
    }

    updateComputerImage = (computerChoice) => {
        if(computerChoice === 'rock') {
            this.setState({
                computerHand: rock
            })
        } else if(computerChoice === 'paper') {
            this.setState({
                computerHand: paper
            })
        } else if(computerChoice === 'scissors') {
            this.setState({
                computerHand: scissors
            })
        }
    }

    compareHands = (playerChoice, computerChoice) => {
        // Check for a tie
        if(playerChoice === computerChoice) {
            this.setState({
                winner: 'Jest Remis'
            })
            return;
        }

        // Check for a rock
        if(playerChoice === 'rock') {
            if(computerChoice === 'scissors') {
                this.setState({
                    winner: 'Gracz Wygrywa',
                    player: this.state.player + 1
                })
            } else {
                this.setState({
                    winner: 'Komputer Wygrywa',
                    computer: this.state.computer + 1
                })
            }
            return;
        }

        // Check for a paper
        if(playerChoice === 'paper') {
            if(computerChoice === 'scissors') {
                this.setState({
                    winner: 'Komputer Wygrywa',
                    computer: this.state.computer + 1
                })
            } else {
                this.setState({
                    winner: 'Gracz Wygrywa',
                    player: this.state.player + 1
                })
            }
            return;
        }

        // Check for a scissors
        if(playerChoice === 'scissors') {
            if(computerChoice === 'rock') {
                this.setState({
                    winner: 'Komputer Wygrywa',
                    computer: this.state.computer + 1
                })
            } else {
                this.setState({
                    winner: 'Gracz Wygrywa',
                    player: this.state.player + 1
                })
            }
            return;
        }
    }

    render() {
        return (
            <section className="game">
                <div className="score">
                    <div className="player-score">
                        <h2>Gracz</h2>
                        <p>{this.state.player}</p>
                    </div>
                    <div className="computer-score">
                        <h2>Komputer</h2>
                        <p>{this.state.computer}</p>
                    </div>
                </div>

                <div className={"intro " + this.state.fadeIntro}>
                    <h1>Kamień Papier Nożyce</h1>
                    <button onClick={this.introButtonOnClick}>Zagraj</button>
                </div>

                <div className={"match " + this.state.fadeMatch}>
                    <h2 className="winner">{this.state.winner}</h2>
                    <div className="hands">
                        <img onAnimationEnd={this.imageAnimationEnd} style={this.state.playerHandStyle} className="player-hand" src={this.state.playerHand} alt="" />
                        <img onAnimationEnd={this.imageAnimationEnd} style={this.state.computerHandStyle} className="computer-hand" src={this.state.computerHand} alt="" />
                    </div>
                    <div className="options">
                        <button className="rock" onClick={this.optionsButtonOnClick} >kamień</button>
                        <button className="paper" onClick={this.optionsButtonOnClick} >papier</button>
                        <button className="scissors" onClick={this.optionsButtonOnClick} >nożyce</button>
                    </div>
                </div>
            </section>
        )
    }
}
