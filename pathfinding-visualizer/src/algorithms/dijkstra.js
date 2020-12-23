export function dijkstra(grid,startNode,finishNode){
    const visitedNodeInOrder = [];
    startNode.distance=0;
    const unVisitedNodes=getAllNodes(grid);
    while(!!unVisitedNodes.length){
        sortNodesByDistance(unVisitedNodes);
        const closestNode = unVisitedNodes.shift();
    
        if (closestNode.isWall)continue;

        if (closestNode.distance===Infinity)return visitedNodeInOrder;
        closestNode.isVisited = true;
        visitedNodeInOrder.push(closestNode);
        if (closestNode===finishNode) return visitedNodeInOrder;
        updateUnvisitedNeighbors(closestNode,grid);
        console.log(closestNode)
    }
}
function getAllNodes(grid){
    const nodes = [];
    for (const row of grid){
        for (const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}
function sortNodesByDistance(nodes){
    nodes.sort((nodeA,nodeB)=> nodeA.distance - nodeB.distance);
}
function updateUnvisitedNeighbors(node,grid){
    const neighbors = getUnvisitedNeighbors(node,grid);
    for (const neighbor of neighbors){
        neighbor.distance = node.distance +1;
        neighbor.previousNode = node;
    }

}

function getUnvisitedNeighbors(node,grid){
    const neighbors = [];
    const {col,row} = node;

    if (row>0)neighbors.push(grid[row-1][col]);
    if (col>0)neighbors.push(grid[row][col-1]);
    if (row< grid.length-1) neighbors.push(grid[row+1][col]);
    if (col< grid[0].length-1) neighbors.push(grid[row][col+1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);

}

export function getNodesInShortestPath(finishNode){
    const nodesInShortestPath = [];
    let currentNode = finishNode;
    while (currentNode!=null){
        nodesInShortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPath;
}