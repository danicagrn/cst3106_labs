// Handles the rules and score calculation 

// Upper section (6 categories) + bonus
const UPPER_CATEGORIES = ["ones", "twos", "threes", "fours", "fives", "sixes"];

// Lower section (9 categories)
const LOWER_CATEGORIES = [
    "onePair",
    "twoPairs",
    "threeOfAKind",
    "fourOfAKind",
    "smallStraight", // 1-2-3-4-5 = 15 points 
    "largeStraight", // 2-3-4-5-6 = 20 points
    "fullHouse",
    "chance",
    "yatzy",        // five of the same = 50 points
];

const BONUS_THRESHOLD = 63;
const BONUS_POINTS = 50;

class YatzyEngine {
    constructor() {
        // score table: one entry per category (15 total)
        // null = not scored yet, a number = the score locked in (0 is allowed)
        this.scoreTable = {};
        [...UPPER_CATEGORIES, ...LOWER_CATEGORIES].forEach((category) => {
            this.scoreTable[Category] = null;
        });
    }
    // Returns the score for the category based on dice values
    calculateScore(category, diceValues) {
        // TODO: switch on category and apply the rule for it
        // upper section: sun of all dice matching that number
        // onePair: sum of the two matching dice
        // twoPairs: sum of the four dice in two different pairs
        // threeOfAKind / fourOfAKind: sum of the matching dice
        // smallStraight: 15, largeStraight: 20, yatzy: 50 (0 if not matched)
        // fullHouse / chance: sum of all five dice
        return 0;
    }

    // Checks whether the player can score in this category with these dice.
    // Valid means: the category exists, it is still empty, and the dice
    // are a legal 5 dice roll (A 0 score is still allowed, since the rules
    // let the player enter a 0 in a category they can afford to lose.)
    isValidSelection(category, diceValues) {
        // TODO: check category exists, scoreTable[category] === null,
        // and diceValues has 5 values between 1 and 6 
        return false;
    }

    // Locks a score into the score table for a category
    recordScore(category, diceValues) {
        // TODO: if isValidSelection(...), store calculateScore(...) in this.scoreTable
    }

    // Sum of the upper section scores (used for the bonus)
    getUpperTotal() {
        // TODO: add up the scored upper categories
        return 0;
    }

    // Returns 50 if the upper total is 63 or more, otherwise 0.
    getBonus() {
        // TODO: compare getUpperTotal() with BONUS_THRESHOLD
        return 0;
    }

    // Sum of the lower section scores
    getLowerTotal() {
        // TODO: add up the scored lower categories
        return 0;
    }

    // Upper total + bonus + lower total
    getTotalScore() {
        // TODO: combine the three values above
        return 0;
    }

    // True when all 15 categories have been scored
    isScorecardFull() {
        // TODO: check that no category is still null
        return false;
    }
}