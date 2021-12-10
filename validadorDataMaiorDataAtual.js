module.exports = {
    /**
   * Valida data maior q a data atual
   * @param {dataParaValidar} entrada 
   * @returns (data, validoBolean)
   */
    async validadorData(data) {
    return new Promise((resolve) => {
      (async () => {
        let dateNow = new Date()
        let dataValidaBolean = []
        let validador = []
        let dataValidada = []
        for (let i = 0; i < 5; i++) {
          validador[i] = data[i].replace(/\D/gim, '')
          dataValidada[i] = validador[i].substring(0, 4) + '-' + validador[i].substring(4, 6) + '-' + validador[i].substring(6, 8)
          validador[i] = new Date(validador[i].substring(0, 4) + '-' + validador[i].substring(4, 6) + '-' + validador[i].substring(6, 8))
          if (validador[i] instanceof Date && !isNaN(validador[i].valueOf())) {
            dataValidaBolean[i] = !!(dateNow < validador[i])
          } else {
            continue
          }
        }
        resolve({
          dataValida: dataValidaBolean,
          data: dataValidada
        })
      })();
    });
  },
}