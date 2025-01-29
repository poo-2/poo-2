const express = require('express');
const generateLorem = require('./lorem');
const path = require('path');

const app = express();

// Middleware to parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/generate', (req, res) => {
    const numParagraphs = parseInt(req.body.numParagraphs);
    generateLorem(numParagraphs, (err, paragraphs) => {
        if (err) {
            res.status(500).send('Error generating lorem ipsum, no cap');
            return;
        }
        // Split paragraphs by double newline and wrap each in a <p> tag
        const paragraphHtml = paragraphs.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');

        res.send(`
            <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/styles.css">
            </head>
            <body>
                <div class="generated-text">${paragraphHtml}</div>
                <p>That's some word drip fr fr.</p>
                <a href="/" class="button-link">Run it back...</a>
            
            </body>
            </html>
        `);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
