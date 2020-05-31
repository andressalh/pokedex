import React, { Component } from 'react';
import {
  Card, CardHeader,
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import './cardPokemon.css';
import { Link } from 'react-router-dom';

export default class CardPokemon extends Component {
  
    state = {
      name:'',
      imgUrl: '',
      pokemonNumber: '',
    }

    componentDidMount(){
      const {name, url} = this.props;
      const pokemonNumber = url.split('/')[url.split('/').length -2 ];
      const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonNumber}.png?raw=true`;
      
      this.setState({
        name: name,
        imgUrl: imgUrl,
        pokemonNumber: pokemonNumber
      });
    }

    render (){
            
      return (
        <div className="col-md-3 col-sm-6 mb-5">
          
          <Link className="LinkCard" to={`pokemon/${this.state.pokemonNumber}`}>
            <Card className="card">
                <CardHeader>
                  <h5>{this.state.pokemonNumber}</h5>
                  </CardHeader>
                
                <div> 
                <img className="card-img-top rounded mx-auto mt-2" src={this.state.imgUrl} alt="pokemon"/>
                </div>
                <div>
                  <h6>
                  {this.state.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase()+ letter.substring(1)
                  )
                  .join(' ')}
                  </h6>
                </div>
              </Card>
          </Link>
            
        </div>
        )
    }

    
  
  }
  
  
  
