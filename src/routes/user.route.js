
import {Router} from 'express';
import { UserRegister } from '../controllers/user.controller.js';

const router = Router();

router.route('/register').get(UserRegister)

export default router;
