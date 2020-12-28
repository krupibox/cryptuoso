import { useState } from 'react';

import Form from '../components/form';

const DetailRobot = ({ id, name, robot_settings }) => {

  const { robot_settings: settings } = robot_settings;
  const [formValue, setFormValue] = useState(``);

  const { volue, volueType } = formValue;

  const handleSubmit = (formValue) => {
    setFormValue(formValue);
  };

  return (<>
    <h1>Detail Robot</h1>
    <ul>
      <li><b>Id</b>: {id}</li>
      <li><b>Name</b>: {name}</li>
      <li><b>Settings:</b></li>
      <ul>
        {
          Object.entries(settings)
            .map(([key, value]) => <li key={`${id}-${key}`}>
              <b>{key}</b>: {formValue[key] || value}
            </li>)
        }
      </ul>
      <style jsx>{`
            li {line-height: 2}
            `}</style>
    </ul>

    <Form
      settings={settings}
      onFormSubmit={handleSubmit}
    />

  </>)
}

export default DetailRobot;
