const Yup = require('yup');

const checkForCreatedAccount = (params) => {
  const schema = Yup.object().shape({
    cpf: Yup.string().required('cpf-is-a-required-field'),
    number: Yup.string().required('number-is-a-required-field'),
    agency: Yup.string().required('agency-is-a-required-field'),
  });

  return schema.validate(params, {
    abortEarly: false,
    stripUnknown: true,
  });
};
module.exports = {
  checkForCreatedAccount,
};
