

let parse = () => {

	if (process.argv[1] == "add_user" || process.argv[2] == "add_user") {

		if ((process.argv.length == 6 && process.argv[1] == "add_user") || (process.argv.length == 7 && process.argv[2] == "add_user")) {
		
			if (process.argv[1] == "add_user") {
			
				return {

					sctype:"add_user",
					username:process.argv[3],
					password:process.argv[5]

				}		
	
			} else {

				return {

					sctype:"add_user",
					username:process.argv[4],
					password:process.argv[6]				

				}

			}

		} else {

			console.log("Command options length is not expected. Please revise your command")
			process.exit(0)

		}

	} else if (process.argv[1] == "tweet" || process.argv[2] == "tweet") {

		if ((process.argv.length == 3 && process.argv[1] == "tweet") || (process.argv.length == 4 || process.argv[2] == "tweet")) {

			if (process.argv[1] == "tweet") {
				
				return {
					
					sctype:"tweet",
					tweet:process.argv[2]
				
				}

			} else {
				
				return {
				
					sctype:"tweet",
					tweet:process.argv[3]

				}

			}

		} else {

			console.log("Command options length is not expected. Please revise your command")
			process.exit(0)
		
		}

	} else {

		console.log("Please type a known subcommand (either add_user or tweet)")
		process.exit(0)	

	}

}

module.exports = parse
