
import { useState, useEffect } from 'react';
import {checkCookie} from "@modules/manageApi";
import FormError from "@forms/FormError";

export default function ContactForm({
    userData,
    setActiveSection
}){
    console.log(`userData = ${userData}`)
    const [formError, setFormError] = useState("");
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const server = userData.server;
    console.log(`server = ${server}`)
    const csrfToken = checkCookie(server);
    console.log('csrftoken', csrfToken)

    async function handleSubmit(e){
        e.preventDefault();

        // build formData to pass to API
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message)



        let path = `${server}contact_form/`
        console.log(`path = ${path}`)
        // Sendin  g the Contact Form data to Django backend
        // Fetch
        const response =  await fetch(path, {
            method: 'POST',
            credentials: 'include', // Ensure Cookies are sent for CORS validation
            headers: {
                // 'Content-Type': 'application/json', The fetch API will automatically set Content-Type to multipart/form-data with a boundary, which is required for FormData
                'X-CSRFToken': csrfToken,  // Attach the CSRF token in headers
            },
            body: formData
        });
        
        const data = await response.json();

        if (response.ok){
            console.log("good", data.message)
            // display confirmation message
            // delay 2000ms
            // close form
        }else{
            console.log("bad ", data.message)
            // display error message
        }

        setFormError(data.message)
        setTimeout(() => {
            setFormError('')
            setActiveSection("welcome-section")
        }, 3500)

    
    }

    return (
        <div>
            <form 
                onSubmit={handleSubmit} 
                className="contact-form" 
                id="contact-form-id" >

                <input 
                    onChange={e => setFullname(e.target.value)}
                    autoFocus
                    className="contact-form-input"
                    type="text"
                    name = 'fullname'
                    placeholder="Name"
                    defaultalue=''
                />

                <input 
                    onChange={e => setEmail(e.target.value)}
                    className="contact-form-input"
                    type="text"
                    name="email"
                    placeholder="email"
                    defaultValue=''
                />
                <input 
                    onChange={e => setSubject(e.target.value)}
                    className="contact-form-input"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    defaultValue=''
                />
                <textarea 
                    onChange={e => setMessage(e.target.value)}
                    className="contact-form-input contact-form-message"
                    type="text"
                    name="message"
                    placeholder="message"
                    defaultValue=''
                />

                <button type="submit" className="zine-cta text-container center" id="get-drawing">
                    <div className="cta-button fs4 text-link" >
                            Send!
                    </div>
                </button>
                
            </form>
            {formError && (
                <div className='contact-form-message-container'>
                    <div className="contact-form-response">
                        <FormError formError={formError} />
                    </div>
                </div>

            )}
        </div>
    );
};




































