# Yatzy Game

This is a implementation of the dice game **Yatzy** (also known as Yahtzee) in a browser-based environment. Players roll five dice up to three times per turn and decide which to keep and fill a scoreboard with the best combinations they can

# Rules
1. Roll all five dice 
2. Hold the dice you want to keep and held dice stay put 
3. Reroll the rest. You can reroll up to two more times
4. Score the dice in one empty category. You have to pick one every turn. If nothing fits enter a 0 in the category you can afford to lose
5. The next round starts. When all 15 categories are filled, the game ends and the total is shown

The goal is the player with the highest total wins. However, in this single player version you play against your own best score

# Scoring 
the scorecard has two sections. Each category can be scored once per game 

**Upper section**:
- **Ones**: Sum of all dice showing 1
- **Twos**: Sum of all dice showing 2
- **Threes**: Sum of all dice showing 3
- **Fours**: Sum of all dice showing 4
- **Fives**: Sum of all dice showing 5
- **Sixes**: Sum of all dice showing 6
**Bonus**: if your score is 63 or more in the upper section you get 50 bonus points 

**Lower section**:
- **One pair**: you need two dice with the same number and the score is the sum of those 2 dice
- **Two pairs**: you need two different pairs and the score is the sum of the four dice in the pairs
- **Three of a kind**: you need three dice with the same number and the score is the sum of those three dice 
- **Four of a kind**: you need four dice with the same number and the score is the sum of those four dice 
- **Small Straight**: you need 1-2-3-4-5 and the score is 15 points  
- **Large Straight**: you need 2-3-4-5-6 and the score is 20 points 
- **Full House**: you need three of one number plus a pair of another and the score is the sum of all five dice 
- **Chance**: you need anything and the score is the sum of all five dice 
- **Yatzy**: you need all five dice to be the same and the score is 50 points 

# End of the game
- the game ends after the 15th category is scored 
- the end screen shows the upper total, bonus, lower section and final score

# languages used
- HTML
- CSS
- JavaScript (used for actual implementation)