# gemini
OSU Capstone Project

## Dev / Git Workflow

```
+--------------+         +------------+         +---------------+
|              |         |            |         |  subnotes.io  |
| your machine |<------->|   github   |<------->|   gemini VM   |
|              |         |            |         |               |
+--------------+         +------------+         +---------------+
```

### your machine, one time setup
* install node
* install create-react-app globally `npm install -g create-react-app`
* clone gemini repo `git clone https://github.com/subnotes/gemini.git`
* set up app dir on your machine
  * `cd gemini` go into your copy of the gemini repo
  * `rm app/ -r` temporarily delete the app dir so you can set it up locally  
  * `create-react-app app`
  * `git pull` sync the app dir with github 
  
### vm, one time setup
* `cd` cd to home
* `git clone https://github.com/subnotes/gemini.git` clone gemini repo
* set up app dir on your machine
  * `cd gemini` go into your copy of the gemini repo
  * `rm app/ -r` temporarily delete the app dir so you can set it up locally  
  * `create-react-app app`
  * `git pull` sync the app dir with github 
  
### vm, deploying app on dev subdomains

> ***not needed like I thought it would be since google APIs work from desktop, but leaving it here just for reference***

* `cd ~/gemini/app`
* `sh deploy.sh`
* check it out at <your_color>.subnotes.io
```
red.subnotes.io root = /var/subnotes/chris/
blue.subnotes.io root = /var/subnotes/jonathan/
green.subnotes.io root = /var/subnotes/jordan/
```
