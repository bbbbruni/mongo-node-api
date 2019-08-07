const ProductModel = require('../models/product');

exports.get = () => {
  return ProductModel.find(
    { active: true },
    'id slug title price',
  )
}

exports.post = async (body) => {
  const newProduct = await new ProductModel(body);
  return newProduct.save();
}

exports.put = (id, body) => {
  return ProductModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: { ...body }
    }
  )
}

exports.delete = (id) => {
  return ProductModel.findByIdAndRemove({ _id: id });
}

exports.getBySlug = (slug) => {
  return ProductModel.findOne(
    { slug },
    'slug title description',
  )
}

exports.getById = (id) => {
  return ProductModel.findById(
    { _id: id },
    'id slug title description',
  )
}

exports.getByTag = (tag) => {
  return ProductModel.find(
    { tags: tag },
    'tags id slug title',
  )
}