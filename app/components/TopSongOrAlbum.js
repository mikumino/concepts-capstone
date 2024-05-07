import '../profile/overview/overview.css'
import { motion, AnimatePresence } from 'framer-motion';
const TopSongOrAlbum = ({ topSongOrAlbum, index, isSong }) => {
    if (!topSongOrAlbum) return null;
    return (
        <div className='top-song-or-album'>
            <div className="image">
                <img className="" src={isSong ? topSongOrAlbum.album.images[0].url : topSongOrAlbum.images[0].url} alt={topSongOrAlbum.name} />
            </div>
            <p className="title">#{index + 1} {topSongOrAlbum.name}</p>
        </div>
    )
}

export default TopSongOrAlbum;