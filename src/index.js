let add_user_handler = require("./add_user.js")

let parseObject = require("./parser.js")()

if (parseObject.sctype == "add_user") {

	add_user_handler(parseObject.username, parseObject.password)
	console.log(`Saved encrypted credentials at ${process.env.HOME}/.zemo.config`)
	process.exit()

} 
