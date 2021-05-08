let conneted = false;

let socket = io('http://localhost:3000');

socket.emit('setup', userLoggedIn);

socket.on('connected', () => (conneted = true));