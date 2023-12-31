import { Router as ExpressRouter } from 'express';

import { authCtrl } from '#app/controllers/index.js';

const authRouter = ExpressRouter();

authRouter.post('/register', authCtrl.register).post('/login', authCtrl.login);

export { authRouter };
