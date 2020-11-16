import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
function Player({
  songs,
  songInfo,
  setSongInfo,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
}) {
  //util
  function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    min = min >= 10 ? min : "0" + min;
    let sec = Math.floor(seconds % 60);
    sec = sec >= 10 ? sec : "0" + sec;
    return min + ":" + sec;
  }
  //event handler
  const playHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const skipHandler = async(skip) => {
    const prevIndex = songs.findIndex((song) => song === currentSong);
    let nextIndex;
    if (skip === "back") {
      nextIndex = prevIndex === 0? songs.length -1: prevIndex - 1
    } else if (skip === "forward") {
      nextIndex = prevIndex === songs.length -1? 0: prevIndex + 1
    }
    await setCurrentSong(songs[nextIndex]);
    if (isPlaying) {
      let promise = audioRef.current.play();
      if(promise !== undefined) {
        promise.then(()=>{
          console.log('play')
        }).catch((e)=>{console.log("err")})
      }
    }
  };

  function dragHandler(e) {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      current: e.target.value,
    });
  }
  return (
    <div className="player">
      <div className="time-ctrl">
        <p>{formatTime(songInfo.current)}</p>
        <input
          min="0"
          max={songInfo.duration || 0}
          value={songInfo.current}
          type="range"
          onChange={dragHandler}
        />
        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="play-ctrl">
        <FontAwesomeIcon
          onClick={() => skipHandler("back")}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={()=>skipHandler('forward')}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
    </div>
  );
}
export default Player;
