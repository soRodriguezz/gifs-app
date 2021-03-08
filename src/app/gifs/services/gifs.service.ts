import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private apiKey: string = 'gijXYTzblD86uSfmRC2KJrfo7Rk6pLAe';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  // ANCHOR  resultado de los gifs
  public resultados: Gif[] = [];

  get historial(){
    // ANCHOR spread para que me lea un array por separado 
    return [...this._historial];
  }

  // ANCHOR para inyectar esta funcion hay que importar HttpClientModulo, se encuentra en este caso de forma global en 'app.module.ts'
  constructor( private http: HttpClient ){

    // ANCHOR Para mostrar lo que tenemos guardado en Local Storage
    if(localStorage.getItem('historial')){
      // NOTE Parse para volver lo que se convirtio de stringify a objeto (a lo que era). 
      // NOTE El signo "!" (se pone luego del parentecis de historial) es como decirle a angular --
      // NOTE que yo se lo que quiero hacer con mi codigo ignorando su sugerencia.
      // NOTE Si pongo corchetes le digo que puede retornarme vacio, en caso que se borre el local storage
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    }

  }

  // NOTE los '' sirven para obligar que siempre debe haber un valor
  buscarGifs( query: string = ''){

    // NOTE para lo que se ingrese se almacene todo en minuscula sin inportar lo que ingrese el usuario
    query = query.trim().toLowerCase();

    // ANCHOR sentencia para que los campos ingresados no se repitan
    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      // ANCHOR para mostrar solo 10 busquedas en el historial
      this._historial = this._historial.splice(0,10);

      // ANCHOR Para almacenar en localstorage con JS
      // NOTE Stringify toma cualquier objeto y lo transforma en string, en este caso historial almacena un array con todo lo que vayamos buscando
      localStorage.setItem('historial', JSON.stringify( this._historial ));

    }

    // ANCHOR para pasar los parametros de la URL de una manera bonita
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '15')
      .set('q', query);

    // NOTE Se reemplazo por fetch para realizar una consulta http con los datos que se paso por url a la api
    // ANCHOR Mando la data ingresada por la variable query
    // NOTE Se recomiendo poner el tipo de dato en el GET, porque viene de tipo generico (esta apuntando a 'gifs.interface.ts')
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params: params })
      .subscribe(( resp ) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      });

  }
}