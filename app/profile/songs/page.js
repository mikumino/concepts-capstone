'use client';

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getTopItems, getMe } from "@/app/lib/spotify";
import SongRow from "@/app/components/SongRow";
import { motion } from "framer-motion";

const SongPage = () => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0},
        hiddenLeft: { opacity: 0, x: -20 },
        visibleLeft: { opacity: 1, x: 0},
    };

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
            <motion.h2 initial="hiddenLeft" animate="visibleLeft" variants={variants} transition={{duration: 0.25}} className="text-2xl font-bold">Top Songs</motion.h2>
            <motion.div  initial="hidden" animate="visible" variants={variants} transition={{duration: 0.25}}>
                {console.log(topTracks)}
                {topTracks.map((song, index) => (
                    <SongRow key={song.id} song={song} index={index} />
                ))}
            </motion.div>
            <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
        </>
    )
}

export default SongPage;