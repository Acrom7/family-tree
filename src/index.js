import * as Tree from './Tree.js'

let root = Tree.insert(null, 'Дима', 1, 1)

root = Tree.insert(root, 'Анжела',2, 1)
root = Tree.insert(root, 'Александр',2, 2)

root = Tree.insert(root, 'Зоя',3, 3)
root = Tree.insert(root, 'Дмитрий',3, 4)
root = Tree.insert(root, 'Наталья',3, 1)
root = Tree.insert(root, 'Иван',3, 2)

Tree.print(root)
const parents = Tree.getParents(root, 1, 1)
console.log(parents[0].value, parents[1].value)
