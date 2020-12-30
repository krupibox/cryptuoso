import Link from 'next/link';
import { NextPage } from 'next';
import { useQuery, gql } from '@apollo/client';
import DetailRobot from '../../../components/detail-robot';

interface RobotData {
  robots_by_pk: {
    id: string;
    name: string;
    robot_settings: {
      robot_settings: {
        volume: number;
        volumeType: string;
      }
    };
  }
}

interface Props {
  id: string;
}

const Robot: NextPage<Props> = ({ id }) => {

  const GET_ROBOT = gql`
query GetRobot($id: uuid!) {
  robots_by_pk(id: $id) {
      name
      id
      robot_settings {
        robot_id
        robot_settings
      }
    }
  }
  `;

  const { loading, error, data } = useQuery<RobotData>(GET_ROBOT, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let { robots_by_pk } = data;

  return (<>
    <DetailRobot {...robots_by_pk} />
    <Link href="/robots">
      <a>Back to list</a>
    </Link>
  </>)
}

Robot.getInitialProps = (context: any) => ({ id: context.query.id });

export default Robot;