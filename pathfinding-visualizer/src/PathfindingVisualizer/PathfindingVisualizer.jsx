import React, { Component } from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import {dijkstra,getNodesInShortestPath} from '../algorithms/dijkstra'

const START_NODE_ROW =10
const START_NODE_COL =10
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL =45
export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed:false,
        };

    }
    
    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid})


    }
    handleMouseDown(row,col){
        console.log('onmousedown is called')
        const newGrid = getNewGrdiWithWallToggled(this.state.grid,row,col);
        this.setState({grid:newGrid,mouseIsPressed:true});

    }
    handleMouseEnter(row,col){
        console.log('mouseenter is called')
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGrdiWithWallToggled(this.state.grid,row,col);
        this.setState({grid:newGrid});

    }
    handleMouseUp(){
        this.setState({mouseIsPressed:false});
    }
    animateDijkstra(visitedNodesInOrder,nodesInShortestPath){
        for (let i=0;i<=visitedNodesInOrder.length;i++){
            if (i=== visitedNodesInOrder.length){
                console.log('done')
                setTimeout(()=>{ 
                    for (let j=0;j<nodesInShortestPath.length;j++){
                        setTimeout(()=>{ 
                            const node = nodesInShortestPath[j]
                            document.getElementById(`node-${node.row}-${node.col}`).className='node node-shortestpath'
                        },10*j)
                    }
                },10*i);
                 
                
                
            return; 
            }
            setTimeout(()=>{
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className='node node-visited';
            },10*i);
        }

    }
    visualizeDikstra(){
        const {grid} = this.state;
        console.log(grid[START_NODE_ROW])
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid,startNode,finishNode);
        const nodesInShortestPath = getNodesInShortestPath(finishNode);
        this.animateDijkstra(visitedNodesInOrder,nodesInShortestPath);
    }
    render() {
        const { grid } = this.state;
   
        return (
            <>
            <button onClick={()=>this.visualizeDikstra()}>
                Visualize Dikstra Algorithm
            </button>
            <div className="grid">
                
                {grid.map((row, rowIdx) => {
                    return (<div key = {rowIdx}>                     
                            {row.map((node, nodeIdx) => {
                                    const {row,col,isFinish,isStart,isWall}=node;

                                    return (<Node key={nodeIdx}
                                        col = {col}
                                        row = {row}
                                        isWall = {isWall}
                                        onMouseDown = {(row,col)=>this.handleMouseDown(row,col)}
                                        onMouseEnter = {(row,col)=>this.handleMouseEnter(row,col)}
                                        onMouseUp = {()=>this.handleMouseUp()}
                                    isStart={isStart}
                                    isFinish={isFinish}

                                    test={'foo'} test={'foo2'}> </Node> 
                                    );
                            })}
                            </div>
                          );
                        })}
            </div>
            </>
        );
    }
}

const getInitialGrid=()=>{
    const grid = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                const currentNode = {
                    col,
                    row,
                    distance:Infinity,
                    isStart: row===START_NODE_ROW && col === START_NODE_COL,
                    isFinish: row===FINISH_NODE_ROW && col ===FINISH_NODE_COL,
                    previousNode:null};
                currentRow.push(currentNode);
            }
            grid.push(currentRow);
        }
       return grid;
};


const getNewGrdiWithWallToggled =(grid,row,col)=>{
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode ={
        ...node,
        isWall:true,//!node.isWall,
    };
    newGrid[row][col]=newNode
    return newGrid;
}