import ListDetail from 'components/list-detail';
import Layout from 'components/main';
import { User } from 'interfaces';

type Props = {
  errors?: string;
  item?: User;
};

const StaticPropsDetail = ({ errors, item }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        item ? item.name : 'User Detail'
      } | Next.js + TypeScript Example`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  );
};

export default StaticPropsDetail;
