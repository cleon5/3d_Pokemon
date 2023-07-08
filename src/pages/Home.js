import Glb from "../components/Glb"
import { Suspense, useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [Pokemon, setPokemon] = useState([])

  const endpoint = "https://beta.pokeapi.co/graphql/v1beta";
  const headers = {
    "content-type": "application/json",
  };
  const graphqlQuery = {
    "query": `
    query pokemon {
      pokemon_v2_pokemonevolution(where: {id: {_eq: 1}}) {
        min_level
        pokemon_v2_pokemonspecy {
          capture_rate
          pokemon_v2_evolutionchain {
            pokemon_v2_pokemonspecies {
              base_happiness
              capture_rate
              evolution_chain_id
              evolves_from_species_id
              forms_switchable
              gender_rate
              generation_id
              growth_rate_id
              name
              has_gender_differences
              hatch_counter
              is_legendary
              is_baby
              pokemon_color_id
              pokemon_habitat_id
              pokemon_shape_id
              is_mythical
              pokemon_v2_pokemonhabitat {
                pokemon_v2_pokemonhabitatnames {
                  name
                }
              }
            }
          }
        }
      }
      pokemon_v2_pokemon(where: {id: {_eq: 1}}) {
        base_experience
        height
        id
        name
        order
        pokemon_species_id
        pokemon_v2_pokemonabilities {
          slot
          pokemon_v2_ability {
            name
          }
        }
        weight
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
      pokemon_v2_pokemonspecies_by_pk(id: 1) {
        name
        base_happiness
        capture_rate
        evolution_chain_id
        evolves_from_species_id
        forms_switchable
        gender_rate
        generation_id
        growth_rate_id
        has_gender_differences
        hatch_counter
        is_mythical
        is_legendary
        is_baby
        id
      }
    }     
    `,
    "variables": null,
    "operationName":"pokemon"
  };

   const getPokemon = async() => {
        axios({
          url: endpoint,
          method: 'post',
          headers: headers,
          data: graphqlQuery
        }).then(async(data) => {
          setPokemon(data.data.data)
          console.log(Pokemon)
        });    
   }
    
    useEffect(() => {
      getPokemon()
    }, [])
    
  return (
    <div className="pokedex" style={{}}>
      <div className="modelSection">
        <Glb />
      </div>

      <div className="infomation">
        <div className="title">
          <h1>Pokedex</h1>
          <hr/>
        </div>

        <div className="section">
          <h2>Stacks</h2>

        </div>
        <div className="section">
          <h2>Habilities</h2>
        </div>
        <div className="section">
          <h2>Habitats</h2>
        </div>
        <div className="section">
          <h2>Evolutions</h2>
        </div>

      
        <h2>{Pokemon && Pokemon?.pokemon_v2_pokemonspecies_by_pk?.name}</h2>
        <h2>{/*Pokemon?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonabilities[0]?.pokemon_v2_ability?.name*/}</h2>

        <h2>Habilities</h2>
        <h2>Sprites</h2>
        <h2>habitats</h2>
        <h2>evoluciones</h2>
        <h2>puntos de poder</h2>
        <h2>caracteristicas</h2>

        <h2>Habilities</h2>
        <h2>Sprites</h2>
        <h2>habitats</h2>
        <h2>evoluciones</h2>
        <h2>puntos de poder</h2>
        <h2>caracteristicas</h2>
        

        <h2>klads</h2>
        <h2>klads</h2>
        <h2>klads</h2>
        <h2>klads</h2>
        <h2>klads</h2>
      </div>
    </div>
  );
}

export default Home;
