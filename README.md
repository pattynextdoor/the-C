[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](https://opensource.org/licenses/MIT)

# The C 
> The C autonomously registers for a planned schedule at UC Riverside through R'Web and the Banner service. 
<img style="float: right;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/BigC_Box_Springs_Mountain.jpg/220px-BigC_Box_Springs_Mountain.jpg" >



#### Written by:

Patrick Tumbucon ([Github](https://github.com/ptumb001)) 

## Brief

The C is a web scraper that controls a headless instance of Chromium through Google's Puppeteer API. This is a work in progress, so expect to see updates here. Feel free to fork this project as well.

## Usage
### Dependencies

* Node: v7.6.0 or greater
* Puppeteer: v0.13.0


### Steps

Clone this repository to your local machine.

`$ git clone https://github.com/ptumb001/the-C.git`

Navigate to the newly-cloned directory.

`cd the-C`

Download dependencies. Shouldn't take too long.

`npm install`

Create an empty file for your credentials.

`$ touch creds.js`

Open `creds.js` in a text editor, paste this code in, and save.

```javascript
module.exports = {
  username: '<yourUserName>',
  password: '<yourPassword>'
}
```

`<yourUserName>` and `<yourPassword>` refer to the credentials you use to log in to iLearn/R'Web

Run it.

`node index.js`

