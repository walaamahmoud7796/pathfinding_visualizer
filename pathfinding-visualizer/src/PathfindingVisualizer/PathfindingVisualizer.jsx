import React, { Component } from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import {dijkstra} from '../algorithms/dijkstra'

const START_NODE_ROW =10
const START_NODE_COL =10
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL =45
export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };

    }
    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid})


    }
    animateDijkstra(visitedNodesInOrder){
        for (let i=0;i<=visitedNodesInOrder.length;i++){
            if (i=== visitedNodesInOrder.length){
                setTimeout(()=>{
                    console.log('done')
                },10*i);
                return 
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
        this.animateDijkstra(visitedNodesInOrder);
    }
    render() {
        const { grid } = this.state;
        // console.log(nodes[0]);
        console.log(grid[11]);
        // dijkstra(nodes,nodes[10][10],nodes[20][20]);
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

