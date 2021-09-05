import { Container, Grid, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect } from "react";
import useStyles from "./styles";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import TodayIcon from "@material-ui/icons/Today";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getOneProgram as getOneProgramAction } from "../../../actions/programActions";

//Timeline
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

function FitnessVideoDetail({ match }) {
  const dispatch = useDispatch();

  const getOneProgram = useSelector((state) => state.getOneProgram);
  const { program, loading, error } = getOneProgram;
  const id = match.params.id;

  var dayCount = 1;
  const classes = useStyles();

  const monthConverter = (month) => {
    switch (month) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getOneProgramAction(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading && <CircularProgress color="secondary" />}
      {error && <Alert severity="error">{error}</Alert>}
      {program && (
        <>
          <div
            className={classes.bigPicture}
            style={{ backgroundImage: `url(${program.imgUrl})` }}
          >
            <div className={classes.information}>
              <div className={classes.forTheme}>
                <div
                  style={{
                    marginTop: "28px",
                    marginBottom: "37px",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  Release date:{" "}
                  {monthConverter(new Date(program.releaseDate).getMonth())}{" "}
                  {new Date(program.releaseDate).getFullYear()}
                </div>
                <div
                  style={{
                    fontSize: "42px",
                    fontWeight: "bold",
                    padding: "0px 0px 30px 0px",
                    borderBottom: "solid 1px lightgrey",
                  }}
                >
                  {program.name}
                </div>
                <div style={{ marginTop: "30px", marginBottom: "10px" }}>
                  Type: {program.type}
                </div>
                <div style={{ marginBottom: "50px" }}>
                  Equipment: {program.equipment}
                </div>
                <Grid container>
                  <Grid
                    className={classes.info}
                    style={{ borderRight: "solid 1px grey" }}
                    item
                    xs={6}
                  >
                    <QueryBuilderIcon className={classes.icon} />
                    <div className={classes.duration}>
                      Approx {program.timeMinute} min
                    </div>
                    <div className={classes.bottom}>Per day</div>
                  </Grid>

                  <Grid className={classes.info} item xs={6}>
                    <TodayIcon className={classes.icon} />
                    <div className={classes.duration}>
                      {" "}
                      {program.duration} Days
                    </div>
                    <div className={classes.bottom}>Program</div>
                  </Grid>
                </Grid>
              </div>
              {/* <div style={{ fontSize: '60px', color: 'black', fontWeight: '400', marginBottom: '50px', textAlign: 'center'}}>2 Weeks Shred Challenge</div> */}
            </div>
          </div>

          <Container className={classes.container}>
            <div className={classes.line}></div>

            <div
              style={{
                margin: "50px 0px",
                fontWeight: "550",
                fontSize: "23px",
              }}
            >
              Online Carlendar
            </div>

            <Timeline>
              {program.videos.map((video) => (
                <div className={classes.toWrap}>
                  <div className={classes.timeLine}>
                    <TimelineItem style={{ height: "100%" }}>
                      <TimelineSeparator>
                        <TimelineDot
                          style={{ backgroundColor: "rgb(247, 52, 113)" }}
                        />
                        <TimelineConnector
                          style={{ backgroundColor: "rgb(247, 52, 113)" }}
                        />
                      </TimelineSeparator>
                      <TimelineContent></TimelineContent>
                    </TimelineItem>
                  </div>
                  <div className={classes.contentRight}>
                    <div
                      style={{
                        width: "100%",
                        fontSize: "12px",
                        paddingBottom: "12px",
                        marginTop: "8px",
                        borderBottom: "solid 1px lightgrey",
                      }}
                    >
                      Day {dayCount++}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <iframe
                        style={{ width: "70%", height: "400px" }}
                        src={video.videoUrl}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              ))}
            </Timeline>
          </Container>
        </>
      )}
    </div>
  );
}

export default FitnessVideoDetail;
