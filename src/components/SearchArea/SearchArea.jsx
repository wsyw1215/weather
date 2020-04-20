import React, { Component } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import './SearchArea.css';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const appid = 'bd45fc9db8849cb46d00a451483ccd44';
class SearchArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: undefined,
      searchList: [],
      searchKeyWord: '',
      error: false,
    };
  }
  getWeather = (city) => {
    fetch(`${baseUrl}?q=${city}&units=Metric
    &appid=${appid}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.cod && result.cod === '404') {
            this.setState({
              ...this.state,
              error: true,
            });
            return;
          }
          let newList = [...this.state.searchList];
          console.log('keyword:', this.state.searchKeyWord);
          newList = newList.filter(
            (item) =>
              item.name.toLowerCase() !== this.state.searchKeyWord.toLowerCase()
          );
          console.log('list:', newList);
          newList = [...newList, result];
          this.setState((state) => {
            return {
              ...state,
              weatherInfo: result,
              searchList: newList,
            };
          });
        },
        (error) => {
          console.log('123:', error);
        }
      );
  };
  toCelsius(K) {
    return K - 273.15;
  }
  handleChange = (event) => {
    this.setState({ searchKeyWord: event.target.value });
  };
  handleSubmit = () => {
    let city = this.state.searchKeyWord;
    if (city) this.getWeather(city);
    this.setState({
      ...this.state,
      error: false,
    });
  };
  render() {
    let searchList = this.state.searchList;
    let error = this.state.error;
    return (
      <div className='search-area'>
        <input
          type='text'
          value={this.state.searchKeyWord}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>查詢</button>
        {error && <div className='search-error'>查無此城市</div>}
        {searchList &&
          searchList
            .reverse()
            .map((weatherInfo) => (
              <WeatherCard
                key={weatherInfo.name}
                city={weatherInfo.name}
                temp={this.toCelsius(weatherInfo.main.temp)}
                weather={weatherInfo.weather[0].main}
              />
            ))}
      </div>
    );
  }
}

export default SearchArea;
