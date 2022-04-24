import React,{useState} from "react";
import { createStage ,checkCollision} from "../gameHelpers";
//components
//components
import Stage from './Stage'; //stag with cells in it 
import Display from './Display';//3 componets score rows level
import StartButton from './StartButton';
//styled components
import {StyledTetrisWrapper,StyledTetris} from "./styles/StyledTetris"
//custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
const Tetris=()=>{
    const [dropTime,setDropTime]=useState(null);
    const [gameOver,setGameOver]=useState(false);
   const [player,updatePlayerPos,resetPlayer]=usePlayer();
   const [stage,setStage]=useStage(player);
  console.log('rernder');

  //taking care of right and left
  const movePlayer=dir=>{
      console.log(player.pos, dir);
      if(!checkCollision(player,stage,{x:dir,y:0})){
        updatePlayerPos({x:dir,y:0});
      }
    
  }

  const startGame=()=>{
  //reset everything
  setStage(createStage());
  resetPlayer();
  setGameOver(false);
  }

  const drop=()=>{

      if(!checkCollision(player,stage,{x:0,y:1})){
        updatePlayerPos({x:0,y:1,collided:false})
    }else{
        //game over
        if(player.pos.y<1){
            console.log("GAME OVER !!!!!")
            setGameOver(true);
            setDropTime(null)
        }
        updatePlayerPos({x:0,y:0,collided:false})
    }
  }

  const dropPlayer=()=>{
  drop();
  }
//is a callback function
  const move =({keyCode})=>{
      console.log('moving')
  if(!gameOver){
      if(keyCode===37){
          //lefft
          movePlayer(-1);
      }else if(keyCode===39){
          //move right  
          movePlayer(1);
      }else if(keyCode===40){
          //down
            dropPlayer();
        }
  }
  }
    return (
        <StyledTetrisWrapper  role="button" tabIndex="0" onKeyDown={e=>move(e)}>
            <StyledTetris>
            <Stage stage={stage} />
            <aside>
                {gameOver? (
                    <Display gameOver={gameOver} text="Game Over"/>
                ):(
                <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
                </div>
                )}
                <StartButton callback={startGame}/>
            </aside>
          </StyledTetris>
        </StyledTetrisWrapper>
    )
};
export default Tetris;