import React , { Component }from 'react'
import { useState } from 'react';

// const getInitialGrid = () => [
//     // row        col col
//     // row
//         [0, 0, 1, 0, 0, 0, 0, 0, 0,],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0,],
//         [2, 0, 0, 0, 0, 0, 0, 0, 0,],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0,],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0,],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0,],
//         [0, 0, 0, 0, 0, 0, 0, 0, 4,],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0,],
//         [0, 0, 0, 0, 0, 0, 3, 0, 0,],
// ];

const getInitialGrid = () => [
    // row        col col
    // row
        [0, 4, 0, 0, 0, 0, 3, 0, 0,],
        [0, 0, 0, 3, 2, 0, 0, 0, 0,],
        [8, 6, 0, 1, 0, 0, 4, 0, 0,],
        [0, 0, 8, 0, 0, 0, 0, 0, 0,],
        [0, 0, 2, 0, 5, 8, 9, 7, 0,],
        [0, 0, 0, 0, 0, 0, 0, 3, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 3,],
        [0, 2, 0, 4, 0, 0, 1, 9, 0,],
        [0, 0, 9, 8, 1, 5, 6, 0, 0,],
];
var r = 0
var c = 0
let stack:number[][] = []
let shouldinit: boolean = true;
const Board = () => {

    const [grid, setGrid] = useState<number[][]>(getInitialGrid());
    const [color, setColor] = useState<boolean>(false);
    const gridCopy = getInitialGrid() 

    function setGridValue(rowIndex:number, colIndex:number, e:any) {
        // e.preventDefault();
        let value = parseInt(e.target.value) || 0;
        const newGrid = [...grid];

        if ( value >= 0 && value <=9 ) {
            newGrid[rowIndex][colIndex] = value
        }
        setGrid(newGrid)
    }
    function copyGrid(my_grid: number[][]) {
        return [...my_grid];
    }
    function checkRowCol(board: number[][], i: number, row: number, col: number, val: number ) {
        if(board[i][col] !== 0 && board[i][col] === val) return false; //check row
        if(board[row][i] !== 0 && board[row][i] === val) return false; //check column
        return true
    }
    function isValid(board: number[][], row: number, col: number, val: number) {
        for(let i = 0; i < 9; i++) {
            if (!checkRowCol( board, i, row, col, val)) {
                return false
            }
            let rn = Math.floor(row / 3);
            let cn = Math.floor(col / 3);
            let startRow = 3 * rn;
            let startCol = 3 * cn;
            let rowVal = Math.floor(i / 3);
            let colVal = i % 3
            let boardValue = board[startRow + rowVal][ startCol + colVal]
            if(boardValue != 0 && 
                boardValue == val) return false; //check 3*3 block
        }
        return true;
    }
    // var r = 0
    // var c = 0

    function handleNext() {
        next(copyGrid(grid))
    }
    async function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }
    function next(board: number[][]) {
        if (r < 9 && c < 9) {
            if ( board[r][c] === 0){ 
                for (let n = 0 + 1; n < 9 + 1; n++) {
                    if ( isValid( board, r, c, n )){
                        board[r][c] = n
                        if (next(board)){
                            return copyGrid(board);
                        }
                        else {
                            board[r][c] = 0;
                        }
                    }
                }
                return false
            } 
            // debugger
            c+=1
            updateGrid(board)
            // await timeout(1000);
            
        }
        else if (r < 9 && c >= 9) {
            r+= 1
            c= 0
            next(board)
        }
        else{
            return
        }
    }
    let solvedGrid = copyGrid(grid)
    function Solve(board: number[][]) {

        // loops through board
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                // checks if not set
                if ( board[r][c] === 0){ 
                    for (let n = 0 + 1; n < 9 + 1; n++) {
                        if ( isValid( board, r, c, n )){
                            board[r][c] = n
                            stack.push([r,c,n]) 
                            // waiter(board)
                            if (Solve(board)){

                                solvedGrid = copyGrid(board);
                                return true
                            }
                            else {
                                board[r][c] = 0;
                                stack.push([r,c,0]) 
                            }
                        }
                    }
                    return false
                }
                

                // waiter(board)
                // debugger
            }

            // await timeout(1);
                // requestAnimationFrame(waiter)
                // debugger
            // debugger
            // updateGrid(board)
            // requestAnimationFrame(timeout(1000), updateGrid(board))
            // setTimeout(requestAnimationFrame, 100)
            // updateGrid(copyGrid(board))
            // updater(copyGrid(board))
            // debugger;
        }
        return true;
        
        // enter valuef
        // check if valid
        // recursively check next
    }

    function test2Handler(){
        console.log(grid)
        console.log(stack)
        
        requestAF()
    }
    function itterateStack2() {

        // console.log(stack.length)
        // for (let i = 0; i < stack.length; i++){
        //     requestAF() 
        // }
    }
    
    function requestAF(){
        

        let steps = 100
        let newGrid = [...grid];
        if (stack.length > steps) {
            for (let i = 0;i < steps; i++){
                
                let top:any = stack.shift() 
                console.log(top)
                console.log(stack.length)
                
                newGrid[top[0]][top[1]] = top[2]

            }
            setGrid(newGrid); 
        }
        else{
            let top:any = stack.shift() 
                console.log(top)
                console.log(stack.length)
                
                newGrid[top[0]][top[1]] = top[2]
                setGrid(newGrid); 
        }
            // newGrid[top[0], top[1],top[2]]
        if(stack.length > 0){
            requestAnimationFrame(requestAF)
        }

    }
    function itterateStack() {
        // grid.set
        // take num from stack 
        // make change to 
        console.log("@@@@@")
        console.log(grid)
        let initial = getInitialGrid()
        console.log("@@@@@")
        
        console.log(initial)
        updateGrid(initial)
        console.log("@@@@@")
        console.log(grid)
    }


    function testHandler() {
        if (shouldinit) {
            shouldinit = false
            let newGrid = Solve(copyGrid(grid))
            console.log(newGrid)
            console.log(stack)
            console.log(stack)
            console.log(solvedGrid)
            // itterateStack()
            setGrid(getInitialGrid())
            // test2Handler()
        }
    }
    async function waiter(board: number[][]){
        updateGrid(board)
        await timeout(1);

    }
    function solveHandler() {
        let newGrid = Solve(grid)
        // debugger;
    }
    function updateGrid(inGrid: number[][]) {
        const newGrid = [...inGrid];
        setGrid(newGrid);
        // setGrid(inGrid);
        // setTimeout(requestAnimationFrame, 100)
      
    }
    function clearBoard() {
        setColor(!color)
        setGrid(getInitialGrid());
    }
   
    const board = document.querySelector(".Board");
    testHandler()
    return (
        <div className='Board'>

            <table>
            
            <tbody >
                {grid.map((row, rowIndex) =>
                (
                    <tr key={rowIndex} className="row">
                        {row.map((number, colIndex) => ( 
                            <td key={colIndex} className="cell">
                                <input disabled={gridCopy[rowIndex][colIndex] !== 0} value={number === 0 ? '' : number} onChange={(e) =>
                                    // setGridValue(rowIndex, colIndex, parseInt(e.target.value) || 0)
                                    setGridValue(rowIndex, colIndex, e)
                                    }
                                />

                                {/* {number} */}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
           
            </table>
            {/* <button onClick={solveHandler} className={`${(color === true)? '#96948d' : '#c73828'}`} >Solve</button> */}
            <button onClick={test2Handler} style={{ backgroundColor: color ? "black" : "white" }}>test2</button>
            <button onClick={testHandler} style={{ backgroundColor: color ? "black" : "white" }}>test</button>
            <button onClick={handleNext} style={{ backgroundColor: color ? "black" : "white" }}>next</button>
            <button onClick={solveHandler} style={{ backgroundColor: color ? "black" : "white" }}>Solve</button>
            <button onClick={clearBoard} style={{ backgroundColor: color ? "black" : "white" }}>Clear Board</button>
        </div>
    )
}

// {/* <div className='grid'>
//                 {grid.map((row, rowIndex) =>
//                 (
//                     <div key={rowIndex} className="row">
//                         {row.map((number, colIndex) => ( 
//                             <div key={colIndex} className="cell">
//                                 <input value={number} onChange={(e) =>
//                                     // setGridValue(rowIndex, colIndex, parseInt(e.target.value) || 0)
//                                     setGridValue(rowIndex, colIndex, e)
//                                     }
//                                 />

//                                 {/* {number} */}
//                             // </div>
//                         // ))}
//                     // </div>
//                 // ))}
//             // </div>  
// */}
export default Board