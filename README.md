
# Google <a href="https://bard.google.com/"><img src="https://camo.githubusercontent.com/adb54264fe2ad5067d07d0752fc32600b4e6250073b01ce8c386575b431e3f06/68747470733a2f2f7777772e677374617469632e636f6d2f6c616d64612f696d616765732f66617669636f6e5f76315f31353031363063646466663766323934636533302e737667" height="20px"></a> Bard API 

> A Node code that returns Response of [Google Bard](https://bard.google.com/) through Express API

![](./assets/bard_api.gif)

Never expose the `__Secure-1PSID` for your safety.
>  `__Secure-1PSID` is not an officially provided API KEY. 

<br>

## Authentication
1. Visit https://bard.google.com/
2. F12 for console
3. Session: Application → Cookies → Copy the value of  `__Secure-1PSID` cookie.
<br>

![Image : how to get cookie](/../master/screenshots/cookie.png?raw=true)
<br>

## Install
Install all dependancies from npm:
```
npm i
node index.js OR nodemon run index.js
```
Then go to localhost http://localhost:5000/ask/:question
Replace the :question with promt
<br>

## Usage 
[Open In Browser]() 
