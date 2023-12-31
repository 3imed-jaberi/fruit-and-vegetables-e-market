import path from 'node:path';

import express from 'express';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';

import { errorHandler } from '#app/middlewares/index.js';

import * as Routers from '#app/routes/index.js';

const app = express();

app
  // logger
  .use(morgan('dev'))
  // body parser
  .use(express.json())
  // file upload
  .use(fileUpload())
  // sanitize data
  .use(mongoSanitize())
  // set security headers
  .use(helmet())
  // prevent XSS attacks
  .use(xss())
  // rate limiting
  .use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 mins
      max: 100,
    }),
  )
  // prevent http param pollution
  .use(hpp())
  // enable CORS
  .use(cors())
  // serve static uploaded files
  .use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')))
  // mount routers
  .use('/api/v1/auth', Routers.authRouter)
  .use('/api/v1/annonces', Routers.annoncesRouter)
  // error handler
  .use(errorHandler);

export { app };
