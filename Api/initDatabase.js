const { sequelize, Users, MuscularGroup } = require('./models');

async function iniDB(forzeStart) {
    try {
        const userCount = await Users.count();
        if (userCount === 0 || forzeStart) {
            await sequelize.sync({ force: true });
            console.log('Tablas creadas');

            await insertInitialData();
        } else {
            console.log('La base de datos ya existe');
        }
    } catch (error) {
        console.error('Error inicializaciando db:', error);
    }
}

async function insertInitialData() {
    await MuscularGroup.bulkCreate([
        { name: 'Biceps', image: 'Biceps.png' },
        { name: 'Triceps', image: 'Triceps.png' },
        { name: 'Hombros', image: 'Hombros.png' },
        { name: 'Espalda', image: 'Espalda.png' },
        { name: 'Pecho', image: 'Pecho.png' },
        { name: 'Abdominales', image: 'Abdominales.png' },
        { name: 'Piernas', image: 'Piernas.png' },
        { name: 'Cardio', image: 'Cardio.png' },
    ]);

    console.log('Grupos musculares iniciales creados.');
}

module.exports = iniDB;