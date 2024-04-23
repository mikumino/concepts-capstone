'use client';

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getTopItems, getMe } from "@/app/lib/spotify";
import SongRow from "@/app/components/SongRow";
import Navbar from "@/app/components/Navbar";

const SongPage = () => {
    const [me, setMe] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await signOut({ callbackUrl: `${window.location.origin}` })
    }
    
    
    useEffect(() => {
        const fetchInfo = async () => {
            setMe(await getMe());
            const topTracks = await getTopItems('tracks', 'long_term', 10, 0);
            setTopTracks(topTracks);
            setLoading(false);
        }
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
            <h2 className="text-2xl font-bold">Top Songs</h2>
            <div>
                {console.log(topTracks)}
                {topTracks.map((song, index) => (
                    <SongRow key={song.id} song={song} index={index} />
                ))}
            </div>
            <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
        </>
    )
}

export default SongPage;