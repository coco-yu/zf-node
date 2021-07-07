function anonymous(obj) {
    let html = '';
    with(obj) {
        html += `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        `
        arr.forEach(item => {
            html += `
            <li><%=item%></li>
        `
        })
        html += `
    </body>
    </html>`
    }
    return html
}
console.log(anonymous({arr:[1,2,3]}))


// http-header的应用 缓存 代理 多语言... range...
// 先express 
// koa