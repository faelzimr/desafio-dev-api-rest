const Yup = require('yup');

const checkForCreatedOperation = (params) => {
  const schema = Yup.object().shape({
    cpf: Yup.string().required('cpf-is-a-required-field'),
    operationTypeId: Yup.string().required('operationTypeId-is-a-required-field'),
    value: Yup.number().moreThan(0).required('value-is-a-required-field'),
  });

  return schema.validate(params, {
    abortEarly: false,
    stripUnknown: true,
  });
};

const checkForListOperation = (params) => {
  const schema = Yup.object().shape({
    perPage: Yup.number().default(10),
    page: Yup.number().default(1),
    startDate: Yup.date().required('startDate-is-a-required-field'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'endDate-cannot-be-before-startDate')
      .required('endDate-is-a-required-field'),
    cpf: Yup.string().required('cpf-is-a-required-field'),
  });

  return schema.validate(params, {
    abortEarly: false,
    stripUnknown: true,
  });
};
module.exports = {
  checkForCreatedOperation,
  checkForListOperation,
};
