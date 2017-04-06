import { expect } from 'chai';
import {assert} from 'chai'
let fs = require('fs')
import Trie from '../scripts/trie'
import Node from '../scripts/node'
const text = "/usr/share/dict/words"
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

console.log(dictionary)

require('locus')

describe('trie', () => {
  it('a tree should return an empty head on instantiation', () => {
    let trie = new Trie()

    assert.isObject(trie.head)
    expect(trie.head.children).to.eql({});
  });

  it('should take first letter and create a new object ', () => {
    let trie = new Trie()

    trie.insert('word');
    // eval(locus);
    assert.isObject(trie.head.children.w.children.o.children.r.children.d)
  })

  it('should count the number of words inputed', () => {
    let trie = new Trie()

    trie.insert('word');
    let count = trie.wordCount()

    assert.deepEqual(count, 1);
  })

  it('should return an array that contains all words in the dictionary', () => {
    let trie = new Trie()

    trie.populate(dictionary)
    let input = trie.find('Abbadide')

    assert.equal(input.letter, 'e')
  });

  it ('should return a count of words available in dictionary', () => {
    let trie = new Trie()

    trie.populate(dictionary)
    assert.equal(trie.wordCount(), 235886)
  });

  it('should split word into characters', ()=>{})

  it('should return an array of completed word options', () => {
    let trie = new Trie()

    trie.insert('pet')
    trie.insert('pen')

    let suggestion = trie.suggest('pe')

    assert.deepEqual(suggestion, ['pet', 'pen'])

  })

  it('should return an array of word suggestions from dictionary', () => {
    let trie = new Trie()

    trie.populate(dictionary)


    let suggestion = trie.suggest('fang')

    assert.deepEqual(suggestion, ['suggestion', 'pen'])

  })

});
