import React from "react";
import Ingredients from "../../Ingredients/Ingredients";
import AdminNav from "../../AdminNav/AdminNav";
import useStyles from "./styles";

const AdminIngredient = () => {
    const classes = useStyles();

    return (
        <>
            <AdminNav />
            <div container className={classes.container}>
                <div className={classes.plankSpace}></div>
                <div style={{ width: '100%' }}>
                    <Ingredients />
                </div>
            </div>
        </>
    );
};

export default AdminIngredient;
