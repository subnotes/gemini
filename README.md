# gemini
OSU Capstone Project


## Dev / Git Workflow

Lots of improvements to be made, but it's a start...

You can develop and test on your own machine, 
but if using the APIs (authentication/storage)
you'll probably need to run it on the VM

***PLEASE TALK TO GROUP BEFORE MERGING TO MASTER***  
todo: setup merge request / code review workflow

```
+--------------+         +------------+         +---------------+
|              |         |            |         |  subnotes.io  |
| your machine |<------->|   github   |<------->|   gemini VM   |
|              |         |            |         | supports APIs |
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
  
### vm, deploying app
* `cd ~/gemini/app`
* `npm run build`
* `cp build/* /var/subnotes/<username>/ -rf` (replace <username> with your first name)
* check it out at subnotes.io/<username>
```
red.subnotes.io root = /var/subnotes/chris/
blue.subnotes.io root = /var/subnotes/jonathan/
green.subnotes.io root = /var/subnotes/jordan/
```
