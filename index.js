const puppeteer = require('puppeteer')
const fs = require('fs')

async function getLinks(page, type = 'lessons', selector = 'a[data-click-handler=true]') {
  await page.waitForSelector(selector, { timeout: 0 })

  const links = await page.$$eval(selector, dirtyLinks => dirtyLinks.map(link => link.href))
  const regex = new RegExp(`^https://egghead.io/${type}/`)
  const cleanLinks = links.reduce((acc, cur) => cur.match(regex) ? `${acc}\n${cur}` : acc)

  return cleanLinks
}

async function getCourses(page, category, framework) {
  await page.goto(`https://egghead.io/browse/${category}/${framework}`)

  const selector = `a.no-underline.db.dark-blue.z-1.bg-white.eh-shadow-1.css-quva1q`
  await page.waitForSelector(selector, { timeout: 0 })

  const links = await page.$$eval(selector, dirtyLinks => dirtyLinks.map(link => link.href))
  return links.filter(item => item.match(/^https:\/\/egghead.io\/courses/))
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function run() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const cat = process.argv.slice(2, 3)
  const fw = process.argv.slice(3)
  const courses = await getCourses(page, cat, fw)

  await asyncForEach(courses, async (item) => {
    await page.goto(item)
    const lessons = await getLinks(page)
    const courseSlug = item.substr(27)
    fs.mkdir(`./courses/${fw}/${courseSlug}`, { recursive: true }, (err) => {
      if (err) {
        console.error(err)
        return false
      }
      fs.writeFile(`./courses/${fw}/${courseSlug}/${courseSlug}.txt`, lessons, err => err ? console.error(err) : console.log(`${courseSlug} - File saved!`))
    })
  });

  browser.close()
}

run()
