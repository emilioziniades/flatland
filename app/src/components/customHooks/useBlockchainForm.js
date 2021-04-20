import {useState} from 'react'

export const useBlockchainForm = (callback) => {
    const [input, setInput] = useState('')

    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault()
          setInput('')
          // window.alert('Mint button clicked')
        }
        if (callback) {
            callback()
        }
    }

    const handleChange = (event) => {
        // event.persist()
        console.log(event)

        setInput(event.hex)

    }
    return {
        input,
        handleSubmit,
        handleChange,
  };
}