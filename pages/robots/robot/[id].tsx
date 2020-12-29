import Link from 'next/link';
import { NextPage } from 'next';
import { useQuery, gql } from '@apollo/client';
import DetailRobot from '../../../components/detail-robot';

const GET_ROBOT = gql`
query GetRobot($id: uuid_comparison_exp) {
  robots(where: {id: $id}) {
    name
    id
    robot_settings {
      robot_settings
    }
  }
}
  `;

interface Props {
  id: string;
}

const Robot: NextPage<Props> = ({ id }) => {
  const { loading, error, data } = useQuery(GET_ROBOT, {
    variables: {
      id: { "_eq": `${id}` },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let [robots] = data.robots;

  return (<>
    <DetailRobot {...robots} />
    <Link href="/robots">
      <a>Back to list</a>
    </Link>
  </>)
}

Robot.getInitialProps = (context: any) => ({ id: context.query.id });

export default Robot;