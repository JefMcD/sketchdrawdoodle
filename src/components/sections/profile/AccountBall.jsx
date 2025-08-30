
/*
    Parent: NavPanel
*/

import {useState} from "react";
import checkSession from "@modules/checkSession.js";

export default function AccountBall({
    userData,
    setUserData,
    setActiveSection, 
    server
}){ 
{/* Destructure prop object */}

    const [accountOptionsModal, setAccountOptionsModal] = useState(false);
    const [signoutError, setSignoutError] = useState("");

    function Avatar({username, avatar}){
        console.log(`username ${username}`);
        console.log(`avatar ${avatar}`);

        return(
            <>
            <div className="user-name fs6"> {/* default mobile display:none */}
                {username}
            </div>      
            <div className="user-avatar">
                <img className="avatar-img" src={avatar} />
            </div>

            </>
        )
    }

    function toggleAccountOptionsModal(){
        // toggle account options modal
        setAccountOptionsModal(!accountOptionsModal);
    }


    async function signout(e){
        console.log("signout INVOKED")
        e.preventDefault();

        const signout = server+"signout/";
        const response = await fetch(signout, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();
        
        if(response.ok){
            toggleAccountOptionsModal();
            setUserData( (prev)=> ({...prev, 
                ["is_authenticated"]:data.is_authenticated,
                ["username"]: null
            } ));
            setActiveSection("welcome-section");
        }else{
            setSignoutError(data.error);        
        }
        // async function check (){
        //     await checkSession()
        // }check()
    }


    return(
    <>
    {/* User Avatar section */}
    <div onClick={toggleAccountOptionsModal} className="avatar-box" id="user-account">
        {userData["is_authenticated"] && 
            <Avatar username={userData["username"]} avatar={userData["avatar"]}/> }
    </div>
    {accountOptionsModal &&
        <div className="account-options-box">
            <div onClick={signout} className="signout-link">Sign-Out</div>
        </div>
    }
    {signoutError &&
        <div className="account-error">
            <div>{signoutError}</div>
        </div>
    }

    </>
    )
}