'use client';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getTopItems, getMe } from "@/app/lib/spotify";
import TopItem from "@/app/components/TopItem";
import { motion } from "framer-motion";
import ListSkeleton from "@/app/components/ListSkeleton";
import Link from 'next/link';
import ArtistRow from '@/app/components/ArtistRow';

const Overview = () => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hiddenLeft: { opacity: 0, x: -20 },
        visibleLeft: { opacity: 1, x: 0 },
    };

    const [me, setMe] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('long_term');
    const [loadingItems, setLoadingItems] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [currentArtistIndex, setCurrentArtistIndex] = useState(0)

    const handleLogout = async () => {
        await signOut({ callbackUrl: `${window.location.origin}` })
    }

    useEffect(() => {
        const fetchInfo = async () => {
            setMe(await getMe());
            const topTracks = await getTopItems('tracks', [timeRange], 5, 0);
            const topArtists = await getTopItems('artists', [timeRange], 5, 0);
            setTopTracks(topTracks);
            setTopArtists(topArtists)
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
        <div className='flex flex-col'>
            <Link className='w-fit' href="/profile/artists">
                <motion.h2 initial="hiddenLeft" animate="visibleLeft" variants={variants} transition={{ duration: 0.25 }} className="text-2xl font-bold hover:text-green-400 transition-colors w-fit mb-4">Top Artists</motion.h2>
            </Link>
            <motion.div key={loadingItems} initial="hidden" animate="visible" className='carousel gap-3 mb-12' variants={variants} transition={{ duration: 0.25 }}>
                {topArtists.map((artist, index) => (
                   <TopItem key={artist.id} item={artist} index={index} type='artist' />
                ))}
            </motion.div>
            <Link className='w-fit' href="/profile/songs">
                <motion.h2 initial="hiddenLeft" animate="visibleLeft" variants={variants} transition={{ duration: 0.25 }} className="text-2xl font-bold hover:text-green-400 transition-colors w-fit mb-4">Top Songs</motion.h2>
            </Link>
            <motion.div key={loadingItems} initial="hidden" animate="visible" className='carousel gap-3' variants={variants} transition={{ duration: 0.25 }}>
                {topTracks.map((track, index) => (
                    <TopItem key={track.id} item={track} index={index} type='track' />
                ))}
            </motion.div>
            <button className="btn btn-outline mt-8 w-fit" onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Overview;