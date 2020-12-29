import { useState, MouseEvent } from 'react';
import { useQuery, gql } from '@apollo/client';
import { NextPage } from 'next';
import Robot from '../components/robot';

interface RobotsData {
    robots: {
      id: string;
      code: string;
    }
  }

const GET_ROBOTS = gql`
    query GetRobots($offset: Int!, $limit: Int!) {
        robots(offset: $offset, limit: $limit) {
            id
            code
        }
    }
`;

const Robots: NextPage = () => {
    enum Query {
        OFFSET = 0,
        LIMIT = 10
    };

    const [offset, setOffset] = useState<number>(Query.OFFSET);
    const [button, toogleButton] = useState<boolean>(false);

    const { loading, error, data, fetchMore } = useQuery<RobotsData>(GET_ROBOTS, {
        variables: {
            offset,
            limit: Query.LIMIT
        }
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error : (</div>;

    const handleLoadMore = (e: MouseEvent<HTMLElement>) => {
        let currentLength = data.robots.length;

        fetchMore({
            variables: {
                offset: currentLength,
                limit: Query.LIMIT
            }
        }).then((moreResult: { data: any }) => {
            setOffset(currentLength + moreResult.data.robots.length);
            toogleButton(Query.LIMIT > moreResult.data.robots.length);          
        });    

    };

    return (
        <>
            <h1>Robots </h1>
            {data.robots.map((robot: { id: string, code: string }) => (
                <Robot key={robot.id} {...robot} />
            ))}
            { button ? <p>NO MORE</p> : <button onClick={handleLoadMore}>LOAD MORE</button>}
        </>
    );
};

export default Robots;
