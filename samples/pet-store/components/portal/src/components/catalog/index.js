/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Item from "./Item";
import {Button, Grid, Typography} from "@material-ui/core";

const styles = (theme) => ({
    titleUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    titleContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    titleButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    }
});

const Catalog = ({catalog, classes, history}) => (
    <div className={classes.titleUnit}>
        <div className={classes.titleContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Pet Store
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Buy accessories for your Pets
            </Typography>
            <div className={classes.titleButtons}>
                <Grid container spacing={16} justify="center">
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => history.push("/orders")}>
                            Check Orders
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
                {[{name:"test", description: "description", price: 12}].map((item, index) => <Item key={index} data={item}/>)}
            </Grid>
        </div>
    </div>
);

export default withStyles(styles)(Catalog);
