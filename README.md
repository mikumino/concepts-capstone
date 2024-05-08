# Spotify Stats App

This is a simple web app that uses the Spotify API to display user's top artists, tracks, and genres.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- Spotify API key
- Spotify API secret

### Installation

1. Clone the repo
    ```bash
    git clone https://github.com/mikumino/memory-allocation-simulator.git
    ```
2. Install NPM packages
    ```bash
    npm install
    ```
3. Create a `.env.local` file in the root directory and add the following:
    ```env
    SPOTIFY_CLIENT_ID=YOUR_ID
    SPOTIFY_CLIENT_SECRET=YOUR_SECRET
    NEXTAUTH_URL=YOUR_URL
    ```
4. Ensure the Spotify API redirect URI is set to `http://YOUR_URL/api/auth/callback/spotify` in the Spotify Developer Dashboard
5. Run the development server
    ```bash
    npm run dev
    ```