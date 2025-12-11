

// https://react.dev/reference/react/useRef

/*
  React Definition:
  
  useRef is a React Hook that lets you reference a value that's not needed for rendering
  A ref preserves its value across renders like state but unlike state changing it doesnt trigger a render 

  Usage:

  useRef returns a ref object with a single property (current) which is set to the initial value you provided.

  * Referencing a Value not held in state
  * Manipulating and conrolling the DOM
  * Storing Data between re-renders (regular variables reset on every render)
  * Avoiding recreating the ref contents
  
  Changing the value of a ref does not trigger a re-render
  ref value is scoped locally to the component
  
*/

import {useRef} from "react";

function MyComponent(){
  const intervalRef = useRef(0); // intervalRef.current === 0
  const inputRef = useRef(null); // inputRef.current === null

  function handleClick() {
    // The inputRef is set to the DOM Node its attached to and can be used like normal javascript
    inputRef.current.focus()
  }
  // Manipulating the DOM with a ref
  // Once React creates the DOM node, the current prop  of the ref is set that DOM Node
  return(
    <input onClick={handleClick} ref={inputRef} />
  )
}






