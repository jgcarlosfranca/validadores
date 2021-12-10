module.exports = {

    /**
   * 
   * @param {cpfParaValidar} entrada 
   * @returns (cpfNumerico, validoBolean)
   */
    async validadorCPF(entrada) {
    return new Promise((resolve) => {
      (async () => {
        let cpfValido = false;
        let cpf = 0
        let entradaString = (entrada instanceof String) ? entrada.toString() : entrada
        if (entradaString.length === 14) {
          cpf = entradaString.trim()

          cpf = cpf.replace(/\./g, '')
          cpf = cpf.replace('-', '')
          cpf = cpf.split('')
        } else if (entradaString.length === 11){
          cpf = entradaString.trim()
        }

        if (cpf != 0) {
          let v1 = 0
          let v2 = 0
          let aux = false

          for (let i = 1; cpf.length > i; i++) {
            if (cpf[i - 1] != cpf[i]) aux = true
          }
          if (aux == false) cpfValido = false
          for (let i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
            v1 += cpf[i] * p;
          }
          v1 = ((v1 * 10) % 11)
          if (v1 == 10) v1 = 0
          if (v1 != cpf[9]) cpfValido = false
          for (let i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
            v2 += cpf[i] * p;
          }
          v2 = ((v2 * 10) % 11)
          if (v2 == 10) v2 = 0
          if (v2 != cpf[10]) cpfValido = false
          else {
            cpfValido = true
          }
          resolve({
            cpfValido: cpfValido,
            cpf: entradaString.replace(/\D/g, '')
          })
        }
      })();
    });
  },
}