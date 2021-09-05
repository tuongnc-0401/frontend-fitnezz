import { Box, Button, CircularProgress, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createdIngredient } from '../../../actions/ingredientActions';
import useStyles from './styles';
import { Link as changeURL } from "react-router-dom";

const CreateIngredient = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [ingredientData, setIngredientData] = useState({
        name: '', image: '', category: '', description: '', calo: null
    });
    const newIngredient = useSelector(state => state.newIngredient)
    const { loading, success, error } = newIngredient
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createdIngredient(ingredientData))

    }
    useEffect(() => {
        if (newIngredient) {
            newIngredient.success = false
        }
    }, [newIngredient])
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    CREATE NEW INGREDIENT
                </Typography>
                {loading && <CircularProgress style={{ marginTop: '10px' }} color="secondary" />}
                {error && <Alert style={{ marginTop: '10px' }} severity="error">{error}</Alert>}
                {success && <Box display="flex" mt={2}>
                    <Alert elevation={2} severity="success" fullWidth>Success </Alert>

                </Box>}
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField autoComplete="name" autoFocus margin="normal" name="name" variant="outlined" label="Name" fullWidth value={ingredientData?.name} onChange={(e) => setIngredientData({ ...ingredientData, name: e.target.value })}></TextField>
                    <FormControl component="fieldset" style={{ marginTop: '10px' }}>
                        <FormLabel component="legend">Category</FormLabel>
                        <RadioGroup aria-label="category" name="category" value={ingredientData?.category} onChange={(e) => setIngredientData({ ...ingredientData, category: e.target.value })}>
                            <FormControlLabel value="grain" control={<Radio />} label="Grain" />
                            <FormControlLabel value="dairy" control={<Radio />} label="Dairy" />
                            <FormControlLabel value="fruit" control={<Radio />} label="Fruit" />
                            <FormControlLabel value="vegetable" control={<Radio />} label="Vegetable" />
                            <FormControlLabel value="protein" control={<Radio />} label="Protein" />
                        </RadioGroup>
                    </FormControl>
                    <TextField margin="normal" name="calo" type="Number" variant="outlined" label="Calo" fullWidth value={ingredientData?.calo} onChange={(e) => setIngredientData({ ...ingredientData, calo: e.target.value })}></TextField>
                    <TextField multiline margin="normal" name="description" variant="outlined" label="Description" fullWidth value={ingredientData?.description} onChange={(e) => setIngredientData({ ...ingredientData, description: e.target.value })}></TextField>
                    <div>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setIngredientData({ ...ingredientData, image: base64 })}>
                        </FileBase>
                    </div>
                    {ingredientData?.image && (
                        <div>
                            < img src={ingredientData.image} width="50%" alt="ingredientimage" />
                        </div>)}
                    <Grid container spacing={1} style={{ marginTop: "5px" }}>
                        <Grid item xs="12" md="6">
                            <Button component={changeURL} to="/admin/ingredient/" variant="outlined" fullWidth>Go Back</Button>
                        </Grid>
                        <Grid item xs="12" md="6">
                            <Button style={{ backgroundColor: '#f73471' }}
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
        </Container >


    )
}

export default CreateIngredient
