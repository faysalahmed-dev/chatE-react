import 'module-alias/register';
import http from 'http';
import mongoose from 'mongoose';
import app from './app/app';
import socketIo from 'socket.io';

(async () => {
    await mongoose.connect(process.env.DB_URL, {
        autoIndex: true,
        poolSize: 50,
        wtimeout: 2500,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    const server = http.createServer(app);

    const io = socketIo(server);

    const port = process.env.PORT || 4555;
    server.listen(port, () => console.log('server running on port ' + port));
})();
