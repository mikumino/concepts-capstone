import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorizationUrl: "https://accounts.spotify.com/authorize",
            profileUrl: "https://api.spotify.com/v1/me",
            protection: "pkce",
            authorization: {params: {scope: "user-read-email user-read-private user-follow-read user-library-read playlist-read-private user-top-read"}},
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.id = account.id;
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
});

export { handler as GET, handler as POST }
