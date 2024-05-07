const SongRow = ({song, index}) => {
    if (!song) return null;
    return (
        <div className="flex flex-row items-center justify-between p-4">
            <div className="flex flex-row items-center">
                <p className="text-lg font-bold">{index + 1}</p>
                <img className="rounded-lg w-48 h-48 ml-4" src={song.album.images[0].url} alt={song.name} />
            </div>
            <div className="flex flex-col text-right">
                <p className="ml-4 max-w-sm">{song.name}</p>
                <p className="ml-4 text-gray-400">{song.artists[0].name}</p>
            </div>
        </div>
    )
}

export default SongRow;