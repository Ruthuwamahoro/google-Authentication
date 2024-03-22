import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    database: 'test',
    dialect: 'postgres',
    username: 'postgres',
    password: 'db123',
    host: 'localhost',
    port: 5432
})

sequelize.authenticate().then(() => console.log("connection established")).catch((err) => console.log(err))


// defining user model


const UserInfo = sequelize.define('PersonalData', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true
    }
});


(async () => {
    try{

        await sequelize.sync();
        console.log('User is created');
    } catch(error) {
        console.log(error)
    }
})()


export default UserInfo