// import fs from 'fs';
// import path from 'path';
// import { Sequelize } from 'sequelize';
// import { Config } from '../config/config'; 

// const basename: string = path.basename(__filename);
// const env: string = process.env.NODE_ENV || 'development';
// const config: Config = require(path.join(__dirname, '../config/config.js'))[env];
// const db: any = {};

// let sequelize: Sequelize;

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database!,
//     config.username!,
//     config.password!,
//     config,
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file: string) => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach((file: string) => {
//     const model = require(path.join(__dirname, file))(sequelize);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName: string) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;


