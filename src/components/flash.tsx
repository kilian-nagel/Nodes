import FlashMessageHandler from '@/lib/flashMessages/flashMessageHandler';
import React, { useEffect, useState } from 'react';

export const Flash = () => {
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(()=>{
        const flashMessage = FlashMessageHandler.getFlashMessage();
        FlashMessageHandler.clearFlashMessage();

        if(flashMessage === null) return;

        setType(flashMessage.getType());
        setMessage(flashMessage.getMessage());
        setVisibility(true);

        setTimeout(()=>{
            setVisibility(false);
        },4000);
    },[]);   

    return (
        visibility && <div className={`alert alert-${type}`}>
            <span className="close"><strong>X</strong></span>
            <p>{message}</p>
        </div>
    )
}