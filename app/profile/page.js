'use client';

// this whole thing needs refactoring but i'm just trying to get
// the data to show up for now (it does now!)
// i'll get to styling and refactoring later
// -alan

import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [me, setMe] = useState(null);
    const [topArtists, setTopArtists] = useState([]);

    const handleLogout = async () => {
        await signOut({ callbackUrl: `${window.location.origin}` })
    }

    async function getTopTracks() {
        const session = await getSession();
        if (session) {
            const response = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term", {
                headers: {
                    Authorization: `Bearer ${session.user.accessToken}`
                }
            });
            const data = await response.json();
            setTopArtists(data.items);
        }
    }

    async function getMe() {
        const session = await getSession();
        if (session) {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${session.user.accessToken}`
                }
            });
            const data = await response.json();
            console.log(data);
            setMe(data);
        }
    
    }

    useEffect(() => {
        async function getUserInfo() {
            const session = await getSession();
            if (session) {
                setUserData(session.user);
                console.log(session);
            } 
        }
        getUserInfo();

        getMe();
        getTopTracks();
        
    }, []);
    
    if (!me) {
        return <div><span className="loading loading-dots text-primary"></span></div>;
    }

    return (
        <div>
            <img src={me.images[0].url} alt={me.display_name} />
            <h1>{me.display_name}</h1>
            <p>Logged in with: {me.email}</p>
            <h2 className="text-2xl font-bold">Top Artists</h2>
            {
                topArtists.map((artist) => {
                    return (
                        <div key={artist.id}>
                            <p>{artist.name}</p>
                            <img src={artist.images[0].url} alt={artist.name} />
                        </div>
                    )
                })
            }
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default ProfilePage;