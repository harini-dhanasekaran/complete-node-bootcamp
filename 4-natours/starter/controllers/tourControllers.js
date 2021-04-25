const fs = require('fs');
//to read the file that has json data about tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);


exports.checkID=(req,res,next,val=>{
  console.log(`${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
});
//route handlers
exports.delTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};
exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};
exports.addTour = (req, res) => {
  const newid = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newid }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tours: newTour },
      });
    }
  );
};

exports.patchTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: '<updated tour here...>' },
  });
};
