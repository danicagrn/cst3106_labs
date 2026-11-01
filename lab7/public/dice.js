// Dice module: has the logic for rolling dice

export class Dice {
    constructor(numberOfDice = 5) {
        // number of dice + their current values
        this.numberOfDice = numberOfDice;
        // 0 means "not rolled yet"
        this.values = new Array(numberOfDice).fill(0);
        // which dice are held (kept) between rlls
        this.held = new Array(numberOfDice).fill(false);
    }

    // Asks the server for new values; only updates dice that are not held
    // Returns the values, or null if something when wrong
    async rollAll() {
        try {
            const response = await fetch('/roll-dices');
            if (!response.ok) {
                throw new Error (`Server responded with ${response.status}`);
            }

            const serverValues = await response.json();

            if (!Array.isArray(serverValues) || serverValues.length !== this.numberOfDice) {
                throw new Error(`Unxpected data from server`);
            }

            for (let i = 0; i < this.numberOfDice; i++) {
                if (!this.held[i]) {
                    this.values[i] = serverValues[i];
                }
            }
            return this.values;
        } catch (error) {
            console.error('Could not roll dice:', error);
            return null // lets the UI show an error message  
        }
    }


    // Toggles whether the die at the given index (0-4) is held
    toggleHold(index) {
        if (index < 0 || index >= this.numberOfDice) return;
        if (this.values[index] === 0) return;
        this.held[index] = !this.held[index];
    }

    // clears values and holds at the start of a new turn
    reset() { 
        this.values = new Array(this.numberOfDice).fill(0);
        this.held = new Array(this.numberOfDice).fill(false);
        
    }
 }