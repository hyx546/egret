const webSocketServer = require('ws').Server;
const wss = new webSocketServer({ port: 8080 });
const sf = new Array();
wss.on('connection', connection);

function incoming(message:string) {
  for (let i = 0; i < sf.length; i++) {
    console.log('----message',message);
    sf[i].send(message);

  }
}
function connection(ws:any) {
  sf.push(ws);
  ws.on('message', incoming);
}