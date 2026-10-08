import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';

export interface PokemonModel {
  _id?: string;
  name: string;
  type: string;
  level: number;
  nature: string;
}

@Service()
export class Pokemon {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/pokemon';

  readonly pokemonList = signal<PokemonModel[]>([]);

  fetchPokemon() {
    this.http.get<PokemonModel[]>(this.apiUrl).subscribe({
      next: (data) => this.pokemonList.set(data),
      error: (err) => console.error('Failed to fetch Pokemon', err),
    });
  }

  savePokemon(data: PokemonModel) {
    return this.http.post<PokemonModel>(this.apiUrl, data);
  }
}