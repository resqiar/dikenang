import puppeteer from 'puppeteer'
;(async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('https://dikenang.co', { waitUntil: 'networkidle0' })
	await page.screenshot({ path: 'media/dikenang.jpg' })

	await browser.close()
})()
