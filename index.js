require('dotenv').config();
const express = require('express')
const app = express()
const port = 5000

//const cookie = '__Secure-1PSID=<YOUR_1PSID_COOKIE>';
const cookie = '__Secure-1PSID='+ process.env.PSID_COOKIE;
app.get('/', async (req, res) => {
    res.send("Hello")
})
        
app.get('/ask/:question', async (req, resp) => {
    const prompt = await req.params.question
    fetch("https://bard.google.com/",
        {
            method: 'get',
            headers: {
                "Host": "bard.google.com",
                "X-Same-Domain": "1",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Origin": "https://bard.google.com",
                "Referer": "https://bard.google.com",
                'Cookie': cookie
            },
        }).then(async bard_res => {
            var bard_text = await bard_res.text();
            const match = bard_text.match(/"SNlM0e":"(.*?)"/);
            const SNlM0e = match ? match[1] : null;
            fetch("https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=boq_assistant-bard-web-server_20230510.09_p1&_reqid=229189&rt=c", {
                method: 'post',
                headers: {
                    "Host": "bard.google.com",
                    "X-Same-Domain": "1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Origin": "https://bard.google.com",
                    "Referer": "https://bard.google.com",
                    'Cookie': cookie
                },
                body: "f.req=[null,\"[[\\\"" + prompt + "\\\"],null,[\\\"\\\",\\\"\\\",\\\"\\\"]]\"]&at=" + SNlM0e
            }).then(async res => {
                let lines = (await res.text()).split("\n");
                let longest_line = lines.reduce(function (a, b) {
                    return a.length > b.length ? a : b;
                }, "");
                let response1 = await JSON.parse(JSON.parse(longest_line)[0][2])[0][0];
                resp.send(response1);
            })
                .catch(err => {
                    resp.send('Error:'+ err);
                });
        })
});

app.listen(port, () => console.log('Example app listening on port 5000!'));
