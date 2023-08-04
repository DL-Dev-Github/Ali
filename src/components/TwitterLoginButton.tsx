import axios from 'axios';
import React from 'react';

class TwitterLoginButton extends React.Component {
  handleLoginClick = () => {
    axios.get('https://ab9a-199-30-72-233.ngrok.io/api/v1/auth/twitter')
      .then(response => {
        const { accessToken, accessTokenSecret } = response.data;
        // Store the access tokens in state or pass them to a higher-level component
        this.setState({ accessToken, accessTokenSecret });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <button onClick={this.handleLoginClick}>
        Login with Twitter
      </button>
    );
  }
}

export default TwitterLoginButton;
