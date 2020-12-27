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
    const ROBOTS_LIMIT = 10;
    const [offset, setOffset] = useState(0);
    const { loading, error, data, fetchMore } = useQuery(GET_ROBOTS, {
        variables: {
            offset,
            limit: ROBOTS_LIMIT
        },
    });

    if (loading) return <div><p>Loading...</p></div>;
    if (error) return <div><p>Error :(</p></div>;

    const onLoadMore = () => {
        const currentLength = data.robots.length;
        fetchMore({
            variables: {
                offset: currentLength + data.robots.length
            }
        }
        ).then(fetchMoreResult => {
            setOffset(currentLength + fetchMoreResult.data.robots.length);
        });
    };

    return (<>
        { data.robots.map(robot => <Robot key={robot.id} robot={robot} />)}
        <button onClick={onLoadMore}>LoadMore</button>
    </>);
}
