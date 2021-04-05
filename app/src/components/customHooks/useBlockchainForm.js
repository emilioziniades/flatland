import {useState} from 'react'

export const useBlockchainForm = (initialValues, callback) => {
    const [inputs, setInputs] = useState(initialValues)

    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
          // window.alert('Mint button clicked')
        }
        if (callback) {
            callback();
        }
    }

    const handleChange = (event) => {
        event.persist();

        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));

    }
    return {
        inputs,
        handleSubmit,
        handleChange,
  };
}