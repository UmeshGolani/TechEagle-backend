const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Middleware to verify JWT

router.get('/', activityController.getAllActivities);
router.post('/', activityController.createActivity);
router.put('/:activityId', activityController.updateActivity);
router.delete('/:activityId', activityController.deleteActivity);

module.exports = router;
