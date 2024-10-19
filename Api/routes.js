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

router.get('/users', async (req, res) => await readItems(req, res, Users));

router.post('/users', async (req, res) => await createItem(req, res, Users));

module.exports = router;