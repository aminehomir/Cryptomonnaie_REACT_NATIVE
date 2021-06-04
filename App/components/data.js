    const [lastname, setLastname] = useState();
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                setLastname(value)
                console.log(value);
            }
        } catch (e) {
            // error reading value
        }
    }
    getData()