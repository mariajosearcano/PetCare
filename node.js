const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');  // modulo local routes
const path = require('path');
//const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// Inicializar la app de Express 
const app = express();

// Middleware 
app.use(cors(({ origin: '*' })));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://code.jquery.com https://cdnjs.cloudflare.com; " +
        "font-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
        "img-src 'self' data: https: http: blob: http://res.cloudinary.com/dieprtgzj/image/upload/ http://res.cloudinary.com/"
    );
    next();
});

//rutas
app.use('/', router);
app.use(express.static('src'));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/src/css', express.static(path.resolve(__dirname, 'src/css')));
app.use('/src/html', express.static(path.resolve(__dirname, 'src/html')));

// Iniciar el servidor
app.listen(3007, () => {
    console.log('Server listening on http://localhost:3007/home');
});

