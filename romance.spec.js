describe('parseText', () => {
  it('is a function', () => {
    expect(typeof parseText).toEqual('function');
  });

  it('returns an array', () => {
    let returnedVal = parseText('');
    expect(Array.isArray(returnedVal)).toEqual(true);
  });

  it('splits a string into an array of words', () => {
    let text = "Ever since I left the city, you, you, you You and me we just don't get along";
    let words = [ 'ever', 'since', 'i', 'left', 'the', 'city', 'you', 'you', 'you', 'you', 'and', 'me', 'we', 'just', 'dont', 'get', 'along' ];
    let returnedVal = parseText(text);
    expect(returnedVal).toEqual(words);
  })
});

describe('generateWordPairs', () => {
  it('is a function', () => {
    expect(typeof generateWordPairs).toEqual('function');
  });

  it('returns an object', () => {
    let returnedVal = generateWordPairs(['a', 'b', 'c']);
    expect(typeof returnedVal).toEqual('object');
  });

  it('returns an object with keys corresponding to all word chains', () => {
    let words = [ 'ever', 'since', 'i', 'left', 'the', 'city', 'you', 'you', 'you', 'you', 'and', 'me', 'we', 'just', 'dont', 'get', 'along' ];
    let uniqueWords = [ 'ever', 'since', 'i', 'left', 'the', 'city', 'you', 'and', 'me', 'we', 'just', 'dont', 'get' ];
    let returnedVal = generateWordPairs(words);
    let keys = Object.keys(returnedVal);
    keys.sort();
    uniqueWords.sort();

    expect(keys).toEqual(uniqueWords);
  });

  it('returns a Markov Chain of word choices', () => {
    let words = [ 'ever', 'since', 'i', 'left', 'the', 'city', 'you', 'you', 'you', 'you', 'and', 'me', 'we', 'just', 'dont', 'get', 'along' ];
    let wordPairs = { 
      ever: [ 'since' ],
      since: [ 'i' ],
      i: [ 'left' ],
      left: [ 'the' ],
      the: [ 'city' ],
      city: [ 'you' ],
      you: [ 'you', 'you', 'you', 'and' ],
      and: [ 'me' ],
      me: [ 'we' ],
      we: [ 'just' ],
      just: [ 'dont' ],
      dont: [ 'get' ],
      get: [ 'along' ] 
    };
    let returnedVal = generateWordPairs(words);
    expect(returnedVal).toEqual(wordPairs);
  });
});

describe('writeLine', () => {
  it('is a function', () => {
    expect(typeof writeLine).toEqual('function');
  });

  it('returns a string', () => {
    let returnedVal = writeLine({}, 0);
    expect(typeof returnedVal).toEqual('string');
  });

  it('returns a string with correct word count', () => {
    let wordCount = 5;
    let corpus =  { 
      ever: [ 'since' ],
      since: [ 'i' ],
      i: [ 'left' ],
      left: [ 'the' ],
      the: [ 'city' ],
      city: [ 'you' ],
      you: [ 'you', 'you', 'you', 'and' ],
      and: [ 'me' ],
      me: [ 'we' ],
      we: [ 'just' ],
      just: [ 'dont' ],
      dont: [ 'get' ],
      get: [ 'along' ] 
    };

    let returnedVal = writeLine(corpus, wordCount);
    let words = returnedVal.split(' ');
    expect(words.length).toEqual(wordCount);
  });
  it('does not end with a space', () => {
    let corpus =  { 
      ever: [ 'since' ],
      since: [ 'i' ],
      i: [ 'left' ],
      left: [ 'the' ],
      the: [ 'city' ],
      city: [ 'you' ],
      you: [ 'you', 'you', 'you', 'and' ],
      and: [ 'me' ],
      me: [ 'we' ],
      we: [ 'just' ],
      just: [ 'dont' ],
      dont: [ 'get' ],
      get: [ 'along' ] 
    };

    let returnedVal = writeLine(corpus, 6);
    expect(returnedVal[-1] === ' ').toEqual(false);
  });

  it('returns a line of poetry following the Markov Chain', () => {
    let corpus =  { 
      ever: [ 'since' ],
      since: [ 'i' ],
      i: [ 'left' ],
      left: [ 'the' ],
      the: [ 'city' ],
      city: [ 'you' ],
      you: [ 'you', 'you', 'you', 'and' ],
      and: [ 'me' ],
      me: [ 'we' ],
      we: [ 'just' ],
      just: [ 'dont' ],
      dont: [ 'get' ],
      get: [ 'along' ] 
    };

    let returnedVal = writeLine(corpus, 6);
    expect(typeof returnedVal).toEqual('string');
    console.log(returnedVal);
    let words = returnedVal.split(' ');
    words.forEach((word, i) => {
      if (i === words.length -1)
        return;
      if (corpus[word].length > 0) {
        let nextWord = words[i+1];
        expect(corpus[word].includes(nextWord)).toEqual(true);
      }
    });
  })

});

describe('generatePoem', () => {
  it('is a function', () => {
    expect(typeof generatePoem).toEqual('function');
  });

  it('returns a string', () => {
    let returnedVal = generatePoem({}, 0);
    expect(typeof returnedVal).toEqual('string');
  });

  it('returns a string with the correct number of lines', () => {
    let corpus =  { 
      ever: [ 'since' ],
      since: [ 'i' ],
      i: [ 'left' ],
      left: [ 'the' ],
      the: [ 'city' ],
      city: [ 'you' ],
      you: [ 'you', 'you', 'you', 'and' ],
      and: [ 'me' ],
      me: [ 'we' ],
      we: [ 'just' ],
      just: [ 'dont' ],
      dont: [ 'get' ],
      get: [ 'along' ] 
    };
    let returnedVal = generatePoem(corpus, 4);
    let lines = returnedVal.split('\n');
    expect(lines.length).toEqual(4);
  });
});