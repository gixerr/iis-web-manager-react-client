import React, {useEffect, useState} from 'react';
import classes from './ApplicationPools.module.css';
import axios from '../../axios';
import ApplicationPool from './ApplicationPool/ApplicationPool';
import ApplicationPoolsManageBar from '../../components/ApplicationPoolsSearchBar/ApplicationPoolsManageBar';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/Modal/Modal';
import AddApplicationPool from '../../components/AddApplicationPool/AddApplicationPool';
import DeleteApplicationPool from '../../components/DeleteApplicationPool/DeleteApplicationPool';

const ApplicationPools = (props) => {

    const [applicationPools, setApplicationPools] = useState([]);
    const [searchFieldValue, setSearchFieldValue] = useState('');
    const [modalState, setModalState] = useState(false);
    const [modalComponent, setModalComponent] = useState(null);

    const getManyData = async (uri) => await axios.get(uri)
        .then(response => (
            setApplicationPools(response.data)
        ));

    const getSingleData = (uri) => axios.get(uri)
        .then(response => {
            setApplicationPools([response.data]);
        })
        .catch(response => (
            setApplicationPools([])
        ));

    const deleteApplicationPool = async (name) => axios.delete(`/ApplicationPools/${name}`);

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

    const closeModal = () => {
        setModalState(!modalState);
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

    const deleteButtonHandler = (name) => {
        setModalState(!modalState);
        const component = <DeleteApplicationPool applicationPoolName={name}
                                                 deleteClick={modalDeleteButtonHandler.bind(null, name)}
                                                 cancelClick={modalCancelButtonHandler}/>;
        setModalComponent(component);
    };

    const modalCancelButtonHandler = () => {
        setModalState(false);
    };

    const modalClickHandler = () => {
        closeModal();
    };

    const modalAddButtonHandler = async (newAppPool) => {
        await axios.post('/ApplicationPools', newAppPool);
        setModalState(false);
        await fetchAllApplicationPools();
    };

    const modalDeleteButtonHandler = async (applicationPoolName) => {
        await deleteApplicationPool(applicationPoolName);
        setSearchFieldValue('');
        setModalState(false);
        await fetchAllApplicationPools();
    };

    const addButtonHandler = () => {
        setModalState(!modalState);
        const component = <AddApplicationPool cancelClick={modalCancelButtonHandler}
                                              addClick={modalAddButtonHandler}/>;
        setModalComponent(component);
    };

    useEffect(fetchAllApplicationPools, []);

    const renderOutput = () => {
        if (applicationPools.length > 0) {
            return (
                <section className={classes.applicationPool__container}>
                    <header className={classes.container__header}>Application Pools</header>
                    <ApplicationPoolsManageBar searchFieldHandler={searchFieldChangeHandler}
                                               searchButtonHandler={searchButtonHandler}
                                               refreshButtonHandler={refreshButtonHandler}
                                               addButtonHandler={addButtonHandler}
                                               searchValue={searchFieldValue}/>
                    {applicationPools.map(applicationPool => <ApplicationPool name={applicationPool.name}
                                                                              key={applicationPool.name}
                                                                              status={applicationPool.status}
                                                                              managedRuntimeVersion={applicationPool.managedRuntimeVersion}
                                                                              managedPipelineMode={applicationPool.managedPipelineMode}
                                                                              identity={applicationPool.identity}
                                                                              applications={applicationPool.applications}
                                                                              deleteHandler={deleteButtonHandler.bind(null, applicationPool.name)}
                                                                              />
                    )}
                </section>
            );
        } else {
            return (
                <section className={classes.applicationPool__container}>
                    <header className={classes.container__header}>Application Pools</header>
                    <ApplicationPoolsManageBar searchFieldHandler={searchFieldChangeHandler}
                                               searchButtonHandler={searchButtonHandler}
                                               refreshButtonHandler={refreshButtonHandler}
                                               addButtonHandler={addButtonHandler}
                                               searchValue={searchFieldValue}/>
                    <h1>No Application Pool found!</h1>
                </section>
            );
        }
    };

    return (
        <Auxiliary>
            <Modal show={modalState} modalClosed={modalClickHandler}>
                {modalComponent}
            </Modal>
            {renderOutput()}
        </Auxiliary>
    );
};

export default ApplicationPools;