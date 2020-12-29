import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Robot from '../components/robot';

const GET_ROBOTS = gql`
    query MyQuery($offset: Int!, $limit: Int!) {
        robots(offset: $offset, limit: $limit) {
            id
            name
            robot_settings {
                robot_settings
            }
        }
    }
`;

const Robots: React.FC = ()  => {
    enum Query {
        OFFSET = 0,
        LIMIT = 10
    };

    const [offset, setOffset] = useState<number>(Query.OFFSET);

    const { loading, error, data, fetchMore } = useQuery(GET_ROBOTS, {
        variables: {
            offset,
            limit: Query.LIMIT
        }
    });

    if (loading) return <>Loading...</>;
    if (error) return <p>Error : (</p>;

    const onLoadMore = ():void => {
        fetchMore({
            variables: {
                offset: data.robots.length + Query.LIMIT
            }
        }).then((moreResult: object) => {
            setOffset(moreResult.data.robots.length);
        });
    };

    return (
        <>
            <h1>Robots </h1>
            {data.robots.map((robot: number[], index:number) => (
                <Robot key={`${robot.id}-${index}`} {...robot} />
            ))}
            <button onClick={onLoadMore}> Load more </button>
        </>
    );
};

export default Robots;
