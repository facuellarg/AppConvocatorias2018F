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
        if(!res.ok){
            throw new Error(res.status + " "+res.code)
        }return res.json()
      }
     ).then(jsonResponse=>{
         return jsonResponse
       }).catch(error=>{console.log(error.message)}

       )
}

  
