import { useState, MouseEvent } from 'react';
import { useQuery, gql } from '@apollo/client';
import { NextPage } from 'next';
import Robot from '../components/robot';

const GET_ROBOTS = gql`
    query GetRobots($offset: Int!, $limit: Int!) {
        robots(offset: $offset, limit: $limit) {
            id
            name
            robot_settings {
                robot_settings
            }
        }
    }
`;

const Robots: NextPage = () => {
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error : (</div>;

    const handleLoadMore = (e: MouseEvent<HTMLElement>) => {
        fetchMore({
            variables: {
                offset: data.robots.length + Query.LIMIT
            }
        }).then((moreResult: { data: any }) => {
            setOffset(moreResult.data.robots.length);
        });
    };

    return (
        <>
            <h1>Robots </h1>
            {data.robots.map((robot: { id: string, name: string }) => (
                <Robot key={robot.id} {...robot} />
            ))}
            <button onClick={handleLoadMore}>Load more</button>
        </>
    );
};

export default Robots;
