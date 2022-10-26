import React, { Component } from 'react';

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
              <li className='details'>
                <figure>
                  <img src={beer.image_url} alt='beer' />
                </figure>
                <h3 className='beer-name'>{beer.name}</h3>
                <h4 className='tagline'>{beer.tagline}</h4>
                <div className='date-percentage'>
                  <p>Est. {beer.first_brewed}</p>
                  <p>Alcohol %: {beer.abv}</p>
                </div>
                <p className='description'>{beer.description}</p>
                <h4 className='section-title'>Ingredients:</h4>
                <div className='ingredients'>
                  <ul className='ingredient-list'>
                    <li className='ingredient-title'>Hops</li>
                    {beer.ingredients.hops.map((hop) => {
                      // console.log(malt.name);
                      return <li className='hop'>{hop.name}</li>;
                    })}
                  </ul>
                  <ul className='ingredient-list'>
                    <li className='ingredient-title'>Malts</li>
                    {beer.ingredients.malt.map((malt) => {
                      // console.log(malt.name);
                      return <li className='malt'>{malt.name}</li>;
                    })}
                  </ul>
                  <h5 className='yeast'>Yeast: {beer.ingredients.yeast}</h5>
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
