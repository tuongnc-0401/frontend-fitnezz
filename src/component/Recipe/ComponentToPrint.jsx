import React, { Component } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
class ComponentToPrint extends Component {
    render() {
        return (
            <Box style={{ padding: '20px' }}>
                <div id="printContain">
                    <Typography variant="h3">Chilled Avocado & Zucchini Soup</Typography>
                    <Grid container spacing={3} style={{ marginTop: '30px' }}>
                        <Grid item xs={12} container justifyContent="center" >
                            <img src={this.props.meal?.image} alt="recipedetails" />
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '30px' }} spacing={3}>
                        <Grid item xs={12} md={6} container justifyContent="center">
                            <Box>
                                <Typography variant="h4" style={{ color: '#f73471', fontWeight: '600', marginBottom: '5px' }}>Instruction</Typography>
                                <Typography dangerouslySetInnerHTML={{ __html: this.props.meal?.instruction }} style={{ color: 'rgb(134, 142, 150)' }}></Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} container justifyContent="flex-start" style={{ minHeight: '100%' }}>
                            <Box>
                                <Typography variant="h4" style={{ color: '#f73471', fontWeight: '600', marginBottom: '5px' }}>Ingredients</Typography>
                                <Typography dangerouslySetInnerHTML={{ __html: this.props.meal?.ingredients }} style={{ color: 'rgb(134, 142, 150)', marginBottom: '20px' }}></Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Box >
        )
    }
}

export default ComponentToPrint
