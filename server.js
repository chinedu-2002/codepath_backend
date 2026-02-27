const express = require('express');
const path = require('path');
const foods = require('./data');

const app = express();
const PORT = 3000;

// Tell Express to serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// HOME PAGE - shows all foods
app.get('/', (req, res) => {
    let foodCards = '';

    for (let i = 0; i < foods.length; i++) {
        foodCards += `
            <a href="/food/${foods[i].id}" class="food-card">
                <img src="${foods[i].image}" alt="${foods[i].name}">
                <div class="food-card-info">
                    <h3>${foods[i].name}</h3>
                    <p>${foods[i].country}</p>
                    <p>${foods[i].ingredients}</p>
                </div>
            </a>
        `;
    }

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>World Bites</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <header>
                <h1>World Bites</h1>
                <p>Explore famous foods from around the world</p>
            </header>
            <main>
                <div class="food-grid">
                    ${foodCards}
                </div>
            </main>
        </body>
        </html>
    `;

    res.send(html);
});

// DETAIL PAGE - shows one food's full details
app.get('/food/:foodId', (req, res) => {
    const foodId = req.params.foodId;
    const food = foods.find(f => f.id === foodId);

    if (!food) {
        res.status(404).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Not Found - World Bites</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <h1>404 - Food Not Found</h1>
                <p>Sorry, we couldn't find that dish!</p>
                <a href="/">Back to Home</a>
            </body>
            </html>
        `);
        return;
    }

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${food.name} - World Bites</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <a href="/">← Back to all foods</a>
            <h1>${food.name}</h1>
            <img src="${food.image}" alt="${food.name}" class="detail-image">
            <p><strong>Country:</strong> ${food.country}</p>
            <p><strong>Description:</strong> ${food.description}</p>
            <p><strong>Ingredients:</strong> ${food.ingredients}</p>
        </body>
        </html>
    `;

    res.send(html);
});

// 404 CATCH-ALL - handles any URL that doesn't match above
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - World Bites</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <a href="/">Back to Home</a>
        </body>
        </html>
    `);
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
