import { Dice } from './dice.js';
import { YatzyEngine } from './yatzy_engine.js';

const TOTAL_ROUNDS = 15;
const MAX_ROLLS_PER_TURN = 3;

class YatzyGame {
    constructor() {
        this.dice = new Dice(5);
        this.engine = new YatzyEngine();

        // Properties for the Yatzy Game
        this.currentPlayer = 1;
        this.currentRound = 1;
        this.totalScore = 0;

        this.rollsUsed = 0;
        this.bestScore = 0;
    }

    // Initalizes a new game
    startNewGame() {
        // TODO: create a fresh YatzyEngine, reset dice, round to 1,
        // total score to 0, rollsUsed to 0, and currentPlayer to 1
        this.engine = new YatzyEngine();
        this.dice.reset();
        this.currentPlayer = 1;
        this.currentRound = 1;
        this.totalScore = 0;
        this.rollsUsed = 0;
        this.isGameOver = false;
    }

    // Rolls the dice that are not held (max 3 rolls per turn)
    rollDice() {
        // TODO: if rollsUsed < MAX_ROLLS_PER_TURN, call this.dice.rollAll() and increment rollsUsed
        if (this.isGameOver || this.rollsUsed >= MAX_ROLLS_PER_TURN) return null;
        this.dice.rollAll();
        this.rollsUsed+= 1;
        return this.dice.values;
    }

    // Scores the current dice in the chosen category, then ends the turn
    scoreCategory(category) {
        //TODO: check engine.isValidSelection(category, this.dice.values),
        // call engine.recordScore(...), update totalScore, then endTurn()
        if (this.isGameOver || this.rollsUsed === 0) return null;
        const score = this.engine.recordScore(category, this.dice.values);
        if (score === null) return null;
        this.totalScore = this.engine.getTotalScore();
        this.endTurn();
        return score;
    }

    // Ends the current player's turn and moves on
    // with one player, this just starts the next round
    endTurn() {
        // TODO: reset dice and rollsUsed, increase currentRound 
        // and call endGame() after round 15 is scored
        this.dice.reset();
        this.rollsUsed = 0;
        if (this.engine.isScorecardFull() || this.currentRound >= TOTAL_ROUNDS) {
           this.endGame();
           return; 
    }
        this.currentPlayer = (this.currentPlayer % this.numberofPlayers) + 1;
        if (this.currentPlayer === 1) {
            this.currentRound += 1;
        }
    }

    // Finalizes the game: shows the final score and updates the best score
    endGame() {
        // TODO: set bestScore if totalScore is higher and return the final result
        // (upper total, bonus, lower section, final score)
        this.isGameOver = true;
        this.totalScore = this.engine.getTotalScore();
        const isNewBest = this.totalScore > this.bestScore;
        if (isNewBest) this.bestScore = this.totalScore;
        return {
            upperTotal: this.engine.getUpperTotal(),
            bonus: this.engine.getBonus(),
            lowerTotal: this.engine.getLowerTotal(),
            finalScore: this.totalScore,
            bestScore: this.bestScore,
            isNewBest,
        };
    }
}