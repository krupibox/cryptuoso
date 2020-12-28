import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Robot from '../components/robot';

const GET_ROBOTS = gql`
  query MyQuery($offset: Int, $limit: Int) {
    robots(offset: $offset, limit: $limit) {
        id
        name
        robot_settings {
        robot_settings
        }
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
        { data.robots.map((robot, index) => <Robot key={`${robot.id}-${index}`} {...robot} />)}
        <button onClick={onLoadMore}>LoadMore</button>
    </>);
}
