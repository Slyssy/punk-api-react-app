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
        <h1 className='title'>Beer List</h1>
        <ul>
          {this.state.beers.map((beer) => {
            console.log(beer);
            return (
              <li>
                <figure>
                  <img src={beer.image_url} alt='beer' />
                </figure>
                <h3>{beer.name}</h3>
                <h4 className='tagline'>{beer.tagline}</h4>
                <div className='date-percentage'>
                  <p>Est. {beer.first_brewed}</p>
                  <p>Alcohol %: {beer.abv}</p>
                </div>
                <p className='description'>{beer.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
