const ListSkeleton = () => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-[500px]" >
                <div className="skeleton w-40 h-8 mb-2" />
                <div className="skeleton w-56 h-8 mb-2" />
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <p className="skeleton w-8 h-8" />
                    <div className="skeleton rounded-lg w-48 h-48 ml-4" />
                </div>
                <div className="skeleton w-40 h-8" />
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <p className="skeleton w-8 h-8" />
                    <div className="skeleton rounded-lg w-48 h-48 ml-4" />
                </div>
                <div className="skeleton w-40 h-8" />
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <p className="skeleton w-8 h-8" />
                    <div className="skeleton rounded-lg w-48 h-48 ml-4" />
                </div>
                <div className="skeleton w-40 h-8" />
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <p className="skeleton w-8 h-8" />
                    <div className="skeleton rounded-lg w-48 h-48 ml-4" />
                </div>
                <div className="skeleton w-40 h-8" />
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <p className="skeleton w-8 h-8" />
                    <div className="skeleton rounded-lg w-48 h-48 ml-4" />
                </div>
                <div className="skeleton w-40 h-8" />
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <p className="skeleton w-8 h-8" />
                    <div className="skeleton rounded-lg w-48 h-48 ml-4" />
                </div>
                <div className="skeleton w-40 h-8" />
            </div>
        </div>
    )
}

export default ListSkeleton;