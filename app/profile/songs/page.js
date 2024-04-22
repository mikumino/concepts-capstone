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
                <div className="flex flex-row justify-center items-center">
                    <div className="skeleton w-40 h-40 rounded-full mr-6"></div>
                    <div className="skeleton w-40 h-8"></div>
                </div>
                <Navbar/>
                <div className="mb-6 pt-4">
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
                <h2 className="text-2xl font-bold">Top Songs</h2>
                <div>
                    {console.log(topTracks)}
                    {topTracks.map((song, index) => (
                        <SongRow key={song.id} song={song} index={index} />
                    ))}
                </div>
            </div>
            <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default SongPage;