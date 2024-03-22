// now try to replace this actually
/* function renderContent(content){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    </head>
    <body>
    ${content}
    </body>
    </html>
    `
} */

const fs = require('node:fs');


function renderContent(content){
    return new Promise((resolve, reject)=>{
        fs.readFile('./content/code.html', 'utf8', (err, data) => {
            if (err) {
                return reject(err)
            }

            data = data.replace('<!-- $content$ -->',content)
            return resolve(data)
        })
    })
    
}

function renderNavAndContent(content){
    return new Promise((resolve, reject)=>{
        // first adding the content
        fs.readFile('./content/code.html', 'utf8', (err, data) => {
            if (err) {
                return reject(err)
            }
            let fullData

            fullData = data.replace('<!-- $content$ -->',content)

            // ...then, adding the nav
            // TODO - replace this with try catch block
            fs.readFile('./content/nav.nick', 'utf8', (err, data) => {
                if (err) {
                    return reject(err)
                }
    
                fullData = fullData.replace('<!-- $nav$ -->',data)
                return resolve(fullData)
            })
        })
    })
    
}

module.exports = {renderContent, renderNavAndContent}