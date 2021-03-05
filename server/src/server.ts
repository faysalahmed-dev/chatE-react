import 'module-alias/register';
import http from 'http';
import mongoose from 'mongoose';
import app from './app/app';
import socketIo from 'socket.io';
import socketConnection from './socket/socket';

const envVar = [
    'NODE_ENV',
    'DB_URL',
    'DB_PASS',
    'JWT_PRIVATE_KEY',
    'JWT_TOKEN_EXPIRIN',
    'PORT',
];

envVar.forEach(item => {
    if (!process.env[item]) {
        throw new Error(`env: ${item} is missing.`);
    }
});
(async () => {
    try {
        const db_url = process.env.DB_URL.replace(
            '<password>',
            process.env.DB_PASS
        );
        await mongoose.connect(db_url, {
            autoIndex: true,
            poolSize: 50,
            wtimeout: 2500,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('database database connected');
    } catch (err) {
        console.log(
            'some thing went wrong. some how database is not connected'
        );
        console.log(err);
        process.exit(1);
    }

    const server = http.createServer(app);

    socketConnection(socketIo(server));
    const port = process.env.PORT || 4555;
    server.listen(port, () => console.log('server running on port ' + port));
})();
