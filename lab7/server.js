import express from 'express';

const app = express();
const PORT = 3000;

// Serve index.html, css, and client JS from /public
app.use(express.static('public'));

// Dice rolling logic now lives here
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

app.get('/roll-dices', (req, res) => {
    const values = Array.from({ length: 5}, rollDie);
    res.json(values); // e.g. [3, 6, 1, 4, 2]
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});