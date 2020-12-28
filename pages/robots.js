import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Robot from '../components/robot';

const GET_ROBOTS = gql`
  query MyQuery($offset: Int, $limit: Int) {
    robots(offset: $offset, limit: $limit) {
      id
      name
    }
  }
  `;

export default function Robots() {
    const ROBOTS_LIMIT = 2;
    const [offset, setOffset] = useState(0);
    const { loading, error, data, fetchMore } = useQuery(GET_ROBOTS, {
        variables: {
            offset,
            limit: ROBOTS_LIMIT
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const onLoadMore = () => {
        fetchMore({
            variables: {
                offset: data.robots.length
            }
        }
        ).then(moreResult => {
            setOffset(moreResult.data.robots.length + ROBOTS_LIMIT);
        });
    };

    return (<>
        { data.robots.map(robot => <Robot key={robot.id} robot={robot} />)}
        <button onClick={onLoadMore}>LoadMore</button>
    </>);
}
