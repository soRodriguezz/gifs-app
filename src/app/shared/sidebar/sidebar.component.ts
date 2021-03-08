import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial(){
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) { }

  // ANCHOR funcion para mostrar resultados del historial
  buscar(termino: string){
    this.gifsService.buscarGifs(termino);
  }

}
