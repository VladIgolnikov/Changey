import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Saved from './components/Saved.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      from: 'EUR',
      to: 'USD',
      price: 1,
      rates: null,
      conversion: null
    };

    this.fetchRates = this.fetchRates.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.convert = this.convert.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
    this.fetchRates();
  }

  fetchCurrencies() {
    Axios.get('/currencies')
      .then(response => {
        this.setState({ currencies: Object.entries(response.data) });
      })
      .catch(error => {
        console.log(`Error getting list of currencies --> ${error}`);
      });
  }

  fetchRates() {
    Axios.get('/rates')
      .then(response => {
        this.setState({ rates: response.data });
      })
      .catch(error => {
        console.log(`Error getting rate --> ${error}`);
      });
  }

  fetchSaved() {
    Axios.get('/saved')
  }

  handleFromChange(e) {
    this.setState({
      from: e.target.value
    });
  }

  handleToChange(e) {
    this.setState({
      to: e.target.value
    });
  }

  handlePriceChange(e) {
    this.setState({
      price: e.target.value
    });
  }

  convert() {
    event.preventDefault();
    // fixer.io API free tier only allows rate search with base EUR.
    // Convert from other bases by converting price from "from" to EUR,
    // then multiplying by "to" rate.
    let newPrice =
      (this.state.price / this.state.rates[this.state.from]) *
      this.state.rates[this.state.to];
    this.setState({
      conversion: newPrice.toLocaleString(undefined, {
        style: 'currency',
        currency: this.state.to
      })
    });
  }

  render() {
    return (
      <div>
        <h1>Changey</h1>
        <form>
          <label>
            Price:
            <input
              type='price'
              name='price'
              onChange={this.handlePriceChange}
            />
          </label>
          <h2>From</h2>
          <select value={this.state.from} onChange={this.handleFromChange}>
            {this.state.currencies.map((currency, index) => {
              return (
                <option value={currency[0]} key={index}>
                  {currency[0]} - {currency[1]}
                </option>
              );
            })}
          </select>
          <h2>To</h2>
          <select value={this.state.to} onChange={this.handleToChange}>
            {this.state.currencies.map((currency, index) => {
              return (
                <option value={currency[0]} key={index}>
                  {currency[0]} - {currency[1]}
                </option>
              );
            })}
          </select>
        </form>
        <button onClick={this.convert}>Go</button>
        <h2>{this.state.conversion}</h2>
        <div>
          <Saved />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
