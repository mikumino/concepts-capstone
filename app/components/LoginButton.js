'use client';

import { signIn } from 'next-auth/react';
import { FaSpotify } from "react-icons/fa";



const LoginButton = () => {
    const handleLogin = async () => {
        await signIn("spotify", { callbackUrl: `${window.location.origin}/profile` } );
    }

    return (
        <button className='btn btn-primary' onClick={handleLogin}><FaSpotify className='text-xl' /> Login with Spotify</button>
    );
}

export default LoginButton; 