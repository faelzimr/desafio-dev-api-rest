const Yup = require('yup');

const checkForCreatedBearer = (params) => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'please-enter-your-full-name')
      .required('name-is-a-required-field'),
    cpf: Yup.string().required('cpf-is-a-required-field'),
  });

  return schema.validate(params, {
    abortEarly: false,
    stripUnknown: true,
  });
};
module.exports = {
  checkForCreatedBearer,
};
