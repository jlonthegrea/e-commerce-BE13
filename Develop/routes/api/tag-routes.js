const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
router.get('/', async(req, res) => {
  const allTags = await Tag.findAll({
    include: [{model: Product, as: 'productTag'}]
  });
  res.json(allTags);
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  const tagId = await Tag.findByPk(req.params.id, {
    include: [{ model: Product, as: 'productTag' }]
  });
  res.json(tagId);
});

// create a new tag
router.post('/', async (req, res) => {
  const createATag = await Tag.create(req.body);
  res.json(`${req.method} request recieved`);
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  const tagId = await Tag.findByPk(req.params.id);
  await tagId.update(req.body);
  await tagId.save();
  res.json(`${req.method} request recieved`);
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  const deleteATag = await Tag.destroy({where: {id:req.params.id}});
  res.json(`${req.method} request recieved`);
});


module.exports = router;
