import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { User } from '../../users/user.entity';
import { Post } from '../../posts/post.entity';
import { Comment } from 'src/comments/comment.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig = require('./database.config');

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Post, Comment]);
      //   await sequelize.sync();
      return sequelize;
    },
  },
];
