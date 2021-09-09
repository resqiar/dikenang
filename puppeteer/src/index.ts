import puppeteer from 'puppeteer'
;(async () => {
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()
	await page.goto('https://dikenang.co', { waitUntil: 'networkidle0' })

	// Executes Navigation API within the page context
	const metrics = await page.evaluate(() =>
		JSON.stringify(window.performance)
	)

	// Parses the result to JSON
	console.info(JSON.parse(metrics))

	await browser.close()
})()
