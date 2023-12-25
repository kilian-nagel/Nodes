import React, { useEffect, useState } from 'react';

export const Flash = () => {
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(()=>{
        const data = localStorage.getItem("flash");
        localStorage.removeItem("flash");

        if(data === null) return;

        setType("success");
        setMessage(data);
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