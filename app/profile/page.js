'use client';

// this whole thing needs refactoring but i'm just trying to get
// the data to show up for now (it does now!)
// i'll get to styling and refactoring later
// -alan

import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import ArtistRow from "../components/ArtistRow";

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
        <div className="max-w-3xl my-8 mx-auto">
            <div className="flex flex-row justify-center items-center">
                <img className="rounded-full w-40 mr-6" src={me.images[1].url} alt={me.display_name} />
                <h1 className="text-4xl font-bold">{me.display_name}</h1>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Top Artists</h2>
                <div>
                    {
                        topArtists.map((artist) => {
                            return (
                                <ArtistRow index={topArtists.indexOf(artist)} artist={artist} key={artist.id} />
                            )
                        })
                    }
                </div>
            </div>
            <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default ProfilePage;