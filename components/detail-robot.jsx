const DetailRobot = ({ id, name, robot_settings }) => {

  return (<>
    <h1>Detail Robot</h1>
    <ul>
      <li><b>Id</b>: {id}</li>
      <li><b>Name</b>: {name}</li>
      <li><b>Settings:</b></li>
      <ul>
        {
          Object.entries(robot_settings.robot_settings)
            .map(([key, value]) => <li key={`${id}-${key}`}><b>{key}</b>: {value}</li>)
        }
      </ul>
      <style jsx>{`
            li {line-height: 2}
            `}</style>
    </ul>
  </>)
}

export default DetailRobot;
