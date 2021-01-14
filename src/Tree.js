import {Node} from './Node.js'
import {treeFromArray, treeToASCII} from '../node_modules/treevis/tree/index.js'

function print(root) {
	const array = toArray(root).map(el => el === null ? el : el.value)
	treeToASCII(treeFromArray(array))
}

function insert(root, value, level, position) {
	if (position > Math.pow(2, level - 1) || position < 1) {
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
	if (position > Math.pow(2, level - 1) || position < 1 || root === null) {
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
			result.push(first)
		} else {
			result.push(null)
		}
	}
	return result
}

function getParents(root, level, position) {
	const node = getNode(root, level, position)
	return [node.left, node.right].filter(el => el !== null)
}

function getGrandparents(root, level, position) {
	const parents = getParents(root, level, position)
	return parents.map(el => [el.left, el.right]).flat().filter(el => el !== null)
}

function getNode(root, level, position) {
	let localPosition = position
	let currentNode = root
	let currentLevel = 1
	if (root == null) {
		return null
	}
	while (level !== currentLevel) {
		const middle = Math.pow(2, level - currentLevel - 1)
		// Если нужна позиция больше чем середина (для текущего уровня)
		if (localPosition > middle) {
			if (currentNode.right === null) {
				return null
			}
			localPosition -= middle
			currentNode = currentNode.right
			currentLevel++
		} else {
			if (currentNode.left === null) {
				return null
			}
			currentNode = currentNode.left
			currentLevel++
		}
	}
	return currentNode
}

function getAncestors(root, level, position) {
	const node = getNode(root, level, position)
	const stack = [node]
	const result = []
	if (node === null) {
		return result
	}
	while (stack.length !== 0) {
		const first = stack.shift()
		if (first) {
			stack.push(first.left, first.right)
		}
		if (first) {
			result.push(first)
		} else {
			result.push(null)
		}
	}
	return result.filter(el => el !== null).slice(1)
}

function getChild(root, level, position) {
	if (root === null) {
		return null
	}
	return getNode(root, level - 1, Math.round(position / 2))
}

function getByName(root, name) {
	const nodes = toArray(root)
	return nodes.filter(el => el !== null).filter(el => el.value === name)
}

export {print, insert, remove, getHeight, getParents, getGrandparents, getNode, getAncestors, getChild, getByName}
