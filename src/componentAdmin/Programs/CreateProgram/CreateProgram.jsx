import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { Link as changeURL } from "react-router-dom";
import { createOneProgram } from "./../../../actions/programActions";

function CreateProgram(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  //data
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [equipment, setEquipment] = useState("");
  const [timeMinute, setTimeMinute] = useState(0);
  const [videos, setVideos] = useState([]);
  const [image, setImage] = useState("");

  //add btn
  const [checkPass, setCheckPass] = useState([]);

  const createProgram = useSelector((state) => state.createProgram);
  const { loading, success, error } = createProgram;
  const handleSubmit = (e) => {
    e.preventDefault();
    let check = true;
    var newArray = [];
    // eslint-disable-next-line
    videos.map((video) => {
      if (video.videoUrl) {
        newArray.push(false);
        setCheckPass(newArray);
      }
      if (video.videoUrl === "") {
        newArray.push(true);
        setCheckPass(newArray);
        check = false; // eslint-disable-next-line
        return;
      }
    });

    if (check) {
      const duration = videos.length;
      dispatch(
        createOneProgram(
          name,
          gender,
          type,
          equipment,
          timeMinute,
          duration,
          videos,
          image
        )
      );
    }
  };

  //gender

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (createProgram) {
      createProgram.success = false;
    }
  }, [createProgram]);

  const handleDel = (e) => {
    // if (videos.length > 0) {
    const index = +e.target.parentElement.parentElement.id;
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
    // } else {
    //     setAddBtn(addBtn - 1);
    //     setDuration(addBtn - 1);
    //     console.log('cl')
    // }
  };

  const handleAdd = () => {
    // setTemp('');
    // const lengthInput = document.getElementsByClassName('textField').length + 1;

    // if (videos.length > 0) {
    //     setAddBtn(lengthInput);
    // } else {
    //     setAddBtn(addBtn + 1)
    // }
    // setDuration(lengthInput);
    setVideos([...videos, { videoUrl: "" }]);
  };

  const handleChangeVideo = (e) => {
    const index = +e.target.parentElement.parentElement.parentElement.id;
    const newVideos = [...videos];
    newVideos[index].videoUrl = e.target.value;
    setVideos(newVideos);
    // setTemp({ videoUrl: e.target.value })
  };

  const handleBlur = () => {
    // if (temp !== '' && bypass) {
    //     setVideos([...videos, temp]);
    // }
  };

  const handleFor = (e) => {
    // if (e.target.value !== '') {
    //     setBypass(false);
    // } else {
    //     setBypass(true);
    // }
  };

  // console.log('videos', videos);

  return (
    <Container component="main" style={{ width: "40%" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          CREATE NEW PROGRAM
        </Typography>
        {loading && (
          <CircularProgress style={{ marginTop: "10px" }} color="secondary" />
        )}
        {error && (
          <Alert style={{ marginTop: "10px" }} severity="error">
            {error}
          </Alert>
        )}
        {success && (
          <Box display="flex" mt={2}>
            <Alert elevation={2} severity="success" fullWidth>
              Success{" "}
            </Alert>
          </Box>
        )}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              autoComplete="name"
              autoFocus
              margin="normal"
              value={name}
              name="name"
              variant="outlined"
              label="Name"
              style={{ width: "50%" }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>

            <FormControl style={{ width: "45%" }}>
              <InputLabel id="demo-controlled-open-select-label">
                Gender
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value={true}>Male</MenuItem>
                <MenuItem value={false}>Female</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ width: "100%", display: "flex" }}>
            <TextField
              autoComplete="type"
              value={type}
              margin="normal"
              name="type"
              variant="outlined"
              label="Type"
              style={{ width: "50%", paddingRight: "3%" }}
              onChange={(e) => setType(e.target.value)}
            ></TextField>
            <TextField
              autoComplete="timeMinute"
              type="number"
              value={timeMinute}
              margin="normal"
              name="timeMinute"
              variant="outlined"
              label="Time per exercise"
              style={{ width: "50%" }}
              onChange={(e) => setTimeMinute(parseInt(e.target.value))}
            ></TextField>
          </div>

          <TextField
            autoComplete="equipment"
            value={equipment}
            margin="normal"
            name="equipment"
            variant="outlined"
            label="Equipment"
            fullWidth
            onChange={(e) => setEquipment(e.target.value)}
          ></TextField>

          {videos.map((video, i) => (
            <div
              key={i}
              id={i}
              className={"textField"}
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <TextField
                multiline
                margin="normal"
                name="video1"
                variant="outlined"
                label={`Video ${i + 1}`}
                style={{ width: "90%" }}
                onFocus={(e) => handleFor(e)}
                onChange={(e) => handleChangeVideo(e)}
                onBlur={handleBlur}
                value={video.videoUrl}
              ></TextField>
              <div
                style={{
                  width: "10%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={(e) => handleDel(e)}
                  style={{
                    padding: "0px 10px",
                    border: "solid 1px grey",
                    color: "rgba(0, 0, 0, 0.54)",
                    borderRadius: "2px",
                    backgroundColor: "lightgrey",
                    cursor: "pointer",
                  }}
                >
                  -
                </div>
              </div>
            </div>
          ))}

          {checkPass.includes(true) && (
            <Alert style={{ marginTop: "10px" }} severity="error">
              Please do not leave the {checkPass.indexOf(true) + 1}th text field
              blank
            </Alert>
          )}

          <div
            style={{
              width: "100%",
              padding: "5px 5px 0px 5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleAdd}
              variant="outlined"
              size="medium"
              color="grey"
              style={{ fontSize: "15px", padding: "5px 40px" }}
            >
              +
            </Button>
          </div>

          <div style={{ marginTop: "10px" }}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setImage(base64)}
            ></FileBase>
          </div>
          {image && (
            <div>
              <img src={image} width="50%" alt="Program" />
            </div>
          )}
          <Grid container spacing={1} style={{ marginTop: "10px" }}>
            <Grid item xs="12" md="6">
              <Button
                component={changeURL}
                to="/admin/videos/"
                variant="outlined"
                fullWidth
              >
                Go Back
              </Button>
            </Grid>
            <Grid item xs="12" md="6">
              <Button
                style={{ backgroundColor: "#f73471" }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default CreateProgram;
