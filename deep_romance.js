// ********* HELPER FUNCTIONS *********
function randomInt(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  return min + Math.floor(Math.random()*(max-min));
}

function stripNonLetters(str) {
  return str.replace(/[^a-z ]/, '');
}

function addToCorpus(corpus, key, nextWord) {
  if (!(key in corpus)) {
    corpus[key] = [];
  }
  corpus[key].push(nextWord);
}

function wordPicker(corpus, line) {
  let words;
  if (line) { 
    let cpy = line.slice();
    while (cpy) {
      if (cpy in corpus) {
        words = corpus[cpy];
        break;
      }
      cpy = cpy.slice(1);
    }
  }
  if (!words) {
    words = Object.keys(corpus);
  }
  
  let wordChoice;
  let maxTries = 5;
  let tries = 0;
  do {
    let randInt = randomInt(words.length-1);
    if (typeof words[randInt] === 'string')
      wordChoice = words[randInt];
    
    tries++;
  } while (!wordChoice && tries < maxTries);
  return wordChoice;
}

function splitByWhitespace(str) {
  return str.split(/[ \n\r]+/);
}

// ********* END HELPER FUNCTIONS *********

function parseText(str, alphabeticOnly=true) {
  if (typeof str !== 'string')
    return;
  let words = splitByWhitespace(str);
  for (let i = words.length-1; i >= 0; i--) {
    let filtered = words[i].toLowerCase();
    if (alphabeticOnly)
      filtered = stripNonLetters(filtered);

    words[i] = filtered;
  }
  return words;
}

function ingest(other) {
  let keys = Object.keys(other);
  keys.forEach(key => {
    let toAdd = other[key];
    if (this.hasOwnProperty(key) && Array.isArray(this[key])) {
      toAdd = this[key].concat(other[key]);
    }
    this[key] = toAdd;
  });
}

function generateWordPairs(text, depth=1, alphabeticOnly=false) {
  depth = Number(depth);
  alphabeticOnly = !!alphabeticOnly;
  if (depth === NaN)
    return;
  let words = parseText(text, alphabeticOnly);
  let corpus = { ingest };
  words.forEach((word, i) => {
    if (i === words.length-1)
      return;
    let str = word;
    let maxJ = Math.min(depth+i, words.length-1);
    for (let j = i; j < maxJ ; j++) {
      let nextWord = words[j+1];
      addToCorpus(corpus, str, nextWord);
      // we have other junk so lets add the 
      // stripped version in there too
      if (!alphabeticOnly) { 
        let strippedStr = stripNonLetters(str);
        if (strippedStr !== str) {
          let strippedNextWord = stripNonLetters(nextWord);
          addToCorpus(corpus, strippedStr, strippedNextWord);
          addToCorpus(corpus, strippedStr, nextWord);
          addToCorpus(corpus, str, strippedNextWord);
        }

      }

      str += ' ' + nextWord;
    }
  });

  return corpus;
}

function writeLine(corpus, numWords, lastLine) {
  let poetry = wordPicker(corpus, lastLine) + ' ';
  poetry = poetry.charAt(0).toUpperCase() + poetry.slice(1);
  for (let i = 1; i < numWords; i++) {
    let nextWord = wordPicker(corpus, poetry.trim());
    poetry += nextWord + ' ';
  }
  return poetry.trim();
}

function generatePoem(corpus, numLines, minWordsPerLine=4, maxWordsPerLine=6) {
  let poem = '';
  let lastLine;
  for (let i = 0; i < numLines; i++) {
    let numWords = randomInt(minWordsPerLine, maxWordsPerLine);
    lastLine = writeLine(corpus, numWords, lastLine);
    poem += lastLine + '\n';
  }

  return poem.trim();
}