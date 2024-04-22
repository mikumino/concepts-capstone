import Link from 'next/link'
 
export default function Navbar() {
    return (
        <div className="navbar border-b-2 border-[#423737]">
            <div className="flex-1">
                <Link href="/profile" className="btn btn-ghost text-xl">Overview</Link>
                <Link href="/profile/artists" className="btn btn-ghost text-xl">Artists</Link>
                <Link href="/profile/songs" className="btn btn-ghost text-xl">Songs</Link>
                <Link href="/profile/albums" className="btn btn-ghost text-xl">Albums</Link>
            </div>
        </div>
    )
  }