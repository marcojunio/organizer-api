export const handleInputChange = (event, setState) => {
    const {
        name,
        value
    } = event.target;

    setState((prevState) => ({
        ...prevState,
        [name]: value,
    }));
}

export const handleDropdownChange = (event, setState) => {
    const {
        name,
        value
    } = event.target;

    let defineValue = null;
    
    try {
        //When performing destructuring, if an object with key value comes to value, retrieve it and set the value.
        defineValue = 'value' in value ? value['value'] : value;

    } catch {
        defineValue = value;
    }

    setState((prevState) => ({
        ...prevState,
        [name]: defineValue,
    }));
}