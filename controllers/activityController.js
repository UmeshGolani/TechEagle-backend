const Activity = require('../models/Activity');

exports.getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find({ user: req.userData.userId });
    res.status(200).json(activities);
  } catch (err) {
    next(err);
  }
};

exports.createActivity = async (req, res, next) => {
  try {
    const { activityName } = req.body;

    const newActivity = new Activity({
      activityName,
      user: req.userData.userId
    });

    await newActivity.save();

    res.status(201).json({ message: 'Activity created successfully' });
  } catch (err) {
    next(err);
  }
};

exports.updateActivity = async (req, res, next) => {
  try {
    const { activityName } = req.body;
    const { activityId } = req.params;

    await Activity.findByIdAndUpdate(activityId, { activityName });

    res.status(200).json({ message: 'Activity updated successfully' });
  } catch (err) {
    next(err);
  }
};

exports.deleteActivity = async (req, res, next) => {
  try {
    const { activityId } = req.params;

    await Activity.findByIdAndDelete(activityId);

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
    next(err);
  }
};
