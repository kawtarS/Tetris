import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";
const StartButton=({ callback })=>(
    <StyledStartButton onClick={callback}>
        start Game
    </StyledStartButton>
)
/*In React, props are used to pass information down the component tree, from parents to children. In order to propagate information in the opposite direction, we can use callback functions, 
also passed down as props from parent components to children.
*/
export default StartButton;