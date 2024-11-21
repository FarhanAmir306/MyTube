
import {Router} from 'express';
import { LoginUser, LogoutUser, refreshAccessToken, UserRegister } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    UserRegister
    )
router.route('/login').post(LoginUser)

// Secure routes
router.route('/logout').post(verifyJWT,LogoutUser)
router.route('/refresh-token').post(refreshAccessToken)




export default router;
