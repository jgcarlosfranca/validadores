    module.exports = {

  /**
   * 
   * @param {cnpjParaValidar} entrada 
   * @returns (cnpjNumerico, validoBolean)
   */
  async validadorCNPJ(entrada) {
    return new Promise((resolve) => {
      (async () => {
        let cnpjValido = false
        let entradaString = (entrada instanceof String) ? entrada.toString() : entrada
        if (entradaString.length == 14) {
          entradaString = entradaString.substring(0, 2) + '.' +
            entradaString.substring(2, 5) + '.' +
            entradaString.substring(5, 8) + '/' +
            entradaString.substring(8, 12) + '-' +
            entradaString.substring(12, 16)
        }

        if (entradaString.length == 18) {
          let cnpj = entradaString.trim()

          cnpj = cnpj.replace(/\./g, '');
          cnpj = cnpj.replace('-', '');
          cnpj = cnpj.replace('/', '');
          cnpj = cnpj.split('');

          let v1 = 0;
          let v2 = 0;
          let aux = false;

          for (let i = 1; cnpj.length > i; i++) {
            if (cnpj[i - 1] != cnpj[i]) {
              aux = true;
            }
          }
          if (aux == false) cnpjValido = false
          for (let i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
              v1 += cnpj[i] * p1;
            } else {
              v1 += cnpj[i] * p2;
            }
          }
          v1 = (v1 % 11);
          if (v1 < 2) v1 = 0
          else {
            v1 = (11 - v1);
          }
          if (v1 != cnpj[12]) cnpjValido = false

          for (let i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
              v2 += cnpj[i] * p1;
            } else {
              v2 += cnpj[i] * p2;
            }
          }

          v2 = (v2 % 11);

          if (v2 < 2) v2 = 0
          else {
            v2 = (11 - v2);
          }

          if (v2 != cnpj[13]) cnpjValido = false
          else {
            cnpjValido = true
          }
        } resolve({
          cnpjValido: cnpjValido,
          cnpj: entradaString.replace(/\D/g, ''),
        })
      })();
    });
  },
};