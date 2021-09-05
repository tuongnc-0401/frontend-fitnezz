import React from "react";
import AdminNav from "../../AdminNav/AdminNav";
import Products from "../../Products/Products";
import useStyles from "./styles";

const AdminProduct = () => {
    const classes = useStyles();

    return (
        <>
            <AdminNav />
            <div container className={classes.container}>
                <div className={classes.plankSpace}></div>
                <div style={{ width: '100%' }}>
                    <Products />
                </div>
            </div>
        </>
    );
};

export default AdminProduct;
