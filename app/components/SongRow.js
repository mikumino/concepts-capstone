const SongRow = ({song, index}) => {
    if (!song) return null;
    return (
        <a href={song.external_urls.spotify}>
            <div className="flex flex-row items-center justify-between p-4 hover:bg-base-300 rounded-lg transition-all">
                <div className="flex flex-row items-center">
                    <p className="text-lg font-bold">{index + 1}</p>
                    <img className="rounded-lg w-48 h-48 ml-4" src={song.album.images[0].url} alt={song.name} />
                </div>
                <div className="flex flex-col text-right">
                    <p className="ml-4 font-bold max-w-sm">{song.name}</p>
                    <p className="ml-4 text-gray-400">{song.artists[0].name}</p>
                </div>
            </div>
        </a>
    )
}

export default SongRow;