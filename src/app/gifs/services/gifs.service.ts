import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(){
    //* spread para que me lea un array por separado 
    return [...this._historial];
  }

  //* los '' sirven para obligar que siempre debe haber un valor
  buscarGifs( query: string = ''){

    //* para lo que se ingrese se almacene todo en minuscula sin inportar lo que ingrese el usuario
    query = query.trim().toLowerCase();

    //* sentencia para que los campos ingresados no se repitan
    if(!this._historial.includes(query)){
      this._historial.unshift( query );
    }
    this._historial = this._historial.splice(0,10);
    console.log(this._historial); 
  }

}
