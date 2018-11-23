# EloRating
Application to manage users ranking based on Elo rating algorithm

## Environments
Environment built from **master** branch is available on Heroku 
https://elo-rating.herokuapp.com

Environment built from **develop** branch is available on Heroku
https://elo-rating-develop.herokuapp.com
 

## API reference
To see API reference please visit
http://elo-rating.herokuapp.com/swagger-ui.ghtml

## Installation
### Properties

Core side properties is configurable in file `elo-rating/src/main/resources/application.properties`. 

|Property|Description|
|---|---|
|logging.level.org.springframework.data.mongodb.core.MongoTemplate|Logging level for MongoDB queries|
|spring.data.mongodb.uri|Connection URI for MongoDB instance|
|google.client.id|Google client ID assigned to application. To get more details please visit https://developers.google.com/identity/sign-in/web/sign-in|
|spring.mail.host|Email server host|
|spring.mail.port|Email server port|
|spring.mail.username|Email server username|
|spring.mail.password|Email server password|
|spring.mail.properties.mail.smtp.auth|Email server smtp auth|
|spring.mail.properties.mail.smtp.starttls.enable|Email server tls enable|
|spring.mail.properties.mail.smtp.starttls.required|Email server tls required|
|spring.mail.feedback.address|Feedback email address|
|spring.thymeleaf.prefix|Thymeleaf templates directory|

Front-end properties is configurable in directory `elo-rating/src/main/webapp/src/environments/`

|Property|Description|
|---|---|
|production|Is it production environment|
|serverUrl|Core side server URL|
|googleClientId|Google client ID assigned to application. To get more details please visit https://developers.google.com/identity/sign-in/web/sign-in|
|matchesRefreshing|Refresh scheduled matches view|
|matchesRefreshTime|Refresh scheduled matches refresh interval in milliseconds|
|matchDuration|Default match duration|

### Application start
To start the application run:  
`gradle bootRun` from `project root` directory  
Application will be available under http://localhost:8080
___
Front-end application module can be also run separately by `angular/cli`. To run `webapp` module:
- change `serverUrl` webapp's property to point to the proper core api module (for _localhost_ it will be by default `http://localhost:8080/api`)
- Go to `src/main/webapp` directory and run `ng serve` command. Remember to run `gradle bootRun` core module firstly (described above)  
- Application will be available under http://localhost:4200. 

## Authors
Please take a look here https://github.com/tomek199/elo-rating/graphs/contributors
 