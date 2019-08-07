const md5 = require('md5');
const CustomerModel = require('../models/customer');

exports.get = () => {
  return CustomerModel.find({});
}

exports.getById = (id) => {
  return CustomerModel.findById({ _id: id });
}

exports.create = async (body) => {
  const { name, email, password, phone } = body;
  const incryptedPassword = md5(password + global.SALT_KEY);

  const newCustomer = await new CustomerModel({
    name,
    email,
    phone,
    password: incryptedPassword,
  });

  newCustomer.save();
}

exports.put = (id, body) => {
  body.password = body.password && md5(body.password + global.SALT_KEY);

  return CustomerModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: { ...body }
    }
  );
}

exports.delete = (id) => {
  return CustomerModel.findByIdAndDelete({ _id: id });
}

exports.authenticate = ({ email, password }) => {
  return CustomerModel.findOne({ email, password });
}