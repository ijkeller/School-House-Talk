'use strict';

const { Server } = require('socket.io');
const SOCKETPORT = process.env.SOCKETPORT || 3004;
const server = new Server(SOCKETPORT);
const messages = server.of('/messages');


console.log('Listening SOCKET PORT', SOCKETPORT);

messages.on('connection', (socket) => {
  console.log('SOCKET CONNECTED', socket.id);
  socket.onAny((event, payload) => {
    const date = new Date();
    const time = date.toTimeString();
    console.log('EVENT', { event, time, payload });
  });
  socket.on('GAME-ALERT', (payload) => {
    console.log('--------------------------');
    const sportName = payload.eventData.sport;
    const eventMessage =
      `${payload.eventStr} 
      \nSport Event: ${payload.eventData.sport} 
      \nDate: ${payload.eventData.date} 
      \nTime: ${payload.eventData.time} 
      \nAgainst: ${payload.eventData.opponent} 
      \nAddress: ${payload.eventData.location}`;
    socket.to(sportName).emit('event', eventMessage);
  });

  socket.on('JOIN', (room) => {
    console.log(`User has joined the ${room} room`);
    socket.join(room);
  });

});

module.exports = SOCKETPORT;