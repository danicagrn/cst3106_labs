// Dice module: has the logic for rolling dice

class Dice {
    constructor(numberOfDice = 5) {
        // number of dice + their current values
        this.numberOfDice = numberOfDice;
        // 0 means "not rolled yet"
        this.values = new Array(numberOfDice).fill(0);
        // which dice are held (kept) between rlls
        this.held = new Array(numberOfDice).fill(false);
    }

    // Returns a random whole number from 1 to 6 for a single die
    roll() {
        return Math.floor(Math.random() * 6) + 1
    }

    // Rolls every die that is not held and updates this.values
    rollAll() {
         // TODO: loop over the dice, skip held ones, call this.roll() for the rest 
        for (let i = 0; i < this.numberOfDice; i++) {
            if (!this.held[i]) {
                this.values[i] = this.roll();
            }
        }
        return this.values
    }  

    // Toggles whether the die at the given index (0-4) is held
    toggleHold(index) {
        // TODO: flip this.held[index]
        if (index < 0 || index >= this.numberOfDice) return;
        if (this.values[index] === 0) return;
        this.held[index] = !this.held[index];
    }

    // clears values and holds at the start of a new turn
    reset() {
        // TODO: set values back to 0 and held back to false 
        this.values = new Array(this.numberofDice).fill(0);
        this.held = new Array(this.numberOfDice).fill(false);
        
    }
 }