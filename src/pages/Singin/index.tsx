import React from "react"
import { Link } from "react-router-dom"

export const Signin:React.FC = () => {
    // TODO make sign in page with small validations dont used <form> element, and when have error any fields when blured error trigged, when typeing in the field remove error
    // signed when press enter button and mouse clicking signin button
    return (
        <div>
            <h3>sign in page</h3>
            <Link to={"/signup"}>go to sign up</Link>
        </div>
    )
}