const ArtistRow = ({artist, index}) => {
    return (
        <div className="flex flex-row items-center justify-between p-4">
            <div className="flex flex-row items-center">
                <p className="text-lg font-bold">{index + 1}</p>
                <img className="rounded-lg w-48 h-48 ml-4" src={artist.images[0].url} alt={artist.name} />
            </div>
            <p className="ml-4">{artist.name}</p>
        </div>
    )
}

export default ArtistRow;