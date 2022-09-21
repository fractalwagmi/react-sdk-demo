import {
  SignInWithFractal,
  useBuyItem,
  useItemsForSale,
} from '@fractalwagmi/react-sdk';

export function Marketplace() {
  const { data: items } = useItemsForSale({
    limit: 20,
    sortDirection: 'ASCENDING',
    sortField: 'PRICE',
  });
  const { buyItem } = useBuyItem();

  return (
    <div>
      <SignInWithFractal />
      {items?.map(item => (
        <div
          key={item.id}
          style={{
            display: 'block',
            float: 'left',
            margin: '10px',
            padding: '10px',
            width: '400px',
          }}
        >
          <img alt="" width="250" src={item.imageUrl} />
          <div>Name: {item.name}</div>
          <div>Token address: {item.id}</div>
          <div>Listed at: {item.listTime?.time}</div>
          <div>
            Price: {item.price?.amount} {item.price?.unit}
          </div>
          <button
            onClick={async () => {
              try {
                const { signature } = await buyItem({ tokenAddress: item.id });
                console.log('bought. signature = ', signature);
              } catch (err: unknown) {
                console.log('an error occurred. err = ', err);
              }
            }}
          >
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}
