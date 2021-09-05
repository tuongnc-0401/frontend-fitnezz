import React from "react";
import AdminNav from "../../AdminNav/AdminNav";
import Users from "../../Users/Users";
import useStyles from "./styles";

const AdminUser = () => {
    const classes = useStyles();

    return (
        <>
            <AdminNav />
            <div container className={classes.container}>
                <div className={classes.plankSpace}></div>
                <div style={{ width: '100%' }}>
                    <Users />
                </div>
            </div>
        </>
    );
};

export default AdminUser;