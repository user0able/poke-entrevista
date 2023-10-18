import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { Observable, finalize, forkJoin, map, switchMap, tap } from 'rxjs';
import { ResponseList, Result, Pokemon } from '@services/pokeapi.models';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  constructor(private http: HttpClient) {}
  private apiURL = env.apiURL;

  public LIST_RESULT!: ResponseList<Result[]>;
  public LIST_POKEMON: Array<Pokemon> = [];

  public listPokemonResults(): Observable<Pokemon[]> {
    return this.getPokemonList().pipe(
      switchMap((data: ResponseList<Result[]>) => {
        const detailRequests = data.results.map((result) =>
          this.getPokemonDetails(result.url).pipe(
            map((data: Pokemon) => ({
              visible: true,
              name: data.name,
              order: data.order,
              weight: data.weight,
              height: data.height,
              urlDetail: result.url,
              id: parseInt(result.url.split('/')[6]),
            }))
          )
        );
        return forkJoin(detailRequests);
      }),
      tap((pokemons) => (this.LIST_POKEMON = pokemons)),
      finalize(() => console.log('finalize', this.LIST_POKEMON))
    );
  }

  getPokemonList(): Observable<ResponseList<Result[]>> {
    return this.http.get<ResponseList<Result[]>>(
      `${this.apiURL}/pokemon/?limit=151`
    );
  }

  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${url}`);
  }
}
