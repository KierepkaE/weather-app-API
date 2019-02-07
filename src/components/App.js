import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";
import "./App.css";

// API key
const APIkey = "23197c1ec38d16abd609d1570f3bb2d8";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    error: false
  };

  handleInput = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${
      this.state.value
    }&APPID=${APIkey}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(" upss something went wrong. . . ");
      })
      .then(response => response.json())
      .then(data => {
        const time = new Date().toLocaleString();
        this.setState(state => ({
          date: time,
          city: data.name,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          error: false
        }));
      })
      .catch(error => {
        this.setState(state => ({
          error: true,
          city: state.value
        }));
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length < 2) return;
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${
        this.state.value
      }&APPID=${APIkey}&units=metric`;

      fetch(API)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error(" upss something went wrong. . . ");
        })
        .then(response => response.json())
        .then(data => {
          const time = new Date().toLocaleString();
          this.setState(state => ({
            date: time,
            city: data.name,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            error: false
          }));
        })
        .catch(error => {
          this.setState(state => ({
            error: true,
            city: state.value
          }));
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInput}
          click={this.handleSubmit}
        />
        <Result error={this.state.error} weather={this.state} />
      </div>
    );
  }
}

export default App;
