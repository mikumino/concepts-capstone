import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorizationUrl: "https://accounts.spotify.com/authorize",
            profileUrl: "https://api.spotify.com/v1/me",
            scopes: ["user-read-email", "user-read-private"],
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.id = account.id;
                token.accessToken = account.accessToken;
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
