// http://api.douban.com/v2/movie/subject/1765796
import axios from 'axios'
import {ILinkItem} from "../types"

async function fetchMovie(item: ILinkItem) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}?apikey=0df993c66c0c636e29ecbb5344252a4a`
  let res = await axios.get(url)
  return res.data
}
;(async () => {
  let movies: ILinkItem[] = [
    {
      doubanId: 27068118,
      title: '战火球星',
      rate: 7.3,
      poster:
        'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2556200858.jpg'
    },
    {
      doubanId: 30218533,
      title: '攻击链',
      rate: 5.8,
      poster:
        'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2570509565.jpg'
    }
  ]
  movies.map(async (movie) => {
    let movieData = await fetchMovie(movie)
    // fs.writeFile('a.json',movieData)
    console.log(movieData)
  })
})()