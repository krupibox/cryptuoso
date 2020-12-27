import Link from 'next/link';

const Robot = ({ robot }) => {

    const { id, name } = robot;

    return (
        <ul>
            <li>
                <Link href={`/robots/robot/${id}`}>
                    <a>
                        <p>Robot <b>Id</b>: {id}</p>
                        <p>Robot <b>Name:</b>: {name}</p>
                    </a>
                </Link>
                <style jsx>{`
                li a:focus,
                li a:hover {color: green;}
                a {text-decoration: none;
                    color: black;}
            `}</style>
            </li>
        </ul>)
}

export default Robot;