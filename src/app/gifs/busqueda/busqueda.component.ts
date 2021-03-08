import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent {
  
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  // NOTE Inyecto el servicio que esta inciado de manera global
  constructor(private gifsService: GifsService){}

  buscar() {
  
    const valor = this.txtBuscar.nativeElement.value;

    // NOTE validacion para que el campo no ingrese vacio
    if(valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
    
  }

}
