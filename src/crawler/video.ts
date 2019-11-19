import puppeteer from 'puppeteer'
import {ILinkItem} from "../types"
import process from "process"
import $ from 'jquery'

const base = `https://movie.douban.com/subject/`
const doubanId = `26739551`
const videoBase = `https://movie.douban.com/trailer/219491`
const sleep = (time: number) => new Promise((resolve) => {
    setTimeout(resolve, time)
  })
;(async () => {
  console.log('start visit the target page')
  const browser = await puppeteer.launch({
    dumpio: false,
    headless: false,
    devtools: true,
  })
  const page = await browser.newPage()
  await page.goto(base + doubanId, {
    waitUntil: 'networkidle2'
  })
  await sleep(3000)
  // await page.waitForSelector('.more')
  for (let i = 0; i < 1; i++) {
    await sleep(1000)
  }
  const result: any = await page.evaluate(() => {
    // @ts-ignore
    const $ = window.$ || $
    const it = $('.related-pic-video')
    if (it && it.length) {
      const link = it.attr('href')
      const cover = it.find('img').attr('src')
      return {
        link,
        cover
      }
    }
    return {}
    // const items
  })
  let video: any = null
  if (result.link) {
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })
    await sleep(2000)
    video = await page.evaluate(() => {
      // @ts-ignore
      const $ = window.$ || $
      const it = $('source')
      if (it && it.length) {
        return it.attr('src')
      }
      return ''
    })
  }
  const data = {
    video,
    doubanId,
    cover: result.cover
  }
  // browser.close()
  // console.log(result)
  if(typeof process.send==='function'){
    process.send({data})
  }
  process.exit(0)
})()