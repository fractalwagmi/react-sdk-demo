import { useEffect, useState } from 'react';

export function Marketplace() {
  const [itemsForSale, setItemsForSale] = useState([]);
  const demoAuthToken =
    'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjAyMjI0NTMsImh0dHBzOi8vZnJhY3RhbC5pcyI6eyJwcm9qZWN0X2lkIjoiNTY1NTM3NDM0NjU4NDA2NCJ9LCJpYXQiOjE2NjAxNTA0NTMsImlzcyI6Imh0dHBzOi8vYXV0aC1hcGkuZnJhY3RhbC5pcyJ9.vR0c4vmUfHD7jbq18H9RbDiozx8he8hu8xRbUrU_JwNL2A6qXjNHmGAeHVqvr7rFXmn5R8MaZLFiJbvQyjeoAA';

  useEffect(() => {
    const getItemsForSale = async () => {
      const result = await fetch(
        'https://api.fractal.is/sdk/v1/marketplace/solana/items/for_sale?sort.direction=ASCENDING&sort.field=PRICE&limit=25',
        {
          headers: { authorization: `Bearer ${demoAuthToken}` },
        },
      );
      const res = await result.json();
      setItemsForSale(res.items);
    };
    getItemsForSale();
  }, []);

  return (
    <div>
      {itemsForSale?.map((i: any) => (
        <div
          key={i.id}
          style={{
            display: 'block',
            float: 'left',
            margin: '10px',
            padding: '10px',
            width: '400px',
          }}
        >
          <img alt="" width="250" src={i.imageUrl} />
          <div>Name: {i.name}</div>
          <div>Token address: {i.id}</div>
          <div>Listed at: {i.listTime.time}</div>
          <div>
            Price: {i.price.amount} {i.price.unit}
          </div>
          <button>Buy</button>
        </div>
      ))}
    </div>
  );
}
