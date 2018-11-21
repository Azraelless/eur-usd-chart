import React, { PureComponent } from 'react'
import MaterialTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from "react-router-dom";

function LinkTab(props) {
    return <Tab component={Link} {...props} />;
}


class Tabs extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.time || "1min"
        };
    }

    handleChange = (event, value) => {
        this.setState({ value: value });
      };
    
    render() {
        return(
            <MaterialTabs 
                value={this.state.value}
                onChange={this.handleChange}
                centered
            >
                <LinkTab label="1 minute" to="/1min" value="1min"/>
                <LinkTab label="5 minutes" to="/5min" value="5min" />
                <LinkTab label="1 hour" to="/1hour" value="1hour" />
                <LinkTab label="1 week" to="/1week" value="1week" />
            </MaterialTabs>
        )
    }
}

export default Tabs