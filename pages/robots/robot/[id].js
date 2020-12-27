import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

const GET_ROBOT = gql`
query MyQuery($queryId: uuid_comparison_exp = {}) {
  robots(where: {id: $queryId}) {
    name
    id
    robot_settings {
      robot_settings
    }
  }
}
  `;

export default function Robot() {
  const router = useRouter()

  const { id: queryId } = router.query

  const { loading, error, data } = useQuery(GET_ROBOT, {
    variables: {
      id: { "_eq": queryId },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    id: robotId,
    name: robotName,
    robot_settings: settings
  } = data.robots[0];

  return (<>
    <p>Detail Robot <b>Id</b>: {robotId}</p>
    <p>Detail Robot <b>Name</b>: {robotName}</p>
    <p>Detail Robot <b>Settings:</b></p>
    <ul>
      {
        Object.entries(settings.robot_settings)
          .map(([key, value]) => <li key={`${robotId}-${key}`}><b>{key}</b>: {value}</li>)
      }
    </ul>
    <Link href="/robots">
      <a>Back to list</a>
    </Link>
  </>)
}

