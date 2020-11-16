import React from "react";

function LibraryItem({
  active,
  song,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
}) {
  const selectSongHandler = async () => {
    await setCurrentSong(song);
    if (isPlaying) {
      let promise = audioRef.current.play();
      if(promise !== undefined) {
        promise.then(()=>{
          console.log('play')
        }).catch((e)=>{console.log("err")})
      }
    }
  };
  return (
    <div
      className={`library-item ${active ? "active" : ""}`}
      onClick={selectSongHandler}
    >
      <img src={song.cover} alt="cover" />
      <div className="library-item-info">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}
export default LibraryItem;
