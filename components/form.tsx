import React from 'react';
import { useState } from 'react';

type FormValueArgsType = {
        volume: string;
        volumeType: string;
}

interface Props {
    settings: object;
    onFormSubmit: (args: FormValueArgsType) => void;
}

const Form: React.FC<Props> = ({ settings, onFormSubmit }): JSX.Element => {

    const [valueInput, setValue] = useState<FormValueArgsType>({
        volume: ``,
        volumeType: ``
    });

    return (<>
        <h2>Robot Form</h2>
        <form onSubmit={(evt) => {
            evt.preventDefault();
            onFormSubmit(valueInput);
        }}>
            {
                Object.entries(settings)
                    .map(([key, _]) => (<React.Fragment key={key}>
                        <label><b>{key}</b>:
                            <input
                                name={key}
                                onChange={(evt) => {
                                    const { name, value } = evt.target;
                                    setValue({ ...valueInput, [name]: value });
                                }}
                            />
                        </label>
                    </React.Fragment>)
                    )}
            <button type="submit">Update form</button>
        </form>
        <style jsx>{`
                label {
                    display: flex;
                    width: 250px;
                }
                input {
                    margin-left: auto;
                    margin-bottom: 5px;
                }
                button {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
                form {margin-bottom: 20px}
            `}</style>
    </>)
}

export default Form;