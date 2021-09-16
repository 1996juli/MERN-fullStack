const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});
const cors = require('cors');

// crear el servidor
const app = express();

// Conectar a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MERN', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use( express.json({ extended: true }));

// puerto de la app
const port = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tarea'));

// arrancar la app
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});