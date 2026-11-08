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
            this.scoreTable[category] = null;
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
        const counts = countFaces(diceValues);

        // Upper section
        if (UPPER_CATEGORIES.includes(category)) {
            const face = UPPER_FACE[category];
            return counts[face] * face;

        }
        switch (category) {
            case "onePair": {
                const face = highestFaceWithCount(counts, 2);
                return face * 2;
            }
            case "twoPairs": {
                const pairFaces = [];
                for (let face = 6; face >= 1; face--) {
                    if (counts[face] >= 2) pairFaces.push(face);
                }
                if (pairFaces.length < 2) return 0;
                return (pairFaces[0] + pairFaces[1]) * 2;

            }
            case "threeOfAkind": {
                const face = highestFaceWithCount(counts, 3);
                return face * 3;
            }

            case "fourOfAkind": {
                const face = highestFaceWithCount(counts, 4);
                return face * 4;
            }
            case "smallStraight": {
                const isStraight = [1, 2, 3, 4, 5].every((face) => counts[face] === 1);
                return isStraight ? 15 : 0;
            }
            case "largeStraight": {
                const isStraight = [2, 3, 4, 5, 6].every((face) => counts[face] === 1);
                return isStraight ? 20 : 0;
            }
            case "fullHouse": {
                const hasThree = counts.includes(3);
                const hasTwo = counts.includes(2);
                return hasThree && hasTwo ? sumDice(diceValues) : 0;
            }
            case "chance": 
                return sumDice(diceValues);
            
            case "yatzy": 
                return counts.includes(5) ? 50 : 0;
            
            default: 
                return 0;
        }
    }

    // Checks whether the player can score in this category with these dice.
    // Valid means: the category exists, it is still empty, and the dice
    // are a legal 5 dice roll (A 0 score is still allowed, since the rules
    // let the player enter a 0 in a category they can afford to lose.)
    isValidSelection(category, diceValues) {
        // TODO: check category exists, scoreTable[category] === null,
        // and diceValues has 5 values between 1 and 6 
        if (!(category in this.scoretable)) return false;
        if (this.scoretable[category] !== null) return false;
        if (!Array.isArray(diceValues) || diceValues.length !== 5) return false;
        return diceValues.every((v) => Number.isInteger(v) && v >= 1 && v <= 6);
    }

    // Locks a score into the score table for a category
    recordScore(category, diceValues) {
        // TODO: if isValidSelection(...), store calculateScore(...) in this.scoreTable
        if (this.isValidSelection(category, diceValues)) return null;
        const score = this.calculateScore(category, diceValues);
        this.scoreTable[category] = score;
        return score;
    }

    // Sum of the upper section scores (used for the bonus)
    getUpperTotal() {
        // TODO: add up the scored upper categories
        return sum(UPPER_CATEGORIES.map((c) => this.scoreTable[c] ?? 0))
    }

    // Returns 50 if the upper total is 63 or more, otherwise 0.
    getBonus() {
        // TODO: compare getUpperTotal() with BONUS_THRESHOLD
        return this.getUpperTotal() >= BONUS_THRESHOLD ? BONUS_POINTS : 0;
    }

    // Sum of the lower section scores
    getLowerTotal() {
        // TODO: add up the scored lower categories
        return sum(LOWER_CATEGORIES.map((c) => this.scoreTable[c] ?? 0));
    }

    // Upper total + bonus + lower total
    getTotalScore() {
        // TODO: combine the three values above
        return this.getUpperTotal() + this.getBonus() + this.getLowerTotal();
    }

    // True when all 15 categories have been scored
    isScorecardFull() {
        // TODO: check that no category is still null
        return Object.values(this.scoreTable).every((score) => score !== null);
        S
    }
}