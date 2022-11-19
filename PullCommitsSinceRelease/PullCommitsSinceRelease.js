const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();

var count=0;
var repos=[]
const temp=async ()=>{
    await fetch(`https://api.github.com/users/Shopify/repos?page=2&per_page=1000`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': `${process.env.TOKEN}` }
    })
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            json.map((d)=>{
                repos.push(d.full_name);
                count++;})

            // json.forEach(commit => commitMessages.push({ 'message': commit.commit.message, 'date': commit.commit.author.date }));
            
            // fs.writeFile('./commits.json', JSON.stringify(commitMessages), (err) => {
            //     if (err) throw err;
            //     console.log('The file has been saved!')});
        });
        console.log(count)

        const commitMessages = [];
        let cnt=0;
        for(let i=0;i<count;i++){
            const repo = repos[i];

            await fetch(`https://api.github.com/repos/${repo}/commits`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Authorization': `${process.env.TOKEN}` }
            })
                .then(res => res.json())
                .then(json => {
                    // console.log(json);
                    try{
                        cnt++;
                    json.forEach(commit => commitMessages.push({ 'message': commit.commit.message, 'date': commit.commit.author.date }));
                    }
                    catch(err){
                        fs.writeFile('./commits3.json', JSON.stringify(commitMessages), (err) => {
                            if (err) throw err;
                            console.log('The file has been saved!')});
                    }
                    
                });
                console.log(cnt);
            }
            fs.writeFile('./commits3.json', JSON.stringify(commitMessages), (err) => {
                if (err) throw err;
                console.log('The file has been saved!')});
        console.log(commitMessages.length)

}
temp();


