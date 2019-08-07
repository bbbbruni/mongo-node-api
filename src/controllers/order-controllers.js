const guid = require('guid');
const repository = require('../repositories/order-repository');

exports.get = async (req, res, next) => {
  try {
    const order = await repository.get();
    res.status(200).send(order);
  }
  catch (err) {
    res.status(400).send({ error: err });
  }
}

exports.post = async (req, res, next) => {
  const { customer, items } = req.body;
  const number = guid.raw().substring(0, 6);

  try {
    const order = await repository.create({
      customer,
      items,
      number
    });
    res.status(201).send({ message: "Pedido cadastrado!", order });
  }
  catch(err) {
    res.status(400).send({ error: err });
  }
}