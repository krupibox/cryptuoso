
const Form = ({ settings }) => {

    return (<>
        <h2>Robot Form</h2>
        <form>
            {
                Object.entries(settings)
                    .map(([key, value]) => (<>
                            <label htmlFor={key}><b>{key}</b>:
                            <input id={key} value={value} />
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