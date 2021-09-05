import React from 'react';
import Programs from '../Programs/Programs';
import AdminNav from './../AdminNav/AdminNav';
import useStyles from './styles';

function AdminProgram(props) {
    const classes = useStyles();

    return (
        <>
            <AdminNav />
            <div container className={classes.container}>
                <div className={classes.plankSpace}></div>
                <div style={{ width: '100%' }}>
                    <Programs />
                </div>
            </div>
        </>
    );
}

export default AdminProgram;