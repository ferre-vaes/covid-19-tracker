import React from 'react';
import './App.css';
import { Cards, List, Graph } from './components';
import { fetchData } from './api';

class App extends React.Component {
  state = {
    data: {},
    dataCountries: [],
  }

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  render() {
      const { data } = this.state;

      return (
        <div className="container">
          <div className="logo">
            <img src="https://i.ibb.co/7QpKsCX/image.png" alt="Logo" />
          </div>
          <Cards data={data} />
          <Graph />
          <List />
        </div>
    );
  }
}

export default App;
