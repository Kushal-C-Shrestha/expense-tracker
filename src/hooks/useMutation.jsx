import React from 'react'
import { useState, useEffect } from 'react'

const useMutation = ({ fn }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    const executeMutation = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fn(data);
            return response;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, executeMutation };
}

export default useMutation  