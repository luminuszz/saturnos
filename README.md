# saturnos


 Saturnos is a timer to help count the working hours, it uses the stack api as a port but its core can be used anywhere as long as it meets your contracts.

 the timer is default config for 8 hours


![image](https://user-images.githubusercontent.com/48535259/147385568-acb01371-6502-4b17-ab65-11561fd01c42.png)



## Setup

- create .env.local with .env.example
  Saturnos use slack api (bolt), put the slack credetials in .nev

 see docs ->  https://api.slack.com/tools/bolt

```bash 
SLACK_SIGNING_SECRET=
SLACK_BOT_TOKEN=
PORT=
SLACK_APP_TOKEN=
```

- run docker-compose.yml

```bash 
 docker-compose up --build
```


### Technologies

- Nest.js
- api-sdk (bolt)
- mongodb (mongoose)