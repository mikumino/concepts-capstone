'use client';

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getUserInfo() {
            const session = await getSession();
            if (session) {
                setUserData(session.user);
                console.log(session);
            } 
        }
        getUserInfo();
    }, []);
    
    if (!userData) {
        return <div><span className="loading loading-dots text-primary"></span></div>;
    }
    
    const { email, name, picture } = userData;

    return (
        <div>
            <img src={picture} alt={name} />
            <h1>{name}</h1>
            <p>{email}</p>
        </div>
    )
}

export default ProfilePage;