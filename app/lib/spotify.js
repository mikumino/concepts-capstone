import { getSession } from "next-auth/react";

async function fetcher(url) {
    const session = await getSession();
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${session.user.accessToken}`
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export async function getTopItems(type, time_range, limit, offset) {
    const data = await fetcher(`https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=${limit}&offset=${offset}`);
    return data.items;
}

export async function getMe() {
    const data = await fetcher('https://api.spotify.com/v1/me');
    return data;
}
