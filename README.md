# Welcome to my node.js REST API

##  Basic Architecture:
This project is a submission for Holiday Extras. It was working as of 9 November, 2017. 
The project is build on AWS using three basic AWS functions: API Gateway, Lambda, and DynamoDB. 
Here is the basic image: 
![Lambda](https://image.slidesharecdn.com/arc308-151008042223-lva1-app6892/95/arc308-the-serverless-company-using-aws-lambda-29-638.jpg?cb=1444278232 "Lambda Architecture")

So I wrote the Lambda functions in [node.js6.10](https://nodejs.org/en/blog/release/v6.1.0/). 
There are four of them: Update, delete, get, submit (or CRUD if you prefer).

The idea here is that the user hits the api gateway and the lambda function takes over and writes data sent in the POST/GET/DELETE/UPDATE body to the [DynamoDB](https://aws.amazon.com/dynamodb/) table (a nosql AWS solution). 

This data will persist per the instructions- though normally DynamoDB data does not last as long.

Currently I have the api gateway running here: 
  POST - **https://msufp83hvf.execute-api.eu-west-2.amazonaws.com/prod/users**
  GET -**https://msufp83hvf.execute-api.eu-west-2.amazonaws.com/prod/users**
  DELETE - https://msufp83hvf.execute-api.eu-west-2.amazonaws.com/prod/users
  GET - https://msufp83hvf.execute-api.eu-west-2.amazonaws.com/prod/users/{id}

So if you would like to, for instance, submit someone you can do this: 
```
curl -H "Content-Type: application/json" -X POST -d '{"forename":"Fernando","surname": "Pombeiro", "email": "fernincornwall@gmailcom"}' https://msufp83hvf.execute-api.eu-west-2.amazonaws.com/prod/users
```

##Deployment
I have utilized the [serverless architecture](https://serverless.com/) for deployment (hence you will see the serverless yaml in the project). If you want to make your own project utilizing these functions you can just run 
```
npm install serverless -g
sls deploy -v aws-profile <your aws profile>
```
As long as you are in the same directory as my serverless.yml then you can re-create the api and all necessary lambda functions pretty easily. 

The DynamoDB table here will persist data but it is also NOSQL- so you can also send more fields than just the fore/surname, date, etc. 

Please let me know if you have any questions at fernincornwall@gmail.com

Thanks so much for the opportunity to take on this project! 

Side note: Tests, etc are all in the Lambda cloud! As this is costing me no small amount of money I will probably keep this code up until 30 November and then take it down. Thanks!
