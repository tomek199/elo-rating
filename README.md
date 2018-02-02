# EloRating
Application to manage users ranking based on Elo rating algorithm

## Environments
Environment built from **master** branch is enabled on Heroku 
https://elo-rating.herokuapp.com

## API reference
To see API reference please visit
http://elo-rating.herokuapp.com/swagger-ui.html

## Installation
### Properties

Core side properties is configurable in file `elo-rating/elo-rating-core/src/main/resources/application.properties`. 

|Property|Description|Default value|
|---|---|---|
|logging.level.org.springframework.data.mongodb.core.MongoTemplate|Logging level for MongoDB queries|INFO|
|spring.data.mongodb.uri|Connection URI for MongoDB instance||
|google.client.id|Google client ID assigned to application. To get more details please visit https://developers.google.com/identity/sign-in/web/sign-in||
|spring.mail.host|Email server host|smtp.gmail.com||
|spring.mail.port|Email server port|587||
|spring.mail.username|Email server username||
|spring.mail.password|Email server password||
|spring.mail.properties.mail.smtp.auth|Email server smtp auth|true|
|spring.mail.properties.mail.smtp.starttls.enable|Email server tls enable|true|
|spring.mail.properties.mail.smtp.starttls.required|Email server tls required|true|
|spring.mail.feedback.address|Feedback email address||
|spring.thymeleaf.prefix|Thymeleaf templates directory|classpath:/templates/email/|

Front-end properties is configurable in file `elo-rating/elo-rating-frontend/src/environments/environment.ts`

|Property|Description|Default value|
|---|---|---|
|production|Is it production environment|false|
|serverUrl|Core side server URL|https://elo-rating.herokuapp.com/api|
|googleClientId|Google client ID assigned to application. To get more details please visit https://developers.google.com/identity/sign-in/web/sign-in||
|matchesRefreshing|Refresh scheduled matches view|false|
|matchesRefreshTime|Refresh scheduled matches refresh interval in milliseconds|5000|
|matchDuration|Default match duration|10|

### Compilation
From base project directory run:  
`mvn clean install` 

### Application start
To start the application run:  
`mvn clean spring-boot:run` from `elo-rating-core` directory  
Application will be available under http://localhost:8080
___
Front-end application module can be also run separately by `angular/cli`. To run `elo-rating-frontend` module:   
Go to `elo-rating-frontend` directory and run `ng serve` command. Remember to run elo-rating-core module firstly (described above)  
Application will be available under http://localhost:4200. 

## Authors
Please take a look here https://github.com/tomek199/elo-rating/graphs/contributors
 