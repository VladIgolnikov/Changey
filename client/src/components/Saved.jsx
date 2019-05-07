import React from 'react';
import SavedItem from './SavedItem';
import Axios from 'axios';

class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: ''
    };

    this.fetchSaved = this.fetchSaved.bind(this);
  }

  componentDidMount() {
    this.fetchSaved();
  }

  fetchSaved() {
    Axios.get('/saved')
      .then(response => {
        console.log('response for saving to db', response);
        this.setState({ saved: response });
      })
      .catch(error => {
        console.log(`Error getting list of saved currencies --> ${error}`);
      });
  }

  render() {
    return (
      <div>

    </div>
    );
  }
}

export default Saved;
