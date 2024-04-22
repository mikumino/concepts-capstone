'use client';

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getTopItems, getMe } from "../lib/spotify";
import ArtistRow from "../components/ArtistRow";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
    const [me, setMe] = useState(null);
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await signOut({ callbackUrl: `${window.location.origin}` })
    }
    
    const fetchInfo = async () => {
        setMe(await getMe());
        setTopArtists(await getTopItems('artists', 'long_term', 10, 0));
        setLoading(false);
    }

    useEffect(() => {
        fetchInfo();        
    }, []);
    
    if (loading) {
        return (
            <div className="max-w-3xl my-8 mx-auto">
                <div className="flex flex-row justify-center items-center">
                    <div className="skeleton w-40 h-40 rounded-full mr-6"></div>
                    <div className="skeleton w-40 h-8"></div>
                </div>
                <div className="mb-6">
                    <div>
                        <div className="skeleton w-40 h-8 mb-6"></div>
                        <div className="skeleton w-full h-16 mb-4"></div>
                        <div className="skeleton w-full h-16 mb-4"></div>
                        <div className="skeleton w-full h-16 mb-4"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl my-8 mx-auto">
            <div className="flex flex-row justify-center items-center">
                <img className="rounded-full w-40 mr-6" src={me.images[1].url} alt={me.display_name} />
                <h1 className="text-4xl font-bold">{me.display_name}</h1>
            </div>
            <Navbar/>
            <div className="mb-6 pt-4">
                <h2 className="text-2xl font-bold">Top Artists</h2>
                <div>
                    {topArtists.map((artist, index) => (
                        <ArtistRow key={artist.id} artist={artist} index={index} />
                    ))}
                </div>
            </div>
            <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default ProfilePage;