import { Dice } from './dice.js';

const MAX_ROLLS = 3;
const FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

const dice = new Dice(5);
let rollsLeft = MAX_ROLLS;

const diceContainer = document.getElementById('dice-container');
const rollBtn = document.getElementById('roll-btn');
const newTurnBtn = document.getElementById('new-turn-btn');
const rollsLeftEl = document.getElementById('rolls-left');
const messageEl = document.getElementById('message');

// Draws the five dice from the current state
function render() {
    diceContainer.innerHTML = '';

    dice.values.forEach((value, i) => {
        const die = document.createElement('button');
        die.className = 'die' + (dice.held[i] ? ' held' : '');
        die.textContent = value === 0 ? '?' : FACES[value];
        die.disabled = value === 0;
        die.setAttribute ('aria-label', `Die ${i + 1}: ${value === 0 ? 'not rolled' : value}`);
        
        die.addEventListener('click', () => {
            dice.toggleHold(i)
            render();
        });

        diceContainer.appendChild(die);
    });
    
    rollsLeftEl.textContent = rollsLeft;
    rollBtn.disabled = rollsLeft === 0;
}

// Roll: ask the server for values through the Dice class
rollBtn.addEventListener('click', async () => {
    rollBtn.disabled = true; // prevent double clicks while waiting
    messageEl.textContent = '';

    const result = await dice.rollAll();

    if(result === null) {
        messageEl.textContent = 'Could not roll the dice. Please try again';
        rollBtn.disabled = rollsLeft === 0;
        return; // don't use up a roll on a failure 
    }

    rollsLeft--;
    render()
});

// New turn: reset everything
newTurnBtn.addEventListener('click', () => {
    dice.reset();
    rollsLeft = MAX_ROLLS;
    messageEl.textContent = '';
    render()
});

render();