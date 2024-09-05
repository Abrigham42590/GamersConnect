import {Router} from 'express';
import multer from 'multer';
const upload = multer({storage: multer.memoryStorage({})});
import authenticateToken from '../middleware/authenticateToken.js'; // Import the middleware

const router = Router();
import {
  addUser,
  addUserMedia,
  loginUser,
  getUserMedia,
} from '../controllers/users.js';

router.post('/loginUser', loginUser);
router.post('/addUser', addUser);
router.post(
  '/addUserMedia',
  authenticateToken,
  upload.single('mediaFile'),
  addUserMedia,
);
router.get('/:userId/media', authenticateToken, getUserMedia);

export default router;
