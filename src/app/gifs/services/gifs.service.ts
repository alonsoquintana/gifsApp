import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'HuMfr5sdEVTYLROg3tuWEWtEBCpcgTC0';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  
  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {}



  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();
    
    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._historial) )

    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=HuMfr5sdEVTYLROg3tuWEWtEBCpcgTC0&q=${ query }&limit=10`)
      .subscribe( ( resp ) =>{
        console.log( resp.data );
        this.resultados = resp.data;
      });

  }
  
  
}
