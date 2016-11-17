
this is the main repo

#For mongoDB

* install mongodb (https://docs.mongodb.com/manual/administration/install-community/)

* start the mongodb service (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#run-mongodb) (Notice this example using osx.)

* start the mongodb shell in command prompt (https://docs.mongodb.com/getting-started/shell/client/)

* when in mongodb shell type "use WebChat" to switch to a database called "WebChat"

* when in mongodb shell type "db.users.insert({"username":"dummyAccount", "password":"dummyPassword"})" - an account with the username "dummyAccount" and password "dummyPassword" should now have been added to the database and ready for use. (https://docs.mongodb.com/v3.2/reference/method/db.collection.insert/)


#Heroku
Commits on master is deployed automatically and the app will be available here:
`https://webchat-team4.herokuapp.com/`

When testing with local mongodb start with `npm run start-local`