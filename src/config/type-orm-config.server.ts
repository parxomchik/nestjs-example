/* eslint-disable import/first */
import fs = require('fs');

import configuration from './configuration';

const configs = configuration();
const typeORMConfigs = {
  type: 'postgres',
  host: configs.database.host,
  port: configs.database.port,
  username: configs.database.username,
  password: configs.database.password,
  database: configs.database.name,
  autoLoadEntities: true,
  migrationsTableName: 'migration',
  migrations: ['migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
  ssl: false,
};

fs.writeFileSync('ormconfig.json', JSON.stringify(typeORMConfigs, null, 2));
