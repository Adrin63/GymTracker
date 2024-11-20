const { sequelize, Users, MuscularGroup } = require('./models');

async function iniDB(forceStart) {
    try {
        if (forceStart) {
            await sequelize.drop();
            console.log('Todas las tablas dropedas.');
        } else {
            const [results] = await sequelize.query("SHOW TABLES LIKE 'users'");
            const usersTableExists = results.length > 0;

            if (!usersTableExists) {
                console.log('No users found. Dropping tables...');
                await sequelize.drop();
                console.log('Todas las tablas dropedas.');
            } else {
                const userCount = await Users.count();
                if (userCount === 0) {
                    console.log('No hay usuarios. Se va a eliminar la base de datos.');
                    await sequelize.drop();
                    console.log('Todas las tablas dropedas.');
                } else {
                    console.log('La base de datos existe, no se eliminará nada.');
                    return;
                }
            }
        }

        await sequelize.sync({ force: true });
        console.log('Tables created.');

        //await insertInitialData();
        
    } catch (error) {
        console.error('Error initializing database:', error);
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

    console.log('Initial muscular groups created.');
}

module.exports = iniDB;
