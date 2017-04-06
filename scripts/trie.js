import Node from '../scripts/node'
export default class Trie  {
  constructor() {
    this.head = new Node('')
    this.count = 0;
  }

  wordCount() {
    return this.count;
  }


  insert (word) {
    word = word.split('')
    let currentNode = this.head;

    while (word.length) {

      let firstLetter = word.splice(0, 1);    

      firstLetter = firstLetter[0];

      if (!currentNode.children[firstLetter]) {
        currentNode.children[firstLetter] = new Node(firstLetter)
      }

      currentNode = currentNode.children[firstLetter]
    }


    currentNode.isWord = 1;

    this.count++
  }

  populate(dictionary) {
    dictionary.forEach((word) => {
      this.insert(word);

    });

  }


  find (word) {
    let currentNode = this.head;

    word = word.split('')

    while (word.length) {
      currentNode = currentNode.children[word.shift()]
    }

    return currentNode
  }


  lookDown (currentNode, prefix) {
    if (currentNode.isWord) {

      let wordCountTally = currentNode.isWord + ':' + prefix

      this.suggest.push(wordCountTally)


    }
    Object.keys(currentNode.children).forEach((val) => {
      let tempPrefix = prefix + val

      this.lookDown(currentNode.children[val], tempPrefix)
    })


  }

  // sortWordCountNumbers(array){
  // for (let i = 0; i < array.length; i++) {
  //   for (let j = 1; j < array.length; j++) {
  //     if (array[j - 1] < array[j]) {
  //       [array[j - 1], array[j]] = [array[j], array[j - 1]];
  //     }
  //   }
  // }
  // return array;
  // };
  //
  // suggest (word) {
  //   this.suggest = [];
  //   let prefix = word
  //   let currentNode = this.find(word)
  //
  //   this.suggest = this.lookDown(currentNode, prefix)
  //   // let sortedWord = sortWordCountNumbers(this.suggest)
  //   return this.suggest
  // }


  sortWordCountNumbers(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 1; j < array.length; j++) {
        if (array[j - 1] < array[j]) {
          [array[j - 1], array[j]] = [array[j], array[j - 1]];
        }
      }
    }
    return array;

  }

  suggest (word) {
    this.suggest = [];
    let prefix = word
    let currentNode = this.find(word)

    this.lookDown(currentNode, prefix)
    return this.suggest
  }



  select(userWord) {
    let currentLetter  = this.head;
    let letters        = userWord.split('');

    letters.forEach( letter => {
      if (currentLetter.children[letter]) {
        currentLetter = currentLetter.children[letter];
      }
      return currentLetter;
    })
    currentLetter.isWord > 0 ? currentLetter.isWord++ : null
  //  if true, do this, else do that
  
  }
}
