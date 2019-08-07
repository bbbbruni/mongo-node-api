const md5 = require('md5');
const repository = require('../repositories/customer-repository');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

exports.get = async (req, res) => {
  try {
    const customers = await repository.get();
    res.status(200).send(customers);
  } catch (err) {
    res.status(400).send({ error: err });
  }
}

exports.getById = async (req, res) => {
  try {
    const customer = await repository.getById(req.params.id);
    res.status(200).send(customer);
  } catch (err) {
    res.status(400).send({ error: err });
  }
}

exports.post = async (req, res) => {
  try {
    const customer = await repository.create(req.body);

    emailService.send(
      req.body.email,
      'Welcome to Node Store!',
      global.EMAIL_TMPL.replace('{0}', req.body.name)
    );

    res.status(201).send({ message: 'Customer created!', customer });
  } catch (err) {
    res.status(400).send({ message: 'Error to add new customer', error: err });
  }
}

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await repository.authenticate({
      email,
      password: md5(password + global.SALT_KEY),
    });

    if (!customer) {
      res.status(404).send({
        message: 'Invalid email or password!',
      });
      return;
    }

    const token = await authService.generateToken({ customer });

    res.status(201).send({
      token,
      customer,
    });
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

exports.put = async (req, res) => {
  const { id } = req.params;

  try {
    await repository.put(id, req.body);
    res.status(200).send({ message: 'Customer updated!' });
  } catch (err) {
    res.status(400).send({ error: err });
  }

}

exports.delete = async (req, res) => {
  try {
    const customer = await repository.delete(req.body.id);
    res.status(200).send({ message: 'Removed successfully!', customer });
  } catch (err) {
    res.status(400).send({ error: err });
  }
}