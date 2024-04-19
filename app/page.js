import LoginButton from "./components/LoginButton";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-6">Stats for Spotify</h1>
        <LoginButton />
    </div>
  );
}
