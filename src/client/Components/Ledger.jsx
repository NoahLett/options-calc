import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OptionsBlock from './OptionsBlock';

const Ledger = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchOptions = async () => {
            try {
                const response = await axios.get('/api/options');
                setOptions(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching options');
                setLoading(false);
            }
        }
        fetchOptions();
    }, []);

    const deleteOption = async (id) => {
        try {
            const response = await axios.delete(`/api/options/${id}`);
            setOptions(options.filter(option => option._id !== id));
            return response;
        } catch (error) {
            setError('Error in deleting option');
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <OptionsBlock options={options} deleteOption={deleteOption} />
        </>
    );
}

export default Ledger;
