'use client';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getTopItems, getMe } from "@/app/lib/spotify";
import SongRow from "@/app/components/SongRow";
import TopSongOrAlbum from "@/app/components/TopSongOrAlbum";
import { motion } from "framer-motion";
import ListSkeleton from "@/app/components/ListSkeleton";
import css from "./overview.css";

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

    const incrementSongIndex = () => {
        console.log(currentSongIndex)
        if (currentSongIndex < 4) {
            let incrementedVal = currentSongIndex + 1
            setCurrentSongIndex(incrementedVal)
        }
    }

    const decrementSongIndex = () => {
        console.log(currentSongIndex)
        if (currentSongIndex > 0) {
            let decrementedVal = currentSongIndex - 1
            setCurrentSongIndex(decrementedVal)
        }
    }

    const incrementArtistIndex = () => {
        console.log(currentSongIndex)
        if (currentArtistIndex < 4) {
            let incrementedVal = currentArtistIndex + 1
            setCurrentArtistIndex(incrementedVal)
        }
    }

    const decrementArtistIndex = () => {
        console.log(currentSongIndex)
        if (currentArtistIndex > 0) {
            let decrementedVal = currentArtistIndex - 1
            setCurrentArtistIndex(decrementedVal)
        }
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
        <div className='overview-page'>
            <div className="top-header">
                <motion.h2 className="title text-2xl font-bold" initial="hiddenLeft" animate="visibleLeft" variants={variants} transition={{ duration: 0.25 }}>Top 5 Songs</motion.h2>
            </div>
            <div className="songs">
                <ChevronLeftIcon className='arrows' onClick={decrementSongIndex} />
                <TopSongOrAlbum topSongOrAlbum={topTracks[currentSongIndex]} index={currentSongIndex} isSong={true} />
                <ChevronRightIcon className='arrows' onClick={incrementSongIndex} />
            </div>
            <div className="bottom-header">
                <motion.h2 className="title text-2xl font-bold" initial="hiddenLeft" animate="visibleLeft" variants={variants} transition={{ duration: 0.25 }}>Top 5 Artists</motion.h2>
            </div>
            <div className="songs">
                <ChevronLeftIcon className='arrows' onClick={decrementArtistIndex} />
                <TopSongOrAlbum topSongOrAlbum={topArtists[currentArtistIndex]} index={currentArtistIndex} isSong={false} />
                <ChevronRightIcon className='arrows' onClick={incrementArtistIndex} />
            </div>
            <button className="btn btn-outline logout" onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Overview;