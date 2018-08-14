let corpus;
let numIngested;

function resetMemory() {
  corpus = { ingest };
  numIngested = 0;
  updateIngestionCount();
}

function clearContents() {
  let form = document.getElementById('inputForm');
  form.elements['text'].value = '';
}

function updateIngestionCount() {
  if (document.readyState === 'complete') {
    let ingestionCount = document.getElementById('numIngested');
    ingestionCount.innerText = numIngested;
  }
}

function ingestText() {
  let form = document.getElementById('inputForm');
  let textarea = form.elements['text'];
  let text = textarea.value; 
  if (!text) {
    alert("Please enter some text to ingest and try again.");
    return;
  }
  let depth = form.elements['depth'].value;
  let alphabeticOnly = form.elements['alphabeticOnly'].checked;
  clearContents(textarea);
  //let words = parseText(text, includePunctuation);
  let newCorpus = generateWordPairs(text, depth, alphabeticOnly);
  
  corpus.ingest(newCorpus);
  numIngested++;
  updateIngestionCount();
}

function writeLineToPage() {
  let inputForm = document.getElementById('inputForm');
  let textbox = document.getElementById('poetryBox');
  let minWords = Number(inputForm.elements['minLine'].value);
  let maxWords = Number(inputForm.elements['maxLine'].value);
  let numLines = Number(inputForm.elements['numLines'].value);

  if (maxWords < minWords) {
    alert('Please set Min Word Length less than Max Word Length');
    return;
  }
  
  let text = generatePoem(corpus, numLines, minWords, maxWords)

  if (text)
    textbox.innerText = text;
  else
    textbox.innerHTML = "<br/>";
}