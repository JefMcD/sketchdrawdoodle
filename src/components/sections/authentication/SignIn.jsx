
import SignInForm from "@authForms/SignInForm"
import sketchDrawDoodleLogo from "@images/logo1_w500.png"

function SignIn({
    setUserData,
    setActiveSection,
    server
}){

  return(
    <>
    <div className="main-panel">

        <div className='main-logo'>
            <img   className="logo-img" src = {sketchDrawDoodleLogo} />
        </div>

        <div className="authenticate-container">
            <div className="authenticate-inner-wrapper">

                <div className="text-container">
                    <div className="form-title fs7">Sign In</div>
                </div>

                <SignInForm 
                    setUserData={setUserData}
                    setActiveSection={setActiveSection}
                    server={server}/>

                <div className="authenticate-redirect fs5">
                    Not a member? 
                    <span className="auth-link" id="auth-join-link" onClick={()=>setActiveSection("join-section")}> Join!</span>
                </div>
                <div className="authenticate-redirect fs5">
                    Forgot Password?
                    <span className="auth-link" id="reset-pass-link" onClick={()=>setActiveSection("reset-section")}> Reset</span>
                </div>
                <div className="authenticate-redirect fs5">
                    <span className="auth-link" id="reset-pass-link" onClick={()=>setActiveSection("help-section")}> Help!</span>
                </div>

            </div>
        </div>  
    </div>
   
    </>
  )


}
export default SignIn

