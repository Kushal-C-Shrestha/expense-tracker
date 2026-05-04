import React, { useEffect } from 'react'
import { useState } from 'react'

const useFetch = ({ fn }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const resposne = await fn();
            setData(resposne);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [fn])
    return { data, setData, loading, error, refetch: fetchData }
}



export default useFetch