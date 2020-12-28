import { useState } from 'react';

const Form = ({ settings, onFormSubmit }) => {

    const [valueInput, setValue] = useState({
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
                    .map(([key, val]) => (<>
                        <label key={`${key}-${val}`}><b>{key}</b>:
                            <input
                                name={key}
                                onChange={(evt) => {
                                    const { name, value } = evt.target;
                                    setValue({ ...valueInput, [name]: value });
                                }}
                            />
                        </label>
                    </>)
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
                }
                button {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
            `}</style>
    </>)
}

export default Form;