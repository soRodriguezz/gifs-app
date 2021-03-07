import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private apiKey: string = 'gijXYTzblD86uSfmRC2KJrfo7Rk6pLAe';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    //? spread para que me lea un array por separado 
    return [...this._historial];
  }

  //? para inyectar esta funcion hay que importar HttpClientModulo, se encuentra en este caso de forma global en 'app.module.ts'
  constructor( private http: HttpClient){}

  //? los '' sirven para obligar que siempre debe haber un valor
  buscarGifs( query: string = ''){

    //? para lo que se ingrese se almacene todo en minuscula sin inportar lo que ingrese el usuario
    query = query.trim().toLowerCase();

    //? sentencia para que los campos ingresados no se repitan
    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    //? Se reemplazo por fetch para realizar una consulta http con los datos que se paso por url a la api
    //* Mando la data ingresada por la variable query
    //* Se recomiendo poner el tipo de dato en el GET, porque viene de tipo generico (esta apuntando a 'gifs.interface.ts')
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=gijXYTzblD86uSfmRC2KJrfo7Rk6pLAe&q=${ query }&limit=10`)
      .subscribe(( resp ) => {
        console.log( resp.data );
        this.resultados = resp.data;
      });

    
  }

}
