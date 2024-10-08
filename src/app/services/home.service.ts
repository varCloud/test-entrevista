import { PokemonModel, UrlsPokemon, UrlsPokemonModel } from './../models/urls-pokemon';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private apollo: Apollo) {

  }

  getListPokemon(): Observable<UrlsPokemonModel[]> {
    const gqlVariables = {
      limit: 25,
      offset: 1,
    };

    const gqlQuery = gql`query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        status
        message
        results {
          url
          name
          image
        }
      }
    }`

    return this.apollo
      .watchQuery({
        query: gqlQuery,
        variables: gqlVariables
      }).valueChanges.pipe(
        map((result: any) => result?.data?.pokemons?.results.map((item: any) => new UrlsPokemonModel(item)))
      )
  }

  findPokemonByName(term: string) : Observable<PokemonModel>{

    const GET_POKEMON_BY_NAME_CONTAINS = gql`
    query getPokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        types {
          type {
            name
          }
        }
        height
        weight
        sprites {
          front_default
        }
      }
    }
  `;

    const gqlVariables = { name: term }
    return this.apollo
      .watchQuery({
        query: GET_POKEMON_BY_NAME_CONTAINS,
        variables: gqlVariables
      }).valueChanges.pipe(
        map((data: any) => new PokemonModel(data.data?.pokemon))
      )
  }

  public findPokemonById(id: number) : Observable<UrlsPokemonModel[]> {
    const GET_POKEMON_BY_NAME_CONTAINS = gql`
        query getPokemonById($id: Int!) {
          pokemon(id: $id) {
            id
            name
            types {
              type {
                name
              }
            }
            height
            weight
            sprites {
              front_default
            }
          }
        }
  `;

    const gqlVariables = { id: 25 }
    return this.apollo
      .watchQuery({
        query: GET_POKEMON_BY_NAME_CONTAINS,
        variables: gqlVariables
      }).valueChanges.pipe(
        map((result: any) => result?.data?.pokemons?.results.map((item: any) => new UrlsPokemonModel(item)))
      )
  }
}
