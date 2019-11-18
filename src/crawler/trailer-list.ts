import puppeteer from 'puppeteer'
import $ from 'jquery'
import {ILinkItem} from "../types"
import process from 'process'

const url = `https://movie.douban.com/explore#!type=movie&tag=%E6%9C%80%E6%96%B0&page_limit=20&page_start=0`
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
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
  await sleep(3000)
  await page.waitForSelector('.more')
  for (let i = 0; i < 1; i++) {
    await sleep(3000)
    await page.click('.more')
  }
  const result: ILinkItem[] = await page.evaluate(() => {
    // @ts-ignore
    const $ = window.$ || $
    const items = $('.list-wp a')
    const links: ILinkItem[] = []
    if (items.length >= 1) {
      items.each((index: any, item: any) => {
        let it = $(item)
        let doubanId = it.find('div').data('id')
        let title = it.find('img').attr('alt')
        let rate = Number(it.find('strong').text())
        let poster = it.find('img').attr('src')?.replace('s_ratio', 'l_ratio') as string
        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    return links
  })
  // browser.close()
  console.log(result)
  process.send({result, code: 1})
  process.exit(0)
})()
