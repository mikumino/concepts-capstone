'use client';

import AnimatedLink from './AnimatedLink'
import { usePathname } from 'next/navigation'; 

export default function Navbar() {

    return (
        <div className="navbar border-b-2 border-[#423737]">
            <div className="flex-1">
                <AnimatedLink href="/profile" active={usePathname() === '/profile'}>Overview</AnimatedLink>
                <AnimatedLink href="/profile/artists" active={usePathname() === '/profile/artists'}>Artists</AnimatedLink>
                <AnimatedLink href="/profile/songs" active={usePathname() === '/profile/songs'}>Songs</AnimatedLink>
                <AnimatedLink href="/profile/genres" active={usePathname() === '/profile/genres'}>Genres</AnimatedLink>
            </div>
        </div>
    )
  }