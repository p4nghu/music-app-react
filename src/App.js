import React, { useState, useRef } from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./util";
import Library from "./components/Library";
import Nav from './components/Nav'
function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({ current: 0, duration: 0 });
  const [activeLibrary, setActiveLibrary] = useState(false)

  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    setSongInfo({
      ...songInfo,
      current: e.target.currentTime,
      duration: e.target.duration || 0,
    });
  };

  const endedHandler = async() => {
    const prevIndex = songs.indexOf(currentSong);
    let nextIndex = prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
    await setCurrentSong(songs[nextIndex])
    audioRef.current.play()
  };

  return (
    <div className={`app ${activeLibrary?"active": ""}`}>
      <Nav
      activeLibrary={activeLibrary}
      setActiveLibrary={setActiveLibrary}
      />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        activeLibrary={activeLibrary}
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={endedHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}
export default App;
