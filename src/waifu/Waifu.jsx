import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { gql, graphql, compose } from 'react-apollo';
import { Button, Card, Dimmer, Image, Icon, Loader } from 'semantic-ui-react';

class Waifu extends React.Component {

  state = {inCart: this.props.inCart};

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      Waifu: PropTypes.object,
    }).isRequired,
    connectWaifusToPerson: PropTypes.func.isRequired,
  };

  loadRender() {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  errorRender() {
    return (
      <div>
        Error.
      </div>
    );
  }

  renderButton() {
    if (this.state.inCart)
      return <Button content="In Cart!" icon="shopping basket" color='purple'
                     onClick={this.handleUpdateRemove}/>;
    else
      return <Button content={this.randomPurchaseMessage()} icon="shopping cart" color='green'
                     onClick={this.handleUpdateAdd}/>;
  }

  randomPurchaseMessage() {
    const messages = ["Ooh!", "Let's do it!", "Gimme!", ":heart_eyes_emoji:", "Bada bing bada boom!", "OK!", "Nyan~!", "Come home!", "I. Want. It."];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  handleUpdateAdd = () => {
    this.props.connectWaifuToPerson(
      {
        variables: {
          waifuId: this.props.waifuId,
          personId: this.props.personId,
        }
      }).then(({data}) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      }).then(() => {
      this.setState({inCart: true})
    });
  };

  handleUpdateRemove = () => {
    this.props.disconnectWaifuToPerson(
      {
        variables: {
          waifuId: this.props.waifuId,
          personId: this.props.personId,
        }
      }).then(({data}) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      }).then(() => {
      this.setState({inCart: false})
    });
  };

  mainRender() {
    const waifu = this.props.data.Waifu;
    return (
      <Card>
        <Card.Content>
          <Image floated="left" size="mini" src={waifu.imageUrl}/>
          <Card.Header>
            {waifu.name}
          </Card.Header>
          <Card.Meta>
            <Icon name="globe"/> From {waifu.anime}
          </Card.Meta>
          <Card.Description>
            ${waifu.price}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {this.renderButton()}
        </Card.Content>
      </Card>
    );
  }

  render() {
    return (
      <Card>
        {
          this.props.data.loading ? this.loadRender() :
            this.props.data.error ? this.errorRender() :
              this.mainRender()
        }
      </Card>
    );
  };
}

const WaifuQuery = gql`
query Waifu($id: ID!) {
  Waifu(id: $id) {
    id
    anime
    imageUrl
    name
    price
  }
}`;

// TODO: Obviously, this can be refactored into fragments

const ConnectWaifuToPerson = gql`
mutation connectWaifuToPerson($waifuId: ID!, $personId: ID!) {
  addToPersonsOnWaifu(personsPersonId: $personId, waifusWaifuId: $waifuId) {
    personsPerson {
      id
    }
    waifusWaifu {
      id
    }
  }
}
`;

const DisconnectWaifuToPerson = gql`
mutation disconnectWaifuToPerson($waifuId: ID!, $personId: ID!) {
  removeFromPersonsOnWaifu(personsPersonId: $personId, waifusWaifuId: $waifuId) {
    personsPerson {
      id
    }
    waifusWaifu {
      id
    }
  }
}
`;

const ConnectWaifuToPersonComposition =   graphql(ConnectWaifuToPerson, {
  name: "connectWaifuToPerson",
  options: (ownProps) => ({
    variables: {
      waifuId: ownProps.waifuId,
      personId: ownProps.personId,
    },
  }),
});
const DisconnectWaifuToPersonComposition =   graphql(DisconnectWaifuToPerson, {
  name: "disconnectWaifuToPerson",
  options: (ownProps) => ({
    variables: {
      waifuId: ownProps.waifuId,
      personId: ownProps.personId,
    },
  }),
});

const WaifuWithData = compose(graphql(WaifuQuery, {
    options: (ownProps) => ({
      variables: {
        id: ownProps.waifuId,
      },
      fetchPolicy: 'cache-first',
    })
  }),
  ConnectWaifuToPersonComposition,
  DisconnectWaifuToPersonComposition,
)(withRouter(Waifu));

export default WaifuWithData;