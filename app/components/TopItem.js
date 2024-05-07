import '../profile/overview/overview.css'
import { motion, AnimatePresence } from 'framer-motion';
const TopItem = ({ item, index, type }) => {
    return (
        <a href={item.external_urls.spotify}>
            <div className='flex flex-col flex-shrink-0 carousel-item w-64 group '>
                <div className='overflow-hidden rounded-lg'>
                    <img className='rounded-lg group-hover:scale-105 transition-all' src={type == 'artist' ? item.images[0].url : item.album.images[0].url} alt={item.name} />
                </div>
                <div className='flex flex-row items-center mt-4'>
                    <p className='text-lg font-bold'>{index + 1}.</p>
                    <p className='ml-4 text-lg font-bold group-hover:text-primary transition-colors'>{item.name}</p>
                </div>
                <p className='text-sm text-gray-400 mt-1'>{type == 'artist' ? '' : item.artists[0].name}</p>
            </div>
        </a>
    )
}

export default TopItem;