import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

const findIndex = (list, song) => {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export default {
  selectPlay: ({commit, state}, {list, index}) => {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
      let randomList = shuffle(list)
      commit(types.SET_PLAYLIST, randomList)
      index = findIndex(randomList, list[index])
    } else {
      commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  randomPlay: ({commit}, {list}) => {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },

  insertSong: ({commit, state}, song) => {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    // 记录当前歌曲
    let currentSong = playlist[currentIndex]

    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)

    // 因为是待插入歌曲，所以索引+1
    currentIndex++

    // 插入这首个到当前所以位置
    playlist.splice(currentIndex, 0, song)

    // 如果已经包含了这首歌
    if (fpIndex > -1) {
      // 如果当前插入的序号大于列表中的序号
      if (currentIndex > fpIndex) {
        playlist.splice(fpIndex, 1)
        currentIndex--
      } else {
        playlist.splice(fpIndex + 1, 1)
      }
    }

    let currentSindex = findIndex(sequenceList, currentSong) + 1

    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSindex, 0, song)

    if (fsIndex > -1) {
      if (currentSindex > fsIndex) {
        sequenceList.splice(fsIndex, 1)
      } else {
        sequenceList.splice(fsIndex + 1, 1)
      }
    }

    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },

  saveSearchHistory: ({commit}, query) => {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
  },
  deleteSearchHistory: ({commit}, query) => {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
  },
  clearSearchHistory: ({commit}) => {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
  },

  deleteSong: ({commit, state}, song) => {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    let pIndex = findIndex(playlist, song)
    playlist.splice(pIndex, 1)
    let sIndex = findIndex(sequenceList, song)
    sequenceList.splice(sIndex, 1)

    let isSelf = false
    if (currentIndex === pIndex) {
      isSelf = true
    }

    if (currentIndex > pIndex || currentIndex === playlist.length) {
      currentIndex--
    }

    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)

    if (!playlist.length) {
      commit(types.SET_PLAYING_STATE, false)
    } else if (isSelf) {
      commit(types.SET_PLAYING_STATE, true)
    }
  },
  deleteSongList: ({commit}) => {
    commit(types.SET_PLAYLIST, [])
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_CURRENT_INDEX, -1)
    commit(types.SET_PLAYING_STATE, false)
  },

  savePlayHistory: ({commit}, song) => {
    commit(types.SET_PLAY_HISTORY, savePlay(song))
  },

  saveFavoriteList: ({commit}, song) => {
    commit(types.SET_FAVORITE_LIST, saveFavorite(song))
  },
  deleteFavoriteList: ({commit}, song) => {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
  }
}
