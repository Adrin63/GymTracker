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



//GETS

router.get('/users', async (req, res) => await readItems(req, res, Users));

router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } }); // Cerca l'usuari pel seu email
      if (!user) {
        return res.status(404).json({ error: 'User no trobat' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password); // Compara la contrasenya proporcionada amb la contrasenya encriptada de l'usuari
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Password incorrecte' }); // Retorna error 401 si la contrasenya és incorrecta
      }

      res.json({ name: user.name });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//POSTS

router.post('/users', async (req, res) => await createItem(req, res, Users));

router.post('/register', async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        return res.status(400).json({ error: 'no ha puesto nombre o constraseña' });
      }
      const existingUser = await Users.findOne({ where: { name } });
      if (existingUser) {
        return res.status(400).json({ error: 'Nombre existe' });
      }

      const newUser = await User.create({ name, password });

      res.json({ message: 'Register hecho', name: newUser.name });
    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;