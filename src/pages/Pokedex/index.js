import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardHeader, CardBody, CardTitle,
  } from 'reactstrap';
  import './pokedex.css';

const TYPE_COLORS = {
bug: 'B1C12E',
dark: '4F3A2D',
dragon: '755EDF',
electric: 'FCBC17',
fairy: 'F4B1F4',
fighting: '823551D',
fire: 'E73B0C',
flying: 'A3B3F7',
ghost: '6060B2',
grass: '74C236',
ground: 'D3B357',
ice: 'A3E7FD',
normal: 'C8C4BC',
poison: '934594',
psychic: 'ED4882',
rock: 'B9A156',
steel: 'B5B5C3',
water: '3295F6'
};

export default class Pokedex extends Component {
    
    state = {
        name: '',
        pokemonNumber: '',
        imageUrl: '',
        types: [],
        description: '',
        statTitleWidth: 3,
        statBarWidth: 9,
        stats: {
          hp: '',
          attack: '',
          defense: '',
          speed: '',
          specialAttack: '',
          specialDefense: '',
        },
        height: '',
        weight: '',
        eggGroups: '',
        catchRate: '',
        abilities: '',
        themeColor: '#EF5350'
      };
    

    async componentDidMount(){
        
        const { pokemonNumber } = this.props.match.params;

        // Urls information
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}/`;
        
        // Get information
        const pokemonRes = await axios.get(pokemonUrl);
        const name = pokemonRes.data.name;
        const imgUrl = pokemonRes.data.sprites.front_default;
        this.setState({name});

        let { attack, defense, hp, specialAttack, specialDefense, speed } = '';

        pokemonRes.data.stats.map( stat => {
            switch(stat.stat.name){
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat[ 'base_stat']; 
                    break;
                case 'defense':
                    defense = stat['base_stat']; 
                    break;
                case 'hp':
                   hp = stat['base_stat']; 
                   break;
                case 'special-attack':
                    specialAttack = stat['base_stat']; 
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat']; 
                    break;
                    default:
                    break;
            }
        } );
      
        const height = pokemonRes.data.height;
        const weight = pokemonRes.data.weight;
        
        const types = pokemonRes.data.types.map(type => type.type.name);
        const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
        
        const abilities = pokemonRes.data.abilities.map(ability => { 
            return ability.ability.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
        });

        // get description
        await axios.get(pokemonSpeciesUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if ( flavor.language.name === 'en'){
                    description = flavor.flavor_text;
                    return;
                }
            });
            const catchRate = res.data['capture_rate'];
            const eggGroups = res.data['egg_groups'].map( group => { return group.name} );
            
            this.setState({
                description,
                catchRate,
                eggGroups,
              });
        });
        
        this.setState({
          imgUrl,
          pokemonNumber,
          name,
          types,
          stats: {
            hp,
            attack,
            defense,
            speed,
            specialAttack,
            specialDefense,
          },
          themeColor,
          height,
          weight,
          
          abilities,  
        });
        
    }

    
    
    render (){
        return (
            <div className="col pokedex">
              <Card>
                  <CardHeader> 

                      <div className="row">
                            <div className="col-5"> 
                                <h5>{this.state.pokemonNumber}</h5>
                            </div>
                            <div className="col-7">
                            <div className="float-right">
                                {this.state.types.map(type=> (
                                    <span 
                                    key={type}
                                    className="badge badge-primary badge-pill mr-1"
                                    style={{
                                        backgroundColor: `#${TYPE_COLORS[type]}`,
                                        color: 'white'
                                      }}
                                    >
                                    {type}
                                    </span>
                                ))}
                            </div>
                      </div>
                      </div>                      
                  </CardHeader>
                 <CardBody>
                    <div className="row">
                        <div className="col-2"> 
                        <img src={this.state.imgUrl} className="card-img-top rounded mx-auto mt-2"/>
                        </div>
                         
                        <div className="col-10"> 
                            <h3 className="mx-auto">{this.state.name}</h3>

                            <div className="row align-items-center">
                                <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                    HP
                                </div>
                                <div className={`col-12 col-md-${this.state.statBarWidth}`}> 
                                    <div className="progress">
                                        <div className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${this.state.stats.hp}%`,
                                            backgroundColor: `#${this.state.themeColor}`
                                        }}
                                        aria-valuenow="25"
                                        aria-valuemin="0"
                                        aria-valuemax="100">  
                                        <small>{this.state.stats.hp}</small>         
                                        </div>
                                    </div>
                                </div>
                            </div>
                                    
                            <div className="row align-items-center">
                                <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                    Speed
                                    
                                </div>
                                <div className={`col-12 col-md-${this.state.statBarWidth}`}> 
                                    <div className="progress">
                                        <div className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${this.state.stats.speed}%`,
                                            backgroundColor: `#${this.state.themeColor}`
                                        }}
                                        aria-valuenow="25"
                                        aria-valuemin="0"
                                        aria-valuemax="100">  
                                        <small>{this.state.stats.speed}</small>         
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                    Special Defense
                                </div>
                                <div className={`col-12 col-md-${this.state.statBarWidth}`}> 
                                    <div className="progress">
                                        <div className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${this.state.stats.specialDefense}%`,
                                            backgroundColor: `#${this.state.themeColor}`
                                        }}
                                        aria-valuenow="25"
                                        aria-valuemin="0"
                                        aria-valuemax="100">  
                                        <small>{this.state.stats.specialDefense}</small>         
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row align-items-center">
                                <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                    Special Attack
                                </div>
                                <div className={`col-12 col-md-${this.state.statBarWidth}`}> 
                                    <div className="progress">
                                        <div className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${this.state.stats.specialAttack}%`,
                                            backgroundColor: `#${this.state.themeColor}`
                                        }}
                                        aria-valuenow="25"
                                        aria-valuemin="0"
                                        aria-valuemax="100">  
                                        <small>{this.state.stats.specialAttack}</small>         
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                    Defense
                                </div>
                                <div className={`col-12 col-md-${this.state.statBarWidth}`}> 
                                    <div className="progress">
                                        <div className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${this.state.stats.defense}%`,
                                            backgroundColor: `#${this.state.themeColor}`
                                        }}
                                        aria-valuenow="25"
                                        aria-valuemin="0"
                                        aria-valuemax="100">  
                                        <small>{this.state.stats.defense}</small>         
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                    Attack
                                </div>
                                <div className={`col-12 col-md-${this.state.statBarWidth}`}> 
                                    <div className="progress">
                                        <div className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${this.state.stats.attack}%`,
                                            backgroundColor: `#${this.state.themeColor}`
                                        }}
                                        aria-valuenow="25"
                                        aria-valuemin="0"
                                        aria-valuemax="100">  
                                        <small>{this.state.stats.attack}</small>         
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="row align-items-center description">
                        <div className="col-10">
                            <p>{this.state.description}</p>
                        </div>   
                    </div>
                </CardBody>
                <CardBody className="profile">
                    <div className="row mt-1 ">
                        <h3>Profile</h3>      
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row" >
                                <div className="col-6">
                                    <h5>weigth:</h5>
                                </div>
                                <div className="col-6">
                                    <h5>{this.state.weight} hg</h5>
                                </div>

                                <div className="col-6">
                                    <h5>Height:</h5>
                                </div>
                                <div className="col-6">
                                    <h5>{this.state.height} dm</h5>
                                </div>

                                <div className="col-6">
                                    <h5>Catch rat:</h5>
                                </div>
                                <div className="col-6">
                                    <h5>{this.state.catchRate}</h5>
                                </div>

                            </div>               
                        </div>

                        <div className="col-6">
                            <div className="col-6">
                                <h5>Egg group:</h5>
                            </div>
                            <div className="col-6">
                                <h5>{this.state.eggGroups}</h5>
                                
                            </div>
                        </div>
                    </div>
                </CardBody>
                </Card>
              
          </div>
        )
    }
      
  }




     