const express = require('express');
const app = express();
const path = require('path');
const Contenedor = require('./Contenedor');

const productosJsonPath = path.join(__dirname, 'productos.json');
const contenedor = new Contenedor(productosJsonPath);

app.get('/productos', async (req, res) => {
  try {
    const productos = await contenedor.getAll();
    console.log('Productos:', productos);
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/productoRandom', async (req, res) => {
  try {
    const productos = await contenedor.getAll();
    console.log('Productos:', productos);
    const randomIndex = Math.floor(Math.random() * productos.length);
    const randomProduct = productos[randomIndex];
    res.json(randomProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener un producto al azar' });
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});