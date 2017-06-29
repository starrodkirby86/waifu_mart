import React from 'react';
import PropTypes from 'prop-types';
import Waifu from './Waifu';
import { gql, graphql, compose } from 'react-apollo';
import { Card, Dimmer, Loader } from 'semantic-ui-react';

class WaifuList extends React.Component {

  doesPersonHaveWaifuInCart(id) {
    if (this.props.personQuery.error || this.props.personQuery.loading)
      return false;
    const ownedWaifus = this.props.personQuery.Person.waifus;
    for (let i = 0; i < ownedWaifus.length; i++)
      if (id === ownedWaifus[i].id) return true;
    return false;
  }

  loadRender() {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  mainRender() {
    const waifus = this.props.allWaifusQuery.allWaifus.map( (waifu) =>
      <Waifu key={waifu.id} waifuId={waifu.id} personId={this.props.personId} inCart={this.doesPersonHaveWaifuInCart(waifu.id)} />
    );
    return (
      waifus
    );
  }


  render() {
        if (this.props.allWaifusQuery.error || this.props.personQuery.error) {
      return (
        <div>
          <code>{this.props.allWaifusQuery.error.toString()}</code>
        </div>
      );
    }

    return (
      <Card.Group>
        {(this.props.allWaifusQuery.loading) ? this.loadRender() : this.mainRender() }
      </Card.Group>
    );
  }
}

const AllWaifuQuery = gql`
query AllWaifus {
  allWaifus {
    id
  }
}`;

const PersonQuery = gql`
query PersonQuery($id: ID!) {
  Person(id: $id) {
    waifus {
      id
    }
  }
}
`;

const WaifuListWithData = compose(graphql(AllWaifuQuery, {
  name: "allWaifusQuery"
}),(graphql(PersonQuery,
  {
    name: "personQuery",
    options: (ownProps) => ({
      variables: {
        id: ownProps.personId,
      }
    })
  })))(WaifuList);

export default WaifuListWithData;