
import {useEffect} from "react";

import {tapDjangoCsrf, checkCookie} from "@modules/manageApi";

import SignInForm from "@authForms/SignInForm";
import sketchDrawDoodleLogo from "@images/logo1_w500.png";

export default function SignIn({
    userData,
    setUserData,
    setActiveSection,
}){

  console.log("SIGNIN");

  return(
    <>
    <div className="main-panel">

        <div className='main-logo'>
            {/* <img   className="logo-img" src = {sketchDrawDoodleLogo} /> */}
            {/* HEADER / TITLE */}
            <div className="zine-title">
                <h1>Sketch Draw Doodle</h1>
            </div>
        </div>

        <div className="authenticate-container">
            <div className="authenticate-inner-wrapper">

                <div className="text-container">
                    <div className="form-title fs7">Sign In</div>
                </div>

                <SignInForm 
                    userData = {userData}
                    setUserData={setUserData}
                    setActiveSection={setActiveSection}
                />

                <div className="authenticate-redirect fs3">
                    Not a member? 
                    <span className="auth-link" id="auth-join-link" onClick={()=>setActiveSection("join-section")}> Join!</span>
                </div>
                <div className="authenticate-redirect fs3">
                    Forgot Password?
                    <span className="auth-link" id="reset-pass-link" onClick={()=>setActiveSection("reset-section")}> Reset</span>
                </div>
                {/* <div className="authenticate-redirect fs3">
                    <span className="auth-link" id="reset-pass-link" onClick={()=>setActiveSection("help-section")}> Help!</span>
                </div> */}

            </div>
        </div>  
    </div>
   
    </>
  )


}

