const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const MongoDBAdapter = require("moleculer-db-adapter-mongo");
const mongoose = require("mongoose");
const User = require("../userModel/user");
const bcrypt = require("bcryptjs")
// const JWT_SECRET = MGZzDMLtqG;
const jwt = require("jsonwebtoken")

"use strict";

module.exports = {
	name: "users",
	model: User,

	/**
	 * Service settings
	 */
    settings: {


	},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		async signup(ctx){
			console.log(ctx.params);
			const user = new User(ctx.params);
			try {
				await user.save()
				return user
			}
			catch(e) {
				return e;
			}
		},

		async login(ctx){
			try {
				const user = await User.findOne({user_email : ctx.params.user_email});
				if(!user) {
					return "user not found"
				}
				else if(user && bcrypt.compareSync(ctx.params.password,user.password) == true){
					var payload =  { id: user._id } ;
					var jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1 day" });
					return {user,jwtToken}
				}}
				catch(e) {
					return e
				}
			
		// 	User.findOne({
		// 		user_email : ctx.params.user_email
		// 	}, (err,user) => {
		// 		if(!user) {
		// 			console.log("user not found")
		// 		}
				
		// 		else if(user && bcrypt.compareSync(ctx.params.password,user.password) == true) {
					
		// 			var payload =  { id: user._id } ;
		// 			var jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 1 * 30 });
		// 			console.log('jwtToken: ' + jwtToken);
		// 			console.log(user)
		// 			return user
					
		// 		}
		// 		else {
		// 			console.log(err)
		// 		}
		// 	})
			
		}
		
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		try {
			mongoose.Promise = global.Promise
			mongoose.connect(`mongodb://admin:admin1@ds351428.mlab.com:51428/moleculer_test`, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			})
			this.logger.info('connect to db')
		} catch (e) {
			this.logger.info(e)
		}
	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {


	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};