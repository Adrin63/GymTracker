const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router();

const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken'); 

const SECRET_KEY = "sin-animo-de-lucro-tu-que-prefieres-un-pincho-o-una-tortilla-de-patatas";

const { AsistedDays, Users, Rutines, MuscularGroup, Exercises } = require('./models');

const {
    createItem,
    updateItem,
    deleteItem,
    readItem,
    readItems
  } = require('./generics'); 



//USERS

router.get('/users', async (req, res) => await readItems(req, res, Users));

router.post('/register', async (req, res) => {
    try {
      const { name, password } = req.body;
    
      console.log('me llega', name, password)
      const existingUser = await Users.findOne({ where: { name } });
      if (existingUser) {
        return res.status(402).json({ error: 'Nombre existe' });
      }

      const newUser = await Users.create({ name, password });

      res.json({ message: 'Register hecho', name: newUser.name });
    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
      const user = await Users.findOne({ where: { name } });
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Contrasenya mal' });
      }

      res.json({ name: user.name });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//RUTINES

router.post('/rutines', async (req, res) => await createItem(req, res, Rutines));

module.exports = router;