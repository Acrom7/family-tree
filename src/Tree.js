import {Node} from './Node.js'
import {treeFromArray, treeToASCII} from '../node_modules/treevis/tree/index.js'

function print(root) {
	const array = toArray(root)
	treeToASCII(treeFromArray(array))
}

function insert(root, value, level, position) {
	if (position > Math.pow(2, level - 1)) {
		return root
	}

	if (root === null) {
		if (level === 1 && position === 1) {
			root = new Node(value)
		} else {
			return root
		}
	}

	let currentNode = root
	let localPosition = position
	let currentLevel = 1
	while (level !== currentLevel) {
		const middle = Math.pow(2, level - currentLevel - 1)
		// Если нужна позиция больше чем середина (для текущего уровня)
		if (localPosition > middle) {
			if (currentNode.right === null) {
				// Если справа пустая Node, но она нам и нужна
				if (level === currentLevel + 1 && localPosition <= 2) {
					currentNode.right = new Node(value)
				}
				return root
			}
			localPosition -= middle
			currentNode = currentNode.right
			currentLevel++
		} else {
			if (currentNode.left === null) {
				if (level === currentLevel + 1) {
					currentNode.left = new Node(value)
				}
				return root
			}
			currentNode = currentNode.left
			currentLevel++
		}
	}
	currentNode.value = value
	return root
}

function remove(root, level, position) {
	if (root === null) {
		return root
	}

	let currentNode = root
	let parent = currentNode
	let localPosition = position
	let currentLevel = 1

	const LEFT = 'LEFT'
	const RIGHT = 'RIGHT'

	let direction = null
	while (level !== currentLevel) {
		const middle = Math.pow(2, level - currentLevel - 1)
		// Если нужна позиция больше чем середина (для текущего уровня)
		if (localPosition > middle) {
			if (currentNode.right === null) {
				return root
			}
			localPosition -= middle
			parent = currentNode
			currentNode = currentNode.right
			direction = RIGHT
			currentLevel++
		} else {
			if (currentNode.left === null) {
				return root
			}
			parent = currentNode
			currentNode = currentNode.left
			direction = LEFT
			currentLevel++
		}
	}
	if (direction && direction === LEFT) {
		parent.left = null
	} else if (direction && direction === RIGHT) {
		parent.right = null
	} else {
		// deleting root
		root = null
	}
	return root
}


function getHeight(root) {
	if (root === null) {
		return 0
	}
	return 1 + Math.max(getHeight(root.left), getHeight(root.right))
}

function toArray(root) {
	if (root === null) {
		return []
	}
	const stack = [root]
	const result = []
	while (stack.length !== 0) {
		const first = stack.shift()
		if (first) {
			stack.push(first.left, first.right)
		}
		if (first) {
			result.push(first.value)
		} else {
			result.push(null)
		}
	}
	return result
}

function getParents(root, level, position) {
	let localPosition = position
	let currentNode = root
	let currentLevel = 1
	const parents = []
	while (level !== currentLevel) {
		const middle = Math.pow(2, level - currentLevel - 1)
		// Если нужна позиция больше чем середина (для текущего уровня)
		if (localPosition > middle) {
			if (currentNode.right === null) {
				return parents
			}
			localPosition -= middle
			currentNode = currentNode.right
			currentLevel++
		} else {
			if (currentNode.left === null) {
				return parents
			}
			currentNode = currentNode.left
			currentLevel++
		}
	}
	return [currentNode.left, currentNode.right]
}

export {print, insert, remove, getHeight, getParents}
