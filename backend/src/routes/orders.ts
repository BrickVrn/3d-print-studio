import { Router } from 'express';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { ordersController } from '../controllers/orders';

const router = Router();

// Public: create order
router.post('/', ordersController.create);

// Protected: admin only
router.get('/', authMiddleware, adminOnly, ordersController.getAll);
router.get('/:id', authMiddleware, adminOnly, ordersController.getOne);
router.patch('/:id', authMiddleware, adminOnly, ordersController.updateStatus);
router.delete('/:id', authMiddleware, adminOnly, ordersController.delete);

export default router;