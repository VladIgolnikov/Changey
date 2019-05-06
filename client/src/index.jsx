import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    //AXIOS REQUEST
  }

  render() {
    return (
      <div>
        <h1>Changey</h1>
        <List items={this.state.items} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
