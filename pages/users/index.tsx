import Link from 'next/link';

import List from 'components/list-main';
import Layout from 'components/main';
import { sampleUserData } from 'utils/sample-data';

const Users = () => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={sampleUserData} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default Users;
