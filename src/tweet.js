const puppeteer = require("puppeteer")
const fs = require("fs")
const crypto = require("crypto")

let tweet = async (text) => {

	if (!fs.existsSync(process.env.HOME+"/.zemo.config")) {
		
		console.log("You first need to add a user with zemo add_user -u <username> -p <password>")
		process.exit()
	
	}

	let username, password;

	[username, password] = show(fs.readFileSync(process.env.HOME+"/.zemo.config").toString('utf8')).split("|")

	console.log("Beginning tweeting process...")

	if (!fs.existsSync("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")) {
		
		console.log("You need Chrome installed for this app to work")
		process.exit()

	}

	const browser = await puppeteer.launch({headless:true,slowMo:100,executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"});
	const page = await browser.newPage()
	
	await page.setViewport({width:742, height:1369})
	
	await page.setUserAgent("Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Mobile Safari/537.36");

	await page.goto("https://twitter.com")

	await page.waitForSelector("[data-testid=\"loginButton\"]")
	
	await page.setUserAgent("Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Mobile Safari/537.36");

	await page.click("[data-testid=\"loginButton\"]")

	await page.waitForSelector("[name=\"session[username_or_email]\"]")

	await page.type("[name=\"session[username_or_email]\"]", username)

	await page.type("[name=\"session[password]\"]", password)

	await page.setUserAgent("Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Mobile Safari/537.36");

	await page.click("[data-testid=\"LoginForm_Login_Button\"]")

	await page.waitForSelector(".public-DraftStyleDefault-block")

	await page.click(".public-DraftStyleDefault-block")
	
	await page.type(".public-DraftStyleDefault-block", text)

	await page.click("[data-testid=\"tweetButtonInline\"]")

	console.log("Your tweet has been sent")

	process.exit()	

}

let show = (payload) => {

	let key = crypto.createHash("sha256").update(require("os").networkInterfaces().en0[0].mac+"ilovetheweeknd").digest("hex").substr(0,32)
	let components = payload.split(":");
	let iv_from_ciphertext = Buffer.from(components.shift(), 'hex');
	let decipher = crypto.createDecipheriv('aes256', key, iv_from_ciphertext)
	let deciphered = decipher.update(components.join(":"), 'hex', 'utf8')
	return deciphered += decipher.final('utf8')

}

module.exports = tweet
