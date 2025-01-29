const fs = require('fs');
const path = require('path');

function getRandomWords(wordList, numWords) {
    let words = [];
    let availableWords = [...wordList];

    while (words.length < numWords) {
        if (availableWords.length === 0) {
            availableWords = [...wordList];
        }

        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const word = availableWords.splice(randomIndex, 1);
        words.push(word);
    }

    return words;
}

function justifyLine(line, maxLength) {
    let words = line.split(' ');
    let spacesNeeded = maxLength - line.length;
    let gaps = words.length - 1;

    while (spacesNeeded > 0 && gaps > 0) {
        for (let i = 0; i < gaps && spacesNeeded > 0; i++) {
            words[i] += ' ';
            spacesNeeded--;
        }
    }

    return words.join(' ');
}

function generateParagraphs(wordList, numParagraphs) {
    const maxLength = 50;
    let paragraphs = [];

    for (let i = 0; i < numParagraphs; i++) {
        let paragraph = [];
        for (let j = 0; j < 5; j++) {
            let lineWords = getRandomWords(wordList, 10).join(' ');
            let justifiedLine = justifyLine(lineWords, maxLength);
            paragraph.push(justifiedLine);
        }
        paragraphs.push(paragraph.join('\n'));
    }

    return paragraphs.join('\n\n');
}

function generateLorem(numParagraphs, callback) {
    const wordListPath = path.join(__dirname, 'wordlist.txt');
    fs.readFile(wordListPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading word list:', err);
            callback(err, null);
            return;
        }

        const wordList = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        const paragraphs = generateParagraphs(wordList, numParagraphs);
        callback(null, paragraphs);
    });
}

module.exports = generateLorem;