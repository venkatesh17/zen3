//https://github.com/christiannwamba/react-pusher-getting-started
//https://github.com/bitlabstudio/blogpost-react-websocket-chat

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port:3030 })


wss.on('connection', function connection(ws){
    ws.on('message', function incoming(data){
        console.log(data);
        
        wss.clients.forEach(function each(client){
            if(client!==ws && client.readyState === WebSocket.OPEN){
                client.send(data)
            }
        })
    })
})