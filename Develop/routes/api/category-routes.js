const router = require('express').Router();
const { Category, Product } = require('../../models');

// find all categories
// be sure to include its associated Products
router.get('/', (req, res) => {
  Category.findAll({
    include: [{
      model: Product 
    }]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(error);
    res.status(500).json(error);
  })
});

 // find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id 
    }, 
    include: [{
      models: Product 
    }]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({
        message: 'There is not a category with this id.'
      });
      return;
    } res.json(dbCategoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name 
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error); 
  });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id 
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({
        message: 'There is not a category with this id.'
      });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id 
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({
        message: 'There is not a category with this id.'
      });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

module.exports = router;
