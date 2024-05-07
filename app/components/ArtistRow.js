const ArtistRow = ({artist, index}) => {
    return (
        <a href={artist.external_urls.spotify}>
            <div className="flex flex-row items-center justify-between p-4 hover:bg-base-300 rounded-lg transition-all">
                <div className="flex flex-row items-center">
                    <p className="text-lg font-bold">{index + 1}</p>
                    <img className="rounded-lg w-48 h-48 ml-4" src={artist.images[0].url} alt={artist.name} />
                </div>
                <p className="ml-4 font-bold">{artist.name}</p>
            </div>
        </a>
    )
}

export default ArtistRow;