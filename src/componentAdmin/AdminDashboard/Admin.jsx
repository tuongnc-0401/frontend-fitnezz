import { Grid, CircularProgress, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import AdminNav from "../AdminNav/AdminNav";
import useStyles from "./styles";
import Alert from "@material-ui/lab/Alert";

import { Chart } from "react-google-charts";
import { listIngredients } from "../../actions/ingredientActions";
import { listAllProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../actions/userActions";
import { listMeal } from "../../actions/mealAction";
import { listOrder } from "../../actions/orderActions";
import { getAllProgram } from "../../actions/programActions";
import { listAllUserBmi } from "../../actions/calculatorActions";

const Admin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ingredientList = useSelector((state) => state.ingredientList);
  const {
    loading: loadingIngredient,
    error: errorIngredient,
    ingredients,
  } = ingredientList;
  const productListAll = useSelector((state) => state.productListAll);
  const {
    loading: loadingProduct,
    error: errorProduct,
    products,
  } = productListAll;
  const userList = useSelector((state) => state.userList);
  const { loading: loadingUser, error: errorUser, users } = userList;
  const mealList = useSelector((state) => state.mealList);
  const { loading: loadingMeal, error: errorMeal, meals } = mealList;
  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrder, error: errorOrder, orders } = orderList;
  const listAllProgram = useSelector((state) => state.getAllPrograms);
  const {
    listPrograms,
    loading: loadingProgram,
    error: errorProgram,
  } = listAllProgram;
  const allUserBmi = useSelector((state) => state.allUserBmi);
  const { loading: loadingUserBMI, userBMI } = allUserBmi;

  const BarChart = () => {
    const data = [
      { male: 0, female: 0 },
      { male: 0, female: 0 },
      { male: 0, female: 0 },
      { male: 0, female: 0 },
      { male: 0, female: 0 },
      { male: 0, female: 0 },
    ];
    userBMI.map((userBmi) => {
      if (userBmi.statusBMI === "Underweight") {
        let user = users.find((user) => user._id === userBmi.user);
        if (user?.gender === true) {
          data[0].male += 1;
        } else if (user?.gender === false) {
          data[0].female += 1;
        }
      } else if (userBmi.statusBMI === "Normal") {
        let user = users.find((user) => user._id === userBmi.user);
        if (user?.gender === true) {
          data[1].male += 1;
        } else if (user?.gender === false) {
          data[1].female += 1;
        }
      } else if (userBmi.statusBMI === "Overweight") {
        let user = users.find((user) => user._id === userBmi.user);
        if (user?.gender === true) {
          data[2].male += 1;
        } else if (user?.gender === false) {
          data[2].female += 1;
        }
      } else if (userBmi.statusBMI === "Obesity class I") {
        let user = users.find((user) => user._id === userBmi.user);
        if (user?.gender === true) {
          data[3].male += 1;
        } else if (user?.gender === false) {
          data[3].female += 1;
        }
      } else if (userBmi.statusBMI === "Obesity class II") {
        let user = users.find((user) => user._id === userBmi.user);
        if (user?.gender === true) {
          data[4].male += 1;
        } else if (user?.gender === false) {
          data[4].female += 1;
        }
      } else if (userBmi.statusBMI === "Obesity class III") {
        let user = users.find((user) => user._id === userBmi.user);
        if (user?.gender === true) {
          data[5].male += 1;
        } else if (user?.gender === false) {
          data[5].female += 1;
        }
      }
      return null;
    });
    return (
      <Chart
        width={"100%"}
        height={"500px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Gender", "Male", "Female", "No BMI Info"],
          ["UnderWeight", data[0].male, data[0].female, 0],
          ["Normal", data[1].male, data[1].female, 0],
          ["OverWeight", data[2].male, data[2].female, 0],
          ["Obesity Class I", data[3].male, data[3].female, 0],
          ["Obesity Class II", data[4].male, data[4].female, 0],
          ["Obesity Class III", data[5].male, data[5].female, 0],
          ["No info", 0, 0, users.length - userBMI.length],
        ]}
        options={{
          title: "Rate of user's gender by their status BMI ",
          chartArea: { width: "50%" },
          hAxis: {
            title: "Number of User",
            minValue: 0,
          },
          vAxis: {
            title: "Body Status",
          },
        }}
        // For tests
        rootProps={{ "data-testid": "1" }}
      />
    );
  };

  const PieChart = () => {
    const data = [
      ["Total", "Order Status"],
      ["Pending And Shipping", 0],
      ["Cancelled", 0],
      ["Completed", 0],
    ];
    orders.map((order) => {
      if (order.status === "Pending" || order.status === "Shipping") {
        data[1][1] += 1;
      } else if (order.status === "Cancelled") {
        data[2][1] += 1;
      } else if (order.status === "Completed") {
        data[3][1] += 1;
      }
      return null;
    });
    return (
      <Chart
        width={"100%"}
        height={"500px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: "Total Order Status",
          // Just add this option
          is3D: true,
        }}
        rootProps={{ "data-testid": "2" }}
      />
    );
  };
  useEffect(() => {
    dispatch(listIngredients());
    dispatch(listAllProducts());
    dispatch(listUsers());
    dispatch(listMeal());
    dispatch(listOrder());
    dispatch(getAllProgram());
    dispatch(listAllUserBmi());
  }, [dispatch]);
  return (
    <>
      <AdminNav />
      <div container className={classes.container}>
        <div className={classes.plankSpace}></div>
        <div
          className={classes.right}
          style={{ width: "100%", padding: "20px" }}
        >
          {loadingIngredient ||
          loadingMeal ||
          loadingOrder ||
          loadingProduct ||
          loadingProgram ||
          loadingUser ||
          loadingUserBMI ? (
            <CircularProgress color="secondary" />
          ) : errorIngredient ||
            errorMeal ||
            errorOrder ||
            errorProduct ||
            errorProgram ||
            errorUser ? (
            <Alert severity="error">{errorIngredient}</Alert>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={4}
                  style={{
                    display: "flex",
                    backgroundColor: "white",
                    width: "100%",
                    height: "100px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#052963",
                      display: "flex",
                      width: "65%",
                      height: "100px",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <div style={{ marginTop: "15px", fontWeight: "450" }}>
                      Have
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontWeight: "600",
                        fontSize: "25px",
                      }}
                    >
                      Users
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "35%",
                      fontWeight: "500",
                      fontSize: "30px",
                      color: "grey",
                    }}
                  >
                    {users?.length}
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={4}
                  style={{
                    display: "flex",
                    backgroundColor: "white",
                    width: "100%",
                    height: "100px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#00c6d7",
                      display: "flex",
                      width: "65%",
                      height: "100px",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <div style={{ marginTop: "15px", fontWeight: "450" }}>
                      Have
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontWeight: "600",
                        fontSize: "25px",
                      }}
                    >
                      Ingredients
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "35%",
                      fontWeight: "500",
                      fontSize: "30px",
                      color: "grey",
                    }}
                  >
                    {ingredients?.length}
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={4}
                  style={{
                    display: "flex",
                    backgroundColor: "white",
                    width: "100%",
                    height: "100px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#052963",
                      display: "flex",
                      width: "65%",
                      height: "100px",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <div style={{ marginTop: "15px", fontWeight: "450" }}>
                      Have
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontWeight: "600",
                        fontSize: "25px",
                      }}
                    >
                      Meals
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "35%",
                      fontWeight: "500",
                      fontSize: "30px",
                      color: "grey",
                    }}
                  >
                    {meals?.length}
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={4}
                  style={{
                    display: "flex",
                    backgroundColor: "white",
                    width: "100%",
                    height: "100px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#00c6d7",
                      display: "flex",
                      width: "65%",
                      height: "100px",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <div style={{ marginTop: "15px", fontWeight: "450" }}>
                      Have
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontWeight: "600",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      Total Orders
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "35%",
                      fontWeight: "500",
                      fontSize: "30px",
                      color: "grey",
                    }}
                  >
                    {orders?.length}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={4}
                  style={{
                    display: "flex",
                    backgroundColor: "white",
                    width: "100%",
                    height: "100px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#052963",
                      display: "flex",
                      width: "65%",
                      height: "100px",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <div style={{ marginTop: "15px", fontWeight: "450" }}>
                      Have
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontWeight: "600",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      Products
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "35%",
                      fontWeight: "500",
                      fontSize: "30px",
                      color: "grey",
                    }}
                  >
                    {products?.length}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={4}
                  style={{
                    display: "flex",
                    backgroundColor: "white",
                    width: "100%",
                    height: "100px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#052963",
                      display: "flex",
                      width: "65%",
                      height: "100px",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <div style={{ marginTop: "15px", fontWeight: "450" }}>
                      Have
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontWeight: "600",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      Programs
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "35%",
                      fontWeight: "500",
                      fontSize: "30px",
                      color: "grey",
                    }}
                  >
                    {listPrograms?.length}
                  </div>
                </Paper>
              </Grid>
              <Grid item md={6} xs={12} style={{ padding: "20px" }}>
                <Paper style={{ width: "100%" }} elevation={5}>
                  <BarChart />
                </Paper>
              </Grid>
              <Grid item md={6} xs={12} style={{ padding: "20px" }}>
                <Paper style={{ width: "100%" }} elevation={5}>
                  <PieChart />
                </Paper>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
