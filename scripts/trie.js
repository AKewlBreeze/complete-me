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
      let firstLetter = word.splice(0, 1);      // t

      firstLetter = firstLetter[0];

      if (!currentNode.children[firstLetter]) {
        currentNode.children[firstLetter] = new Node(firstLetter)
      }

      currentNode = currentNode.children[firstLetter]
    }

    currentNode.isWord = true;
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
      this.suggest.push(prefix)
    }
    Object.keys(currentNode.children).forEach((val) => {
      let tempPrefix = prefix + val

      this.lookDown(currentNode.children[val], tempPrefix)
    })
  }

  suggest (word) {
    this.suggest = [];
    let prefix = word
    let currentNode = this.find(word)

    this.lookDown(currentNode, prefix)
    return this.suggest
  }

  store (word) {
    let currentNode = this.head;  // a node

    word = word.split('')         // [w, o, r, d]

    // grab first character of word
    let firstLetter = word[0];    // w

    if (!firstLetter) {
      return this.head;
    }


    // while (currentNode.children[firstLetter] && firstLetter) {
    //   // check to see if object letter exists
    //   // currentNode.children[firstLetter] = new Node(firstLetter)
    //   // let remainningWord = word.slice(1)
    //   currentNode.children[firstLetter]
    //   currentNode = currentNode.children[firstLetter]
    //   // reassign currentNode to one created
    //   // reassign first letter to next letter
    //   // loop till end of word
    // }

    let remainningWord = word.slice(1) // ord

    while (!currentNode.children[firstLetter] && firstLetter) {
      // create object for letter
      currentNode.children[firstLetter] = new Node(firstLetter)

      // move into new node by reassigning currentNode to one created
      currentNode = currentNode.children[firstLetter]

      // grab next letter
      firstLetter = remainningWord[0] // o[] - undefined

      remainningWord = remainningWord.slice(1) // rd
      // remainningWord === ord
    }

    currentNode.isWord = true;
    this.count++
    return currentNode;
  }
}
