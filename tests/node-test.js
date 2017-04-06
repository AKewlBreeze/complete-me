
import { assert } from 'chai';
import Node from '../scripts/node'

describe('node', () => {
  it('should take start with isWord at false', () => {
    let node = new Node()

    assert.deepEqual(node.isWord, 0)
  })

  it('should be a function', () => {
    let node = new Node();

    assert.isFunction(Node)
  })

  it('should take in a word', () => {
    let node = new Node('music')

    assert.equal(node.letter, 'music')
  })

it('it should begin with an empty object as children', () => {
  let node = new Node()
  assert.equal(node.children, {})
})

});

