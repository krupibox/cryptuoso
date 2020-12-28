import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import DetailRobot from '../../../components/detail-robot';

const GET_ROBOT = gql`
query MyQuery($id: uuid_comparison_exp = {}) {
  robots(where: {id: $id}) {
    name
    id
    robot_settings {
      robot_settings
    }
  }
}
  `;

function Robot({ id }) {

  const { loading, error, data } = useQuery(GET_ROBOT, {
    variables: {
      id: { "_eq": id },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (<>
    <DetailRobot {...data.robots[0]}/>
    <Link href="/robots">
      <a>Back to list</a>
    </Link>
  </>)
}

Robot.getInitialProps = (ctx) => {

  return { id: ctx.query.id }
}

export default Robot;