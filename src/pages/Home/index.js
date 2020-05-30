import React, { Component } from 'react';
import axios from 'axios';
import CardPokemon from  '../CardPokemon/index.js'
import {
  Card, CardHeader,
} from 'reactstrap';
import './home.css';
import Header from '../../componentes/header/index.js';

export default class Home extends Component {

  state = {
    url: 'https://pokeapi.co/api/v2/pokemon?limit=50',
    pokemon: null
  };

  async componentDidMount(){
    const res = await axios.get(this.state.url);
    this.setState({pokemon: res.data['results']});
  }
  render (){
    return (
      <div className="">
        <Header/>
        {this.state.pokemon ? ( // if there are pokemon show it
        
        <div className="row pokemon">
        {this.state.pokemon.map(pokemon => (
          <CardPokemon  
          key={pokemon.name}
          name={pokemon.name}
          url={pokemon.url}
          
          />
        ))}
        
        </div>) 
        
        : (<h1>Loading Pokemon</h1>) } 
        
       </div>
      )
  }
      
  }




     