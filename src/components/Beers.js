import React, { Component } from 'react';
import '../App.css';
import LikeButton from './LikeButton';
import BuildList from './BuildList';

export default class Beers extends Component {
  constructor(props) {
    // console.log('Constructor');
    super(props);

    this.state = {
      beers: [],
    };
  }

  componentDidMount() {
    // console.log(`Component mounted.`);
    fetch('https://api.punkapi.com/v2/beers').then((response) =>
      response.json().then((data) => {
        this.setState({
          beers: [...data],
        });
      })
    );
  }

  componentDidUpdate() {
    // console.log('Updated', this.state.beers);
  }

  render() {
    // console.log('Rendered');
    return (
      <div className='page-container'>
        <h1 className='title'>Beer Menu</h1>
        <ul>
          {this.state.beers.map((beer) => {
            console.log(beer);
            return (
              <li key={beer.id} className='details'>
                <figure>
                  <img src={beer.image_url} alt='beer' />
                </figure>
                <LikeButton />
                <h3 className='beer-name'>{beer.name}</h3>
                <h4 className='tagline'>{beer.tagline}</h4>
                <div className='date-percentage'>
                  <p>Est. {beer.first_brewed}</p>
                  <p>Alcohol %: {beer.abv}</p>
                </div>
                <p className='description'>{beer.description}</p>
                <h4 className='section-title'>Ingredients:</h4>
                <div className='ingredients'>
                  <BuildList data={beer.ingredients.hops} item='Hops' />
                  <BuildList data={beer.ingredients.malt} item='Malts' />
                  <h5 className='yeast'>Yeast: {beer.ingredients.yeast}</h5>
                  <h4 className='section-title'>Brewing Method</h4>
                  <p className='brew-instructions'>
                    Fermentation Temp: {beer.method.fermentation.temp.value}°{' '}
                    {beer.method.fermentation.temp.unit}
                  </p>

                  {beer.method.mash_temp.map((element) => {
                    return (
                      <p className='brew-instructions'>
                        Mash Temp: {element.temp.value}° {element.temp.unit} for
                        a duration of {element.duration}.
                      </p>
                    );
                  })}
                  <p className='twist'>{beer.method.twist}</p>
                  <h5 className='brewers-tip'>{beer.brewers_tips}</h5>
                </div>
                <h4 className='section-title'>Food Pairing</h4>
                <p className='food-pairing'>
                  Pairs well with{' '}
                  {beer.food_pairing.map((food) => {
                    return ` ${food}, `;
                  })}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
