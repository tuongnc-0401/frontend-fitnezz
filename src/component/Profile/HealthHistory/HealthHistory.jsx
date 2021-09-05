import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCalculatorHistory } from "../../../actions/calculatorActions";
import ProfileNav from "../ProfileNav";
import useStyles from "./styles.js";
const HealthHistory = () => {
  const calculatorMine = useSelector((state) => state.calculatorMine);
  const { loading, error, calculators } = calculatorMine;
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCalculatorHistory());
  }, [dispatch]);

  return (
    <Box mt={5.5}>
      <Box ml={6} mr={6}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <ProfileNav current={2}></ProfileNav>
          </Grid>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid item xs={12} md={9}>
              <Box marginBottom={3}>
                <Paper elevation={3} style={{ padding: "40px" }}>
                  <Typography
                    variant="h4"
                    style={{
                      marginBottom: "10px",
                      color: "#f73471",
                      fontWeight: "bold",
                    }}
                  >
                    Health History
                  </Typography>
                  {calculators.map((item) => (
                    <Paper
                      elevation={3}
                      style={{ padding: "40px", marginBottom: "10px" }}
                    >
                      <Grid
                        xs="12"
                        container
                        alignItems="center"
                        style={{ marginBottom: "3px" }}
                      >
                        <DateRangeIcon style={{ fontSize: 45 }}></DateRangeIcon>
                        <Typography
                          variant="h6"
                          style={{ color: "#f73471", marginLeft: "10px" }}
                        >
                          {item?.createDate}
                        </Typography>
                      </Grid>
                      <Grid
                        xs="12"
                        container
                        alignItems="center"
                        style={{ marginBottom: "3px" }}
                      >
                        <QueryBuilderIcon
                          style={{ fontSize: 45 }}
                        ></QueryBuilderIcon>
                        <Typography
                          variant="h6"
                          style={{ color: "#f73471", marginLeft: "10px" }}
                        >
                          {item?.createTime}
                        </Typography>
                      </Grid>
                      <Divider
                        style={{ marginBottom: "5px", marginTop: "5px" }}
                      ></Divider>
                      <Grid container>
                        <Grid item md="6" sm="12">
                          <Grid
                            xs="12"
                            container
                            alignItems="center"
                            style={{ marginBottom: "3px" }}
                          >
                            <Typography
                              variant="h6"
                              style={{ fontWeight: "bold" }}
                            >
                              Height:
                            </Typography>
                            <Typography
                              variant="h6"
                              style={{ marginLeft: "10px" }}
                            >
                              {item.height} cm
                            </Typography>
                          </Grid>
                          <Grid
                            xs="12"
                            container
                            alignItems="center"
                            style={{ marginBottom: "3px" }}
                          >
                            <Typography
                              variant="h6"
                              style={{ fontWeight: "bold" }}
                            >
                              Weight:
                            </Typography>
                            <Typography
                              variant="h6"
                              style={{ marginLeft: "10px" }}
                            >
                              {item.weight} kg
                            </Typography>
                          </Grid>
                          <Grid
                            xs="12"
                            container
                            alignItems="center"
                            style={{ marginBottom: "3px" }}
                          >
                            <Typography
                              variant="h6"
                              style={{ fontWeight: "bold" }}
                            >
                              Target:
                            </Typography>
                            <Typography
                              variant="h6"
                              style={{ marginLeft: "10px" }}
                            >
                              {item.target === "1"
                                ? "Maintain weight"
                                : item.target === "0"
                                ? "Lose weight"
                                : "Gain weight"}
                            </Typography>
                          </Grid>
                          {item.target !== "1" && (
                            <div>
                              <Grid
                                xs="12"
                                container
                                alignItems="center"
                                style={{
                                  marginBottom: "3px",
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Weight Target:
                                </Typography>
                                <Typography
                                  variant="h6"
                                  style={{ marginLeft: "10px" }}
                                >
                                  {item.weightTarget} kg
                                </Typography>
                              </Grid>
                              <Grid
                                xs="12"
                                container
                                alignItems="center"
                                style={{
                                  marginBottom: "3px",
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Speed:
                                </Typography>
                                <Typography
                                  variant="h6"
                                  style={{ marginLeft: "10px" }}
                                >
                                  {item.speed === "0.1"
                                    ? "Normal"
                                    : item.speed === "0.05"
                                    ? "Low"
                                    : "Quick"}
                                </Typography>
                              </Grid>
                            </div>
                          )}
                        </Grid>
                        {/* RIGHT SIDE */}
                        <Grid item md="6" sm="12" className={classes.rightSide}>
                          <Grid
                            xs="12"
                            container
                            alignItems="center"
                            style={{ marginBottom: "3px" }}
                          >
                            <Typography
                              variant="h6"
                              style={{ fontWeight: "bold" }}
                            >
                              TDEE:
                            </Typography>
                            <Typography
                              variant="h6"
                              style={{ marginLeft: "10px" }}
                            >
                              {item.numTDEE} kcal/day
                            </Typography>
                          </Grid>
                          <Grid
                            xs="12"
                            container
                            alignItems="center"
                            style={{ marginBottom: "3px" }}
                          >
                            <Typography
                              variant="h6"
                              style={{ fontWeight: "bold" }}
                            >
                              BMI:
                            </Typography>
                            <Typography
                              variant="h6"
                              style={{ marginLeft: "10px" }}
                            >
                              {item.numBMI}
                            </Typography>
                          </Grid>
                          <Grid
                            xs="12"
                            container
                            alignItems="center"
                            style={{ marginBottom: "3px" }}
                          >
                            <Typography
                              variant="h6"
                              style={{ fontWeight: "bold" }}
                            >
                              BMI status:
                            </Typography>
                            <Typography
                              variant="h6"
                              style={{ marginLeft: "10px" }}
                            >
                              {item.statusBMI}
                            </Typography>
                          </Grid>

                          {item.target !== "1" && (
                            <div>
                              <Grid
                                xs="12"
                                container
                                alignItems="center"
                                style={{
                                  marginBottom: "3px",
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Calo need to{" "}
                                  {item.target === "0"
                                    ? " lose weight"
                                    : " gain weight:"}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  style={{ marginLeft: "10px" }}
                                >
                                  {item.caloGainLoss} kcal/day
                                </Typography>
                              </Grid>
                              <Grid
                                xs="12"
                                container
                                alignItems="center"
                                style={{
                                  marginBottom: "3px",
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Estimate:
                                </Typography>
                                <Typography
                                  variant="h6"
                                  style={{ marginLeft: "10px" }}
                                >
                                  {item.estimateDay}
                                </Typography>
                              </Grid>
                            </div>
                          )}
                        </Grid>

                        {/* END RIGHT SIDE */}
                      </Grid>
                    </Paper>
                  ))}
                </Paper>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default HealthHistory;
