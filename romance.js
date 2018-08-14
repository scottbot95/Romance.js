function randomInt(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  return min + Math.floor(Math.random()*(max-min));
}

function parseText(str) {
  let words = str.split(' ');
  for (let i = words.length-1; i >= 0; i--) {
    words[i] = words[i].toLowerCase().replace(/[^a-z]/, '');
  }
  return words;
}

function generateWordPairs(text) {
  let words = parseText(text);
  let corpus = {};
  words.forEach((word, i) => {
    if (i === words.length-1)
      return;
    if (!(word in corpus)) {
      corpus[word] = [];
    }
    corpus[word].push(words[i+1])
  });

  return corpus;
}

function wordPicker(corpus, lastWord) {
  let words;
  if (lastWord && lastWord in corpus) {
    words = corpus[lastWord];
  } else {
    words = Object.keys(corpus);
  }

  let randInt = randomInt(words.length-1);
  return words[randInt];
}

function writeLine(corpus, numWords) {
  let poetry = '';
  let lastWord = undefined;
  for (let i = 0; i < numWords; i++) {
    lastWord = wordPicker(corpus, lastWord);
    poetry += lastWord + ' ';
  }
  return poetry.trim();
}

function generatePoem(corpus, numLines, minWordsPerLine=4, maxWordsPerLine=6) {
  let poem = '';
  for (let i = 0; i < numLines; i++) {
    let numWords = randomInt(minWordsPerLine, maxWordsPerLine);
    poem += writeLine(corpus, numWords) + '\n';
  }

  return poem.trim();
}