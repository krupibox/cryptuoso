import Form from '../components/form';

const DetailRobot = ({ id, name, robot_settings }) => {

  const {robot_settings: settings} = robot_settings;

  return (<>
    <h1>Detail Robot</h1>
    <ul>
      <li><b>Id</b>: {id}</li>
      <li><b>Name</b>: {name}</li>
      <li><b>Settings:</b></li>
      <ul>
        {
          Object.entries(settings)
            .map(([key, value]) => <li key={`${id}-${key}`}><b>{key}</b>: {value}</li>)
        }
      </ul>
      <style jsx>{`
            li {line-height: 2}
            `}</style>
    </ul>

    <Form settings={settings}/>

  </>)
}

export default DetailRobot;
