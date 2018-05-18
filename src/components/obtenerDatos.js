import {Url} from './Url.js'

export function obtenerDatos(loginParams){
   return fetch(`${Url}/users`, {
      headers: new Headers({
     "Authorization": loginParams,
     "Content-Type":"application/json",
      "Accept":"application/json"
   }), 
    })
      .then((res) => {
        return res.json()

      }
     )
}


