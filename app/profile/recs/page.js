'use client';

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getArtists, getRecs } from "@/app/lib/spotify";
import SongRow from "@/app/components/SongRow";
import { motion } from "framer-motion";
import ListSkeleton from "@/app/components/ListSkeleton";


const RecPage = () => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hiddenLeft: { opacity: 0, x: -20 },
    visibleLeft: { opacity: 1, x: 0 },
  };

  const [me, setMe] = useState(null);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState('hiphop');
  const [loadingItems, setLoadingItems] = useState(null);


  const handleLogout = async () => {
    await signOut({ callbackUrl: `${window.location.origin}` })
  }


  useEffect(() => {
    const handleGetRecs = async () => {
      let data = await getArtists('artists', 2);
      let items = data['items'];
      let ids = ""
      items.forEach(element => {
        ids += element['id'] + "%2C";
      });
      ids = ids.slice(0, -3)
      console.log(ids)
      setGenre
      let recs = await getRecs(ids, [genre], 10)
      setRecs(recs)
      setLoadingItems(!loadingItems);
      setLoading(false);
    };
    handleGetRecs();
  }, [genre]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <ListSkeleton />
      </div>
    )
  }
  // const handleGetRecs = async () => {
  //     let data = await getArtists('artists',2);
  //     let items = data['items'];
  //     let ids = ""
  //     items.forEach(element => {
  //         ids += element['id']+"%2C";
  //     });
  //     ids = ids.slice(0,-3)
  //     console.log(ids)
  //     let recs = await getRecs(ids,'hiphop',10)
  //     setRecs(recs)
  // };

  return (
    <div>
      <div className="flex flex-row space-x-[489px]">
        <motion.h2 initial="hiddenLeft" animate="visibleLeft" variants={variants} transition={{ duration: 0.25 }} className="text-2xl font-bold">Song Recs</motion.h2>
        <motion.h2 initial="hiddenLeft" animate="visibleLeft" variants={variants} transition={{ duration: 0.25 }} className="text-2xl font-bold">
          <select defaultValue="" onChange={e => setGenre(e.target.value)} className="select select-bordered border-b-2 border-[#423737] w-full max-w-sm">
            <option value="hiphop" >Hiphop</option>
            <option value="edm" >Edm</option>
            <option value="pop" >Pop</option>
          </select>
        </motion.h2>
      </div>        
      <motion.div key={loadingItems} initial="hidden" animate="visible" variants={variants} transition={{ duration: 0.25 }}>
        {/* {console.log(recs)} */}
        {recs.map((song, index) => (
          <SongRow key={song.id} song={song} index={index} />
        ))}
      </motion.div>
      <button className="btn btn-outline" onClick={handleLogout}>Log out</button>
    </div>
  );

}

export default RecPage;