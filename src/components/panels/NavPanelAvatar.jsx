
/*
    Parent: NavPanel
*/

import { useState, useEffect, useRef } from "react";
import {useProfile} from "@providers/ProfileContext";
import HelpLink     from "@navLinks/HelpLink.jsx";
import SignoutLink  from "@navLinks/SignoutLink";
import ResetLink    from "@navLinks/ResetLink";

function Avatar({username, avatar}){
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

export default function NavPanelAvatar({
    userData,
    setUserData,
    setActiveSection, 
}){ 
    const {profileData, setProfileData} = useProfile();
    const [isShowModal, setIsShowModal] = useState(false);
    const [signoutError, setSignoutError] = useState("");
    const modalRef = useRef(null); // ref for the modal

    // toggle account options modal
    function toggleModal(e){
        e.stopPropagation();
        setIsShowModal(!isShowModal);
    }

    // Handle clicks outside the modal
    useEffect(()=>{
        function handleClickOutside(event){
            if(modalRef.current && !modalRef.current.contains(event.target)){
                setIsShowModal(false); // CLose modal if click outside
            }
        };

        // Add event listener when modal id shown
        if (isShowModal){
            document.addEventListener("click", handleClickOutside)
        };

        // Clean up event listener
        return () => {
            document.removeEventListener('click', handleClickOutside)
        };

    }, [isShowModal]); // Run Effect when isShowModal changes

    async function signout(e){
        console.log("signout INVOKED")
        e.preventDefault();

        const server = userData.server;
        const signout = server+"signout/";
        const response = await fetch(signout, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();
        
        if(response.ok){
            setUserData( (prev)=> ({...prev, 
                ["is_authenticated"]:data.is_authenticated,
                ["username"]: "Doodler"
            } ));
            setProfileData((prev)=>({...prev,
                ["banner"]: null,
                ["avatar"]: null,
                ["story"]: null,
                ["caption"]: null,
                ["website"]: null
            }))
            setActiveSection("welcome-section");
        }else{
            setSignoutError(data.error);        
        }
    }

    function loadHelpSection(e){
        e.stopPropagation();
        setIsShowModal(false);
        setActiveSection("help-section");
    }

    function resetPassword(e){
        e.stopPropagation();
        setIsShowModal(false);
        setActiveSection("reset-section")
    }

    return(
    <>
    {/* User Avatar section */}
    <div onClick={toggleModal} className="nav-modal-anchor"> {/* Modal attaches to this */}
        <div  className="avatar-box">
            {userData["is_authenticated"] && 
                <Avatar 
                    username={userData.username} 
                    avatar={profileData.avatar}/> }
        </div>

        {isShowModal &&
            <div className="avatar-modal-box" ref={modalRef}>
                <div className="modal-links-box">
                    <div onClick={loadHelpSection}><HelpLink /></div>
                    <div onClick={resetPassword}><ResetLink/></div>
                    <div onClick={signout}><SignoutLink/></div>
                </div>
            </div>
        }

    </div>
    {signoutError &&
        <div className="account-error">
            <div>{signoutError}</div>
        </div>
    }

    </>
    )
}