import React from 'react'
import AdminNav from '../../AdminNav/AdminNav'
import Orders from '../../Orders/Orders';
import useStyles from "./styles";

const AdminOrder = () => {
    const classes = useStyles();
    return (
        <>
            <AdminNav />
            <div container className={classes.container}>
                <div className={classes.plankSpace}></div>
                <div style={{ width: '100%' }}>
                    <Orders />
                </div>
            </div>
        </>
    )
}

export default AdminOrder
