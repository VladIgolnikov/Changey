import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Saved from './components/Saved.jsx';

// fixer.io API free tier only allows rate search with base EUR.
// Convert from other bases by converting price from "from" to EUR,
// then multiplying by "to" rate.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      from: 'EUR',
      to: 'USD',
      price: 1,
      rates: [],
      conversion: null,
      saved: []
    };

    this.addSave = this.addSave.bind(this);
    this.removeSave = this.removeSave.bind(this);
    this.fetchSaved = this.fetchSaved.bind(this);
    this.fetchRates = this.fetchRates.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
    this.fetchRates();
    this.fetchSaved();
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
      .then(response => {
        this.setState({ saved: response.data });
      })
      .catch(error => {
        console.log(`Error getting list of saved currencies --> ${error}`);
      });
  }

  addSave() {
    Axios.put('/saved', { fx: this.state.to })
      .then(response => {
        this.fetchSaved();
      })
      .catch(error => {
        console.log(`Error saving currency --> ${error}`);
      });
  }

  removeSave(currency) {
    Axios.post('/saved', { fx: currency })
      .then(response => {
        this.fetchSaved();
      })
      .catch(error => {
        console.log(`Error deleting saved currency --> ${error}`);
      });
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

  render() {
    return (
      <div>
        <h1>Changey</h1>
        <form>
          <label>
            <h2>Price:</h2>
            <input
              type='price'
              name='price'
              autocomplete="off"
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
        <button onClick={this.addSave}>+</button>
        <h2>
          {(
            (this.state.price / this.state.rates[this.state.from]) *
            this.state.rates[this.state.to]
          ).toLocaleString(undefined, {
            style: 'currency',
            currency: this.state.to
          })}
        </h2>
        <div>
          <Saved
            saved={this.state.saved}
            rates={this.state.rates}
            price={this.state.price}
            from={this.state.from}
            removeSave={this.removeSave}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
