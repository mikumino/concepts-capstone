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
        <>
            <h2 className="text-2xl font-bold">Top Artists</h2>
            <div>
                {topArtists.map((artist, index) => (
                    <ArtistRow key={artist.id} artist={artist} index={index} />
                ))}
            </div>

             <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
        </>
    )
}

export default ProfilePage;