import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import Application from './Application/Application';
import classes from './Applications.module.css'

const Applications = (props) => {
    const [applications, setApplications] = useState([]);

    useEffect(async () => {
        axios.get('/sites/applications')
            .then(response => (setApplications(response.data)));
    });

    return (
        <section className={classes.applications__container}>
            <header className={classes.container__header}>Applications</header>
            {applications.map(application => <Application name={application.name}
                                                          key={application.name}
                                                          applicationPoolName={application.applicationPoolName}
                                                          applicationPoolStatus={application.applicationPoolStatus}
                                                          physicalPath={application.physicalPath}
                                                />)}
        </section>
    )
};

export default Applications;