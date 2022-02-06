const { cpf } = require('cpf-cnpj-validator');

const formatCpf = (value) => cpf.format(value);

const isValidCpf = (value) => cpf.isValid(value);

module.exports = {
  formatCpf,
  isValidCpf,
};
