'use client';

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getTopItems, getMe } from "@/app/lib/spotify";
import ArtistRow from "@/app/components/ArtistRow";
import { motion } from "framer-motion";
import ListSkeleton from "@/app/components/ListSkeleton";

const ArtistPage = () => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0},
        hiddenLeft: { opacity: 0, x: -20 },
        visibleLeft: { opacity: 1, x: 0},
    };

    const [me, setMe] = useState(null);
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('long_term');
    const [loadingItems, setLoadingItems] = useState(null);

    const handleLogout = async () => {
        await signOut({ callbackUrl: `${window.location.origin}` })
    }
    
    useEffect(() => {
        const fetchInfo = async () => {
            setMe(await getMe());
            const topArtists = await getTopItems('artists', [timeRange], 10, 0);
            setTopArtists(topArtists);
            setLoadingItems(!loadingItems);
            setLoading(false);
        }
        fetchInfo();  
    }, [timeRange]);
    
    if (loading) {
        return (
            <div className="max-w-3xl mx-auto">
                <ListSkeleton />
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-row space-x-[483px]">
                <motion.h2 initial="hiddenLeft" animate="visibleLeft" variants={variants} transition={{duration: 0.25}} className="text-2xl font-bold">Top Artists</motion.h2>
                <motion.h2 initial="hiddenLeft" animate="visibleLeft" variants={variants} transition={{duration: 0.25}} className="text-2xl font-bold">
                    <select defaultValue="long_term" onChange={e => setTimeRange(e.target.value)} className="select select-bordered border-b-2 border-[#423737] w-full max-w-sm">
                        <option value="short_term" >Last 30 days</option>
                        <option value="medium_term" >Last 180 days</option>
                        <option value="long_term" >Last 365 days</option>
                    </select>
                </motion.h2>
            </div>
            <motion.div key={loadingItems} initial="hidden" animate="visible" variants={variants} transition={{duration: 0.25}}>
                {topArtists.map((artist, index) => (
                    <ArtistRow key={artist.id} artist={artist} index={index} />
                ))}
            </motion.div>
            <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
        </>
    )
}

export default ArtistPage;
