import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import moment from 'moment'


const TIMESTAMPS = {
    "1min": "MIN_1",
    "5min": "MIN_5",
    "1hour": "HOUR_1",
    "1week": "WEEK_1",
}

const URL = "https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time="

class Chart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            time: "1min",
            error: null,
            isLoaded: false,
            data: []
        };
    }

    fetchData(time) {
        const timeStamp = TIMESTAMPS[time]
        fetch(URL + timeStamp)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        time: time,
                        isLoaded: true,
                        data: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    
    componentDidMount() {
        const { time } = this.props
        this.fetchData(time || "1min")
    }
    componentDidUpdate() {
        const { time } = this.props
        if (time && this.state.time !== time)
            this.fetchData(time)
    }

    formatDateTime(tickItem, time) {
        let dateTime = moment(tickItem, "x")
        switch(time) {
            case "1min":
                return dateTime.format("D.M.YY H:mm")
            case "5min":
                return dateTime.format("D.M.YY H:mm")
            case "1hour":
                return dateTime.format("D.M.YY H:mm")
            case "1week":
                return dateTime.format("D.M.YY")
            // no default
        }
        
    }

    formatTooltip(value, name, props) {
        console.log(value, name, props)
        return props.payload.date
    }

    render() {
        const { time, error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <CircularProgress />;
        } else {
            return (
                <LineChart width={760} height={400} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
                    <XAxis dataKey="date" tickFormatter={(tickItem) => this.formatDateTime(tickItem, time)} minTickGap={50} />
                    <YAxis dataKey="close" domain={['dataMin', 'dataMax']}/>
                    <Tooltip label="EUR/USD" labelFormatter={(tickItem) => this.formatDateTime(tickItem, time)} />
                </LineChart>
            );
        }
      }
}

export default Chart