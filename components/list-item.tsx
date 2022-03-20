import React from 'react';

import { User } from 'interfaces';

type Props = {
  data: User;
};

const ListItem = ({ data }: Props) => (
  <div>
    {data.id}: {data.name}
  </div>
);

export default ListItem;
