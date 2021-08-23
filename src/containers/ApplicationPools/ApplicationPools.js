import React, { useEffect, useState } from 'react';
import classes from './ApplicationPools.module.css';
import axios from '../../axios';
import ApplicationPool from './ApplicationPool/ApplicationPool';
import ApplicationPoolsSearchBar from '../../components/ApplicationPoolsSearchBar/ApplicationPoolsSearchBar';


const ApplicationPools = (props) => {

    const [applicationPools, setApplicationPools] = useState([]);
    const [searchFieldValue, setSearchFieldValue] = useState('');

    const getManyData = (uri) => axios.get(uri)
        .then(response => (
            setApplicationPools(response.data)
        ));

    const getSingleData = (uri) => axios.get(uri)
        .then(response => (
            setApplicationPools([response.data])
        ))
        .catch(response => (
            setApplicationPools([])
        ));

    const fetchAllApplicationPools = async () => {
        await getManyData('/ApplicationPools');
    };

    const fetchApplicationPoolsByName = async (appPoolName) => {
        if (appPoolName === '') {
            await fetchAllApplicationPools();
        } else {
            await getSingleData(`/ApplicationPools/${appPoolName}`);
        }
    };

    const searchFieldChangeHandler = (event) => {
        setSearchFieldValue(event.target.value);
    };

    const searchButtonHandler = async () => {
        await fetchApplicationPoolsByName(searchFieldValue);
    };

    const refreshButtonHandler = async () => {
        await fetchAllApplicationPools();
        setSearchFieldValue('');
    };

    useEffect(fetchAllApplicationPools, []);

    const renderOutput = () => {
        if (applicationPools.length > 0) {
            return (
                <section className={classes.applicationPool__container}>
                    <header className={classes.container__header}>Application Pools</header>
                    <ApplicationPoolsSearchBar searchFieldHandler={searchFieldChangeHandler}
                                               searchButtonHandler={searchButtonHandler}
                                               refreshButtonHandler={refreshButtonHandler}
                                               value={searchFieldValue}/>
                    {applicationPools.map(applicationPool => <ApplicationPool name={applicationPool.name}
                                                                              key={applicationPool.name}
                                                                              status={applicationPool.status}
                                                                              managedRuntimeVersion={applicationPool.managedRuntimeVersion}
                                                                              managedPipelineMode={applicationPool.managedPipelineMode}
                                                                              identity={applicationPool.identity}
                                                                              applications={applicationPool.applications}/>
                    )}
                </section>
            );
        } else {
            return (
                <section className={classes.applicationPool__container}>
                    <header className={classes.container__header}>Application Pools</header>
                    <ApplicationPoolsSearchBar searchFieldHandler={searchFieldChangeHandler}
                                               searchButtonHandler={searchButtonHandler}
                                               refreshButtonHandler={refreshButtonHandler}
                                               value={searchFieldValue}/>
                    <h1>NOT FOUND!</h1>
                </section>
            );
        }
    };

    return (
        renderOutput()
    );
};

export default ApplicationPools;