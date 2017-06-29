import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import { Table, Image, Button, Segment, Header } from 'semantic-ui-react';

// Proceed with caution.
// This code is rather rushed and doesn't have much pretty documentation or practices.

const TableHeader = () => (
  <Table.Header fullWidth>
    <Table.Row>
      <Table.HeaderCell>Waifu</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

const WaifuTableItem = (props) => (
  <Table.Row>
    <Table.Cell>
      <Header as="h4" image>
        <Image src={props.imageUrl} shape="rounded" size="mini"/>
        <Header.Content>
          {props.name}
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>
      ${props.price}
    </Table.Cell>
  </Table.Row>
);

const TableFooter = (props) => (
  <Table.Footer>
    <Table.Row>
      <Table.HeaderCell colSpan="3">
        <Button as={Link} label="Go Back" labelPosition="left" color="red" icon="undo" to="/" />
      </Table.HeaderCell>
      <Table.HeaderCell colSpan="3">
        <Segment floated="right">
          Total Price: ${props.totalPrice}
        </Segment>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
);

class WaifuCart extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      Person: PropTypes.object,
    }).isRequired,
  };

  render() {
    if (this.props.data.loading)
      return (
        <div>Loading...</div>
      );
    if (this.props.data.error)
      return (
        <div>Error: <code>{this.props.data.error.toString()}</code></div>
      );
    const waifus = this.props.data.Person.waifus;
    const totalPrice = waifus.reduce((a, b) => a + b.price, 0);
    const waifuTableItems = waifus.map((waifu) => (
      <WaifuTableItem key={waifu.id} {...waifu} />
    ));
    return (
      <Table>
        <TableHeader />
        <Table.Body>
        {waifuTableItems}
        </Table.Body>
        <TableFooter totalPrice={totalPrice}/>
      </Table>
    );
  }
}

const WaifuCartQuery = gql`
query WaifuCartQuery($id: ID!) {
  Person(id: $id) {
    waifus {
      id
      name
      imageUrl
      price
    }
  }
}`;

const CartWithData = graphql(WaifuCartQuery, {
  name: "data",
  options: (ownProps) => ({
    variables: {
      id: ownProps.personId,
    },
    fetchPolicy: 'cache-and-network',
  })
})(WaifuCart);

export default CartWithData;