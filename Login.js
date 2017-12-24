import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Popup from "react-native-popup";

import AuthScreen from './containers/AuthScreen';
import HomeScreen from './containers/HomeScreen';

/**
* The root component of the application.
* In this component I am handling the entire application state, but in a real app you should
* probably use a state management library like Redux or MobX to handle the state (if your app gets bigger).
*/
export default class Login extends Component {

  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false // Has the app completed the login animation?,
  }

  _url = () => {
    return this.props.api.env();
  }

  /**
  * Two login function that waits 1000 ms and then authenticates the user succesfully.
  * In your real app they should be replaced with an API call to you backend.
  */
  _login = (username, password) => {
    this.setState({ isLoading: true })

    this.props.api.login(this._url(), username, password)
    .then(result => {
      this._message = JSON.stringify(result);
      this.setState({ isLoggedIn: true, isLoading: false, object: result });
    })
    .catch(err => {
      this.setState({ isLoggedIn: false, isLoading: false });
      this.showAlert("Invalid login credentials");
    });
  }

  _signup = (username, password, email) => {
    this.setState({ isLoading: true })

    this.props.api.register(this._url(), username, email, password)
    .then(result => {
      this.setState({ isLoggedIn: true, isLoading: false, object: result });
    })
    .catch(err => {
      this.setState({ isLoggedIn: false, isLoading: false });
      this.showAlert("Invalid register credentials or account exists");
    })
  }

  _loginComplete = () => {
    if(this.state.object) {
      //this.setState({ isAppReady: true });
      setTimeout(() => {
        if(this.props.onLogin) {
          this.props.onLogin(this.state.object);
        }
      }, 100);
    }
  }

  showAlert = (message) => {
    this.popup.tip({
      title: "Error !",
      content: message,
    });
  };

  /**
  * Simple routing.
  * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
  */
  render () {
    return (
      <View style={styles.container}>
      <AuthScreen
      title=""
      source={this.props.source}
      login={(u,p) => this._login(u,p)}
      signup={(u,p,f) => this._signup(u,p,f)}
      isLoggedIn={this.state.isLoggedIn}
      isLoading={this.state.isLoading}
      onLoginAnimationCompleted={() => this._loginComplete()}
      />
      <Popup ref={popup => this.popup = popup }/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});

Login.propTypes = {
  env: PropTypes.string.isRequired,
  source: PropTypes.shape({
    uri: PropTypes.string
  }).isRequired,
  api: PropTypes.shape({
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    env: PropTypes.func.isRequired
  })
};
