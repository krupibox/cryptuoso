const DetailRobot = ({id, name, robot_settings}) => {

    return (<>
        <p>Detail Robot <b>Id</b>: {id}</p>
        <p>Detail Robot <b>Name</b>: {name}</p>
        <p>Detail Robot <b>Settings:</b></p>
        <ul>
          {
            Object.entries(robot_settings.robot_settings)
              .map(([key, value]) => <li key={`${id}-${key}`}><b>{key}</b>: {value}</li>)
          }
        </ul>
        </>)
}

export default DetailRobot;
