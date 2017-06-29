import React, { Component } from 'react';
import './vendor/semantic-ui/dist/semantic.min.css';
import AppSkeleton from './layouting/AppSkeleton';
import { API_ENDPOINT_URL } from './secret';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';


const networkInterface = createNetworkInterface({
  uri: API_ENDPOINT_URL
});

const client = new ApolloClient({
  networkInterface: networkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppSkeleton />
      </ApolloProvider>
    );
  }
}

export default App;
