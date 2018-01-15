import jsonp from 'common/js/jsonp'
import {commonParams} from './config'
// import axios from 'axios'

export const getLyric = (mid) => {
  const url = '/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return jsonp({
    url: url,
    data: data
  })
  // return axios.get(url, {
  //   params: data
  // }).then((res) => {
  //   console.log(res)
  //   return Promise.resolve(res.data)
  // }).catch((err) => {
  //   console.log(err)
  // })
}
