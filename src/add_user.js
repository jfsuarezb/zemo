const fs = require("fs")
const crypto = require("crypto")

let add_user = (username, password) => {

	fs.writeFileSync(process.env.HOME+"/.zemo.config", hide(username+"|"+password))
	
}

let hide = (payload) => {

	let iv = crypto.randomBytes(16)
	let key = crypto.createHash("sha256").update(require("os").networkInterfaces().en0[0].mac+"ilovetheweeknd").digest("hex").substr(0, 32)
	let cipher = crypto.createCipheriv('aes256', key, iv)
	let ciphered = cipher.update(payload, 'utf8', 'hex');
	ciphered += cipher.final('hex');
	return iv.toString('hex') + ':' + ciphered
	
}

module.exports = add_user
