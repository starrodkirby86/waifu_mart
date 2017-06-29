import React from 'react';
import WaifuList from '../waifu/WaifuList';
import { MY_ID } from '../secret';

export const AppContent = () => (
<div>
  <WaifuList personId={MY_ID} />
</div>
  );

export default AppContent;