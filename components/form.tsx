import { useState, ChangeEvent, Fragment } from 'react';

type FormValueArgsType = {
    volume: number;
    volumeType: string;
}

interface Props {
    settings: FormValueArgsType;
    onFormSubmit: (args: FormValueArgsType) => void;
}

const Form: React.FC<Props> = ({ settings, onFormSubmit }) => {

    const [valueInput, setValue] = useState<FormValueArgsType>({
        volume: 0,
        volumeType: ``
    });

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue({ ...valueInput, [name]: value });
    };

    return (<>
        <h2>Robot Form</h2>
        <form onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit(valueInput);
        }}>
            {
                Object.entries(settings)
                    .map(([key, _]) => (<Fragment key={key}>
                        <label><b>{key}</b>:
                            <input
                                name={key}
                                onChange={onValueChange}
                            />
                        </label>
                    </Fragment>)
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