const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "sin-animo-de-lucro-tu-que-prefieres-un-pincho-o-una-tortilla-de-patatas";

const { AsistedDays, Users, Routines, MuscularGroup, Exercises } = require('./models');

const {
  createItem,
  updateItem,
  deleteItem,
  readItem,
  readItems
} = require('./generics');

const checkToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    console.log('no token')
    return res.status(401).json({ error: 'No token' });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.userId = decodedToken.userId;
    console.log('la cookie tiene el userid', req.userId)
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

//USERS

router.get('/allUsers', async (req, res) => await readItems(req, res, Users));

router.get('/actualUser', checkToken, async (req, res) => {
  try {
    const user = await Users.findByPk(req.userId);
    console.log('a ', user)
    if (!user) {
      return res.status(404).json({ error: 'No existe' });
    }
    console.log(user)
    res.json({ name: user.name, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

router.get('/logout', function (req, res) {
  res.clearCookie('token');
  res.send('Logout hecho correctamente');
});

router.post('/register', async (req, res) => {
  try {
    const { name, password } = req.body;

    const existingUser = await Users.findOne({ where: { name } });
    if (existingUser) {
      return res.status(402).json({ error: 'Nombre existe' });
    }

    const newUser = await Users.create({ name, password });

    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '2h' });
    res.cookie('token', token, { httpOnly: false, maxAge: 7200000 });

    res.json({ message: 'Register hecho', name: name, userId: newUser.id });

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

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '2h' });
    res.cookie('token', token, { httpOnly: false, maxAge: 7200000 });
    res.json({name: name, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//MUSCULAR GROUPS

router.get('/muscularGroups', async (req, res) => await readItems(req, res, MuscularGroup));
router.post('/muscularGroups', async (req, res) => await createItem(req, res, MuscularGroup));

//ROUTINES

router.post('/routine', checkToken, async (req, res) => {
  try {
    const userId = req.userId;
    const name = req.body.name;

    let item = await Routines.findOne({ where: { name }, include: [{ model: Users, attributes: ["id"] }, { model: MuscularGroup, include: { model: Exercises } }] });

    if (!item) {
      return res.status(404).json({ error: "Rutina no encontrada" });
    }

    if (userId != item.user.id) {
      return res.status(401).json({ error: "No es el usuario correcto" });
    }

    res.json(item);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/allRoutineNames', checkToken, async (req, res) => {
  try {
    const userId = req.userId;

    let items = await Routines.findAll({ where: { userId } });

    res.json(items);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Devuelve rutinas
router.post('/routines', checkToken, async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "No hay usuario" });
    }

    let items = await Routines.findAll({ where: { userId }, include: { model: Users, attributes: ["name"] } });

    res.json(items);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/createRoutine', checkToken, async (req, res) => {
  try {
    const { name, color, muscularGroups } = req.body;
    const userId = req.userId;

    const routine = await Routines.create({
      userId,
      name,
      color,
    });

    for (const group of muscularGroups) {
      const muscularGroup = await MuscularGroup.create({
        name: group.name,
        routineId: routine.id,
      });

      for (const exercise of group.exercises) {
        await Exercises.create({
          name: exercise.name,
          info: exercise.info || null,
          unit: exercise.unit || null,
          muscularGroupId: muscularGroup.id,
        });
      }
    }

    res.status(201).json({ message: 'Rutina creada'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});








module.exports = router;