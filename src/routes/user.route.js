
import {Router} from 'express';
import { changeCurrentPassword, getCurrentUser, LoginUser, LogoutUser, refreshAccessToken, updateUserDetails, uploadAvatar, uploadCoverImage, UserRegister,getUserChannelProfile, getWatchHistory} from '../controllers/user.controller.js';
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
router.route('/change-passsword').post(verifyJWT,changeCurrentPassword)
router.route('/current-user').get(verifyJWT,getCurrentUser)
router.route('/update-account').patch(verifyJWT,updateUserDetails)
router.route('/avatar').patch(verifyJWT,upload.single('avatar'),uploadAvatar)
router.route('/cover-image').patch(verifyJWT,upload.single('coverImage'),uploadCoverImage)
router.route('/channel/:username').get(verifyJWT,getUserChannelProfile)
router.route('/history').get(verifyJWT,getWatchHistory)



export default router;
