import React from "react";
import { Link } from "react-router-dom";

export const Signup:React.FC = () => {
    // TODO make sign up page with small validations, don't use <form> element, and when there is an error in any field when unfocus, the error is triggered, when typing in the field , remove the  error
    // registered when pressing the enter button and clicking sign-in button
    // sign in after registration with Promise.allWithMode , for example Promise.allWithMode([singupcall(), signincall()])
    return (
        <div>
            <h3>sign up page</h3>
            <Link to={"/signin"}>go to sign in</Link>
        </div>
    )
}