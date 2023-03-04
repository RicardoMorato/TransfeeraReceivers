export const validationPatterns = {
  email: /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/,
  cpf: /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/,
  cnpj: /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
  phone: /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/,
  randomKey: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
};