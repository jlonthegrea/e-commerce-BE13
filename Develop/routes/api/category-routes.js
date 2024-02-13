const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  const allCategories = await Category.findAll({
    include: [{model: Product}]
  });
  res.json(allCategories);
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.json(categoryId);
});

// create a new category
router.post('/', async (req, res) => {
  const createACategory = await Category.create(req.body);
  res.json(`${req.method} request recieved`);
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  const categoryId = await Category.findByPk(req.params.id);
  await categoryId.update(req.body);
  await categoryId.save();
  res.json(`${req.method} request recieved`);
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  const deleteACategory = await Category.findByPk(req.params.id);
  await deleteACategory.destroy();
  res.json(`${req.method} request recieved`);
});

module.exports = router;
