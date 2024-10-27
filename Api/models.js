const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('gymtracker', 'root', 'root', {
    host: 'localhost',
    // host: 'host.docker.internal', //IP bbdd
    port: 3306,
    dialect: 'mysql'
});

// Runear 1 vez, convierte las tablas del Sequelize a MySql
// async function iniDB(){
// await sequelize.sync({force: true});
// console.log('tablas creadas');
// }

// iniDB();


//DEFINIR TABLAS
//DEFINIR TABLAS
//DEFINIR TABLAS

const AsistedDays = sequelize.define('asistedDays', {
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Users = sequelize.define('users', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
});

const Rutines = sequelize.define('rutines', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    image: {//URL
        type: Sequelize.STRING,
        allowNull: true
    }
});

const MuscularGroup = sequelize.define('muscularGroup', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

const Exercises = sequelize.define('exercises', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    info: {
        type: Sequelize.FLOAT,
        allowNull: true,
    }
});


AsistedDays.belongsToMany(Users, {through: 'asistedDays_has_users'});
Users.belongsToMany(AsistedDays, {through: 'asistedDays_has_users'});

Users.hasMany(Rutines);
Rutines.belongsTo(Users);

AsistedDays.belongsTo(Rutines);
Rutines.hasMany(AsistedDays);

Rutines.belongsToMany(MuscularGroup, {through: 'rutines_has_musculargroup'});
MuscularGroup.belongsToMany(Rutines, {through: 'rutines_has_musculargroup'});

MuscularGroup.hasMany(Exercises);
Exercises.belongsTo(MuscularGroup);

Users.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Encripta la contrasenya amb bcrypt
    user.password = hashedPassword;
  });
  

module.exports = {
AsistedDays,
Users,
Rutines,
MuscularGroup,
Exercises
};