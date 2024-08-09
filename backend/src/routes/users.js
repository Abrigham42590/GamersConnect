import {Router} from 'express';

const router = Router();
import {getUsers, addUser} from '../controllers/users';

router.get('/', getUsers);
router.post('/', addUser);

export default router;
