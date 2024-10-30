const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('gymtracker', 'root', 'root', {
    host: 'localhost',
    // host: 'host.docker.internal', //IP bbdd
    port: 3306,
    dialect: 'mysql'
});

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

const Routines = sequelize.define('routines', {
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
    },
    unit: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

const Records = sequelize.define('records', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    time: {
        type: Sequelize.STRING,
        allowNull: true
    }
});


AsistedDays.belongsToMany(Users, {through: 'asistedDays_has_users'});
Users.belongsToMany(AsistedDays, {through: 'asistedDays_has_users'});

Users.hasMany(Routines);
Routines.belongsTo(Users);

AsistedDays.belongsTo(Routines);
Routines.hasMany(AsistedDays);

Routines.belongsToMany(MuscularGroup, {through: 'rutines_has_musculargroup'});
MuscularGroup.belongsToMany(Routines, {through: 'rutines_has_musculargroup'});

MuscularGroup.hasMany(Exercises);
Exercises.belongsTo(MuscularGroup);

Records.belongsTo(Routines);
Routines.hasMany(Records)

Records.belongsTo(Users);
Users.hasMany(Records);

Records.belongsToMany(Exercises, {through: 'records_has_exercises'});
Exercises.belongsToMany(Records, {through: 'records_has_exercises'});

Records.belongsTo(AsistedDays);
AsistedDays.belongsTo(Records);

Users.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });
  

module.exports = {
sequelize,
AsistedDays,
Users,
Routines,
MuscularGroup,
Exercises,
Records
};