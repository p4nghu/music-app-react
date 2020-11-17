import React from "react";
import LibraryItem from "./LibraryItem";

function Library({
  songs,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  activeLibrary
}) {
  return (
    <div className={`library ${activeLibrary? "active": ""}`}>
      <h2>Library</h2>
      <div className="library-items">
        {songs.map((song) => (
          <LibraryItem
            active={song.id === currentSong.id}
            song={song}
            key={song.id}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
