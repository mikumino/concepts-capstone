import { getSession } from "next-auth/react";

async function fetcher(url) {
    const session = await getSession();
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${session.user.accessToken}`
            
        },
      
    });
    
    if (!res.ok) {
        if (res.status === 429) {
            // Calculate the time until the client can retry the request (in seconds)
            const retryAfterSeconds = parseInt(res.headers.get('Retry-After'));
    
            // Throw an error indicating the rate limit and retry after time
            throw new Error(`Too many requests. Retry after ${retryAfterSeconds} seconds.`);
        }
        else
            throw new Error('Failed to fetch data');
    }

    return res.json();
}

export async function getTopItems(type, time_range, limit, offset) {
    const data = await fetcher(`https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=${limit}&offset=${offset}`);
    return data.items;
}

export async function getBasicGenres() {
    const data = await fetcher('https://api.spotify.com/v1/recommendations/available-genre-seeds');
export async function getRecs(id,genre,limit)
{
    // const data = await fetcher('https://api.spotify.com/v1/recommendations?limit=1&seed_artists=1RyvyyTE3xzB2ZywiAwp0i%2C3TVXtAsR1Inumwj472S9r4%2C1URnnhqYAYcrqrcwql10ft%2C0xOeVMOz2fVg5BJY3N6akT&seed_genres=classical');
    const data = await fetcher(`https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${id}&seed_genres=${genre}`);
    return data.tracks;
}

export async function getArtists(type,limit)
{
    const data = await fetcher(`https://api.spotify.com/v1/me/top/${type}?limit=${limit}`)
    return data;
}

export async function getMe() {
    const data = await fetcher('https://api.spotify.com/v1/me');
    return data;
}