import { Server } from 'node-osc';

var oscServer = new Server(5500, 'http://localhost', () => {
  console.log('OSC Server is listening');
});

oscServer.on('message', function (msg) {
  console.log(`Message: ${msg}`);
  oscServer.close();
});