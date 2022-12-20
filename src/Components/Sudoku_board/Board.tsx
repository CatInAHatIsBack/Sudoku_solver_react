import React , { Component }from 'react'
import { useState } from 'react';
import  './slider.css'
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
const getInitialGrid2 = () => [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
]

let my_grid =  [] 
function getInitGrid() {
    return getInitialGrid() 
}

let stack:number[][] = []
let simulateclicked: boolean = false

const Board = () => {

    const [grid, setGrid] = useState<number[][]>(getInitGrid());
    const [color, setColor] = useState<boolean>(false);
    const [ gridCopy, setGridCopy] = useState<number[][]>(getInitGrid())
    const [mySlider, setMySlider] = useState(10)
    const [solvable, setSolvable] = useState(true)
    const [boardString, setBoardString] = useState('')

    function setGridValue(rowIndex:number, colIndex:number, inputNum: number) {
        // e.preventDefault();
        let value = inputNum || 0;
        const newGrid = [...grid];

        if ( value >= 0 && value <=9 ) {
            newGrid[rowIndex][colIndex] = value
        }
        setGrid(newGrid)
    }
    function setcopyGridValue(rowIndex:number, colIndex:number, inputNum: number) {
        // e.preventDefault();
        let value = inputNum || 0;
        const newGrid = [...gridCopy];

        if ( value >= 0 && value <=9 ) {
            newGrid[rowIndex][colIndex] = value
        }
        setGridCopy(newGrid)
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
            }
        }
        return true;
    }

    function test2Handler(){
        console.log(grid) 
        // setHandler()

        solveHandler()
        simulateclicked = true
        requestAF()

    }
    
    function requestAF(){
        
        let steps = mySlider 
        let newGrid = [...grid];
        if (stack.length > steps) {
            for (let i = 0;i < steps; i++){
                
                let top:any = stack.shift() 
                // console.log(top)
                // console.log(stack.length)
                
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
        if(stack.length > 0){
            requestAnimationFrame(requestAF)
        }

    }

    let input = "3, 0, 6, 5, 0, 8, 4, 0, 0, 5, 2, 0, 0, 0, 0, 0, 0, 0,0, 8, 7, 0, 0, 0, 0, 3, 1, 0, 0, 3, 0, 1, 0, 0, 8, 0, 9, 0, 0, 8, 6, 3, 0, 0, 5, 0, 5, 0, 0, 9, 0, 6, 0, 0, 1, 3, 0, 0, 0, 0, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 7, 4, 0, 0, 5, 2, 0, 6, 3, 0, 0"

    function handleText() {
        
        
        // let result = input 
        let result = boardString
        .split(',')
        .map(element => element.trim())
        .filter(element => element !== '');
        if (result.length === 81) {
           console.log(result) 

           let count = 0
            for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 9; c++) { 
                    let num = parseInt(result[count])
                    if(typeof(num) === 'number' && num >= 0 && num <= 9) {
                        // console.log('number')
                        setcopyGridValue(r,c,num)

                        setGridValue(r,c,num)
                    }
                    console.log(num)
                    count++
                }
            }
            console.log(grid)
        }
        
    }
    function setHandler() {


    }
    function solveHandler() {
        handleText()
        var testcopy  = grid.map(function(arr) {
            return arr.slice();
        });

        let isSolved = Solve(testcopy)
        setSolvable(isSolved) 
       

    }
    
    function clearBoard() {
        // setColor(!color)
        setGrid(getInitialGrid());
    }
   
   
    function setSliderValue(e:any) {
        setSliderValuePrinter(e)
        setMySlider(e.target.value)
    }
    function setSliderValuePrinter(e:any){
        console.log(e)
        console.log(mySlider)
        console.log(e.target.value)
    }

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
                                    setGridValue(rowIndex, colIndex, parseInt(e.target.value) )
                                    }
                                />

                                {/* {number} */}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
           
            </table>

            <div className='buttons'>
                {/* <button onClick={solveHandler} className={`${(color === true)? '#96948d' : '#c73828'}`} >Solve</button> */}
                <button onClick={test2Handler} style={{ backgroundColor: color ? "black" : "white" }}>simulate</button>
                {/* <button onClick={testHandler} style={{ backgroundColor: color ? "black" : "white" }}>test</button>
                <button onClick={handleNext} style={{ backgroundColor: color ? "black" : "white" }}>next</button>
                <button onClick={solveHandler} style={{ backgroundColor: color ? "black" : "white" }}>Solve</button>
                <button onClick={clearBoard} style={{ backgroundColor: color ? "black" : "white" }}>Clear Board</button> */}
            </div>
            <div className="slidecontainer">
                <span>Enter each number with ',' seperating the numbers with 0 for not filled squares</span>
                <input onChange={event => setBoardString(event.target.value)} />
                <span className='nosolution' style={{ visibility: solvable ? 'hidden' : 'visible' }} >Board is not solvable</span>
                <span className='nosolution' style={{ visibility: solvable && simulateclicked ? 'visible' : 'hidden' }} >Board will be solved in {stack.length}</span>
                <span className='sliderinfo'>Set speed before start {mySlider}</span>
                <input type="range" min="1" max="100" value={mySlider} className="slider" id="myRange" 
                    onChange={(e) => setSliderValue(e)}  />
            </div>
        </div>

    )
}

export default Board
// 3, 0, 6, 5, 0, 8, 4, 0, 0, 5, 2, 0, 0, 0, 0, 0, 0, 0,0, 8, 7, 0, 0, 0, 0, 3, 1, 0, 0, 3, 0, 1, 0, 0, 8, 0, 9, 0, 0, 8, 6, 3, 0, 0, 5, 0, 5, 0, 0, 9, 0, 6, 0, 0, 1, 3, 0, 0, 0, 0, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 7, 4, 0, 0, 5, 2, 0, 6, 3, 0, 0