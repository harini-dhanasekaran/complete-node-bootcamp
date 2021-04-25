const express = require('express');
const router = express.Router();
//to access the route functions
const tourController = require(`${__dirname}/../controllers/tourControllers`);

router.param('id',tourController.checkId);

//usual routing calls
router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.addTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.patchTour)
  .delete(tourController.delTour);
module.exports = router;
