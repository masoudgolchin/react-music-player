export const HandleButtonsVisibility = (
  songs,
  currentSong,
  forwardRef,
  backRef
) => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  if (currentIndex === songs.length - 1) {
    forwardRef.current.classList.add("disabled");
  } else if (currentIndex <= 0) {
    backRef.current.classList.add("disabled");
  } else {
    backRef.current.classList.remove("disabled");
    forwardRef.current.classList.remove("disabled");
  }
};
