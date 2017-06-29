import React from 'react';
import AppContent from './AppContent';
import { Link } from 'react-router-dom';
import { Container, Button, Divider, Segment, Step } from 'semantic-ui-react';

const steps = [
  { active: true, icon: 'shopping bag', title: 'Shopping', description: 'Find your ideal waifu' },
  { active: false, icon: 'in cart', title: 'Payment', description: 'Order your waifu on-demand' },
  { active: false, icon: 'heart', title: 'Shipped!', description: 'We hope you enjoy your waifu' },
];

const Home = () => (
  <div>
    <Step.Group items={steps} />
    <Divider />
    <Segment>
      <Container>
        <AppContent />
      </Container>
    </Segment>
    <Button as={Link} label="Confirm Order" labelPosition="left" icon="in cart" color="blue" to="/cart" />
  </div>
);

export default Home;