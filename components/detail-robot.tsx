import { useState } from 'react';
import Form from './form';

type FormValueArgsType = {
  volume: string;
  volumeType: string;
}

interface Props {
  id: string;
  name: string;
  robot_settings: { robot_settings: FormValueArgsType };
}

const DetailRobot: React.FC<Props> = ({ id, name, robot_settings }): JSX.Element => {

  const { robot_settings: settings } = robot_settings;

  const [formValue, setFormValue] = useState<FormValueArgsType>({
    volume: ``,
    volumeType: ``
  });

  const handleSubmit = (formValue: FormValueArgsType) => {
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
