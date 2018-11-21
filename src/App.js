import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';

import "./App.css";
import Chart from "./components/Chart";
import Tabs from "./components/Tabs";

const styles = {
    root: {
      width: '100%',
      maxWidth: 800,
      padding: 20
    },
  };

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
            <Router>
                <Route path="/:time(1min|5min|1hour|1week)?" component={Child} />
            </Router>
        </div>
    );
  }
}

class Child extends Component {
    render() {
        // const { classes } = this.props;
        const { time } = this.props.match.params;
        return (
            <div>
                <Typography component="h2" variant="h2">
                    EUR/USD Chart
                </Typography>
                <Paper>
                    <Tabs time={time} />
                    <Chart time={time} />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(App);
