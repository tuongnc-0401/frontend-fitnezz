import React from 'react'
import AdminNav from '../../AdminNav/AdminNav';
import Meals from '../../Meals/Meals';
import useStyles from "./styles";

const AdminMeal = () => {
    const classes = useStyles();
    return (
        <>
            <AdminNav />
            <div container className={classes.container}>
                <div className={classes.plankSpace}></div>
                <div style={{ width: '100%' }}>
                    <Meals />
                </div>
            </div>
        </>
    )
}

export default AdminMeal
