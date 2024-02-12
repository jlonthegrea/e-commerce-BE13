const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// find all tags
// be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{
      as: 'productTag' 
    }]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      as: 'productTag'
    }]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({
        message: 'Cannot find tag with this id.'
      });
      return;
    }
    res.json(dbTagData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name 
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({
        message: 'Cannot find tag with this id.'
      });
      return;
    }
    res.json(dbTagData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id 
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({
        message: 'Cannot find tag with this id.'
      });
      return;
    }
    res.json(dbTagData);
  })
  .catch(error => { ;
  res.status(500).json(error);
  });
});


module.exports = router;
