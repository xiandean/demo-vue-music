export default {
  singer: state => state.singer,
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  playlist: state => state.playlist,
  sequenceList: state => state.sequenceList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  currentSong: (state) => {
    return state.playlist[state.currentIndex] || {}
  },

  disc: state => state.disc,

  topList: state => state.topList,

  searchHistory: state => state.searchHistory,

  playHistory: state => state.playHistory,

  favoriteList: state => state.favoriteList
}
