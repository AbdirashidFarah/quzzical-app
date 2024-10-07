import React from "react"


export default function Button(props) {
    return (
        <button className="btn" onClick={props.handleClick}>{props.text}</button>
        
    )
}

Button.defaultProps = {
    handleClick:() => {},
    text:"button"
}
