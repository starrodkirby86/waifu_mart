import React from 'react';
import WaifuCart from '../waifu/WaifuCart';
import { Container, Divider, Segment, Step } from 'semantic-ui-react';
import { MY_ID } from '../secret';

const steps = [
  { active: false, icon: 'shopping bag', title: 'Shopping', description: 'Find your ideal waifu' },
  { active: true, icon: 'in cart', title: 'Payment', description: 'Order your waifu on-demand' },
  { active: false, icon: 'heart', title: 'Shipped!', description: 'We hope you enjoy your waifu' },
];

const PurchasePage = () => (
  <div>
    <Step.Group items={steps} />
    <Divider />
    <Segment>
      <Container>
        <WaifuCart personId={MY_ID} />
      </Container>
    </Segment>
  </div>
);

export default PurchasePage;