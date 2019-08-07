const repository = require('../repositories/product-repository');
const ValidatorContract = require('../validators');

exports.get = async (req, res, next) => {
  try {
    const products = await repository.get();
    res.status(200).send(products);
  }
  catch (err) {
    res.status(400).send({ error: err });
  }
};

exports.post = async (req, res, next) => {
  const { title, price, description } = req.body;
  const validation = new ValidatorContract();

  validation.hasMinLength(title, 5, 'the title length must be greater than 5');
  validation.hasMinInteger(price, 0, 'the price field must be greater than zero');
  validation.hasMinLength(description, 50, 'the description length field must be greater than 50');

  if (validation.hasErrors) {
    res.status(401).send(validation.AllErrors);
    return;
  }

  try {
    const product = await repository.post(req.body);
    res.status(201).send({ message: 'OK' });
  }
  catch(err) {
    res.status(400).send({ message: 'Error to add new product', error: err });
  }
};

exports.put = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updateProduct = await repository.put(id, req.body);
    res.status(200).send(updateProduct);
  }
  catch(err) {
    res.status(400).send({ error: err });
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.body;

  try {
    const removedProduct = await repository.delete(id);
    res.status(200).send(removedProduct)
  }
  catch(err) {
    res.status(400).send({ error: err });
  }
};

exports.getBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const product = await repository.getBySlug(slug);
    res.status(200).send(product);
  }
  catch(err) {
    res.status(400).send({ error: err });
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await repository.getById(id);
    res.status(200).send(product);
  }
  catch(err) {
    res.status(400).send({ error: err })
  }
};

exports.getByTags = async (req, res, next) => {
  const { tag } = req.params;

  try {
    const product = await repository.getByTag(tag);
    res.status(200).send(product);
  }
  catch(err) {
    res.status(400).send({ error: err })
  }
};