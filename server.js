#!/usr/bin/env node

require('dotenv').config();

const express = require('express');
const path = require('path');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (_, res) => {
  return res.sendFile(path.resolve(__dirname, 'index.html'));
}).get('/index', (_, res) => {
  return res.sendFile(path.resolve(__dirname, 'index.html'));
}).get('/index.html', (_, res) => {
  return res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.use('/img', express.static(path.resolve(__dirname, 'img')));
app.use('/css', express.static(path.resolve(__dirname, 'css')));
app.use('/font', express.static(path.resolve(__dirname, 'font')));
app.use('/js', express.static(path.resolve(__dirname, 'js')));

app.listen(parseInt(PORT), HOST, () => {
  console.log('Running on port', parseInt(PORT));
});