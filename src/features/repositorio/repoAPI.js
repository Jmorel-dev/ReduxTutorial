export function fetchRestfulReposByUserId(userId) {

  console.log('llamando a la api')
    return new Promise((resolve, reject) =>
      fetch(`https://api.github.com/users/${userId}/repos`, 
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Plataforma': Platform.OS
          }),
        })
      .then(async response => await response.json())
      .then(async data => {
        if(data?.message !== undefined){
          reject(data)
        }else{
          resolve(data)
        }        
      })
      .catch(async function (error) {
        reject({ "codigoError": 0, "codigoRetorno": 500, "mensaje": "Recurso no pudo procesar su solicitud, debido a un error externo.", "success": false })
      })
    );
  }