'use client';

import { getMe } from "../lib/spotify"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"

export default function ProfileLayout({ children }) {
    const [me, setMe] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchInfo = async () => {
        setMe(await getMe())
        setLoading(false)
    }

    useEffect(() => {
        fetchInfo()
    }, [])

    if (loading) {
        return (
            <div className="max-w-3xl my-8 mx-auto">
                <div className="flex flex-row justify-center items-center">
                    <div className="skeleton w-40 h-40 rounded-full mr-6"></div>
                    <div className="skeleton w-40 h-8"></div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="max-w-3xl my-8 mx-auto">
            <div className="flex flex-row justify-center items-center">
                <img className="rounded-full w-40 mr-6" src={me.images[1].url} alt={me.display_name} />
                <h1 className="text-4xl font-bold">{me.display_name}</h1>
            </div>
            <Navbar />
            <div className="mb-6 pt-4">
                {children}
            </div>
        </div>
    )
}