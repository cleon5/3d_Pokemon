import Glb from "../components/Glb"
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { Select } from "@react-three/drei";

function Home() {
  const [Pokemon, setPokemon] = useState([])
  const [Habiliti, setHabiliti] = useState([])
  const [Habitats, setHabitats] = useState([])
  const [Types, setTypes] = useState([])
  const [Evoluciones, setEvoluciones] = useState([])
  const [modelAct, setmodelAct] = useState("./pokemons/bulbasaur.glb")

  const endpoint = "https://beta.pokeapi.co/graphql/v1beta";
  const headers = {
    "content-type": "application/json",
  };
  const query =  (id)=>{
    return `query pokemon {
      pokemon_v2_pokemonevolution(where: {id: {_eq: ${id}}}) {
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
      pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
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
      pokemon_v2_pokemonspecies_by_pk(id: ${id}) {
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
    `
  }

  const getPokemon = async (id) => {
    axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: {
        query: query(id),
        variables: null,
        operationName: "pokemon",
      },
    }).then(async (data) => {
      setPokemon(data.data.data);
      setHabiliti(
        data.data.data.pokemon_v2_pokemon[0].pokemon_v2_pokemonabilities
      );
      setHabitats(
        data.data.data.pokemon_v2_pokemonevolution[0].pokemon_v2_pokemonspecy
          .pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies[0]
          .pokemon_v2_pokemonhabitat.pokemon_v2_pokemonhabitatnames
      );
      setEvoluciones(
        data.data.data.pokemon_v2_pokemonevolution[0].pokemon_v2_pokemonspecy
          .pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies
      );
      setTypes(data.data.data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes);
    });
  };

   const poke= [
    {
      pokemon:"Bulbasaur",
      id:1,
      model:"./pokemons/bulbasaur.glb",
    },
    {
      pokemon:"Charmander",
      id:4,
      model: "./pokemons/charmander.glb",
    },
    {
      pokemon:"squirtle",
      id:6,
      model:"./pokemons/squirtle.glb",
    }
   ]
   const selectPoke = (id) =>{
      console.log(id)  
      getPokemon(id)
      setmodelAct(poke.filter(x=> x.id==id &&  x.model))
      console.log(modelAct)
   }

  const colors = ["red", "blue", "green", "blueviolet", "darkblue", "teal", "crimson", "forestgreen", ]
  useEffect(() => {
    getPokemon(1)
    reloadCom()
  }, [])

  const rdn = ()=>{
    return Math.floor(Math.random() * (colors.length + 1))
  }
  const reloadCom =()=> {
    const forceUpdate = useForceUpdate()
    console.log(modelAct.length == 1 ? modelAct[0].model:modelAct)
    return <Glb pokemon={poke} select={selectPoke} model={modelAct.length == 1 ? modelAct[0].model:modelAct} forceUpdate={forceUpdate}/>
  } 
  const GlbComponet = ()=>{
    return reloadCom()
  }
  const [value, setValue] = useState(0); 
function useForceUpdate(){
    return () => setValue(value => value + 1); 

}
  return (
    <div className="pokedex" style={{}}>
      <div className="modelSection">
        <Suspense>
          {reloadCom()}
          </Suspense>
        
      </div>

      <div className="infomation">
        <div className="title">
          <h1>Pokedex</h1>
          <hr/>
        </div>

        <div className="section">
          <h2>Stacks</h2>
          <div className="stacks">
            <p>height: {Pokemon?.pokemon_v2_pokemon && Pokemon?.pokemon_v2_pokemon[0]?.height}</p>
            <p>Weight: {Pokemon?.pokemon_v2_pokemon && Pokemon?.pokemon_v2_pokemon[0]?.weight}</p>
            <p>base_experience: {Pokemon?.pokemon_v2_pokemon && Pokemon?.pokemon_v2_pokemon[0]?.base_experience} </p>
            <p>Capture: {Pokemon?.pokemon_v2_pokemonspecies_by_pk?.capture_rate}%</p>
            <p>Min level: {Pokemon?.pokemon_v2_pokemonevolution && Pokemon?.pokemon_v2_pokemonevolution[0]?.min_level}</p>
          </div>
          
        </div>
        <div className="section">
          <h2>Type</h2>
          <div className="types">
             {Types && 
          Types.map((type, key)=>
            <p key={key} className="Badge" style={{"background-color":colors[rdn()]}} >{type.pokemon_v2_type.name}</p>
          )}
          </div>
        </div>
        <div className="section">
          <h2>Habilities</h2>
          <div  className="types">
           {Habiliti && 
              Habiliti.map((habiliti, key)=>
            <p key={key} className="Badge" style={{"background-color":colors[rdn()]}}>{habiliti.pokemon_v2_ability.name}</p>
          )} 
          </div>
          
        </div>

        <div className="section">
          <h2>Habitats</h2>
          <div className="types">
            {Habitats && 
          Habitats.map((habitat, key)=>
            <p key={key} className="Badge" style={{"background-color":colors[rdn()]}}>{habitat.name}</p>
          )}
          </div>
          
        </div>

        <div className="section">
          <h2>Evolutions</h2>
          <div>
            <div>
            {Evoluciones && 
              Evoluciones.map((evo, key)=>
              <p key={key} className="evolution" style={{"background-color":colors[key]}}>name: {evo.name} </p>
            )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
