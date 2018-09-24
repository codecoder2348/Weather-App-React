import React, {PureComponent} from 'react';


export default class CityInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: "",
            temperature: "",
            humidity: ""
        };
        this.getWeatherData = this.getWeatherData.bind(this);
    }

    componentWillReceiveProps(newprop){
        if(newprop.info !== this.props.info){
            this.getWeatherData(newprop.info.id)
        }
    }

    getWeatherData(cityId){
        const url = "http://api.openweathermap.org/data/2.5/group?&appid=a36da9e9cfbb1412b0a14ff78cb11189&";
        fetch(url + "id=" + cityId)
            .then(response => response.json())
            .then(data => this.setState({
                weatherData: data["list"][0]["weather"][0]["description"],
                temperature: data["list"][0]["main"]["temp"],
                humidity: data["list"][0]["main"]["humidity"],
            }));
    }

    componentWillMount() {
        this.getWeatherData(this.props.info.id)
    }


    render() {
        const {info} = this.props;
        const displayName = `${info.city}`;

        return (
            <div className="weatherPopUp">
                <table className="weatherTable">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>{this.props.info.city}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Weather</td>
                            <td>{this.state.weatherData}</td>
                        </tr>
                        <tr>
                            <td>Temperature</td>
                            <td>{this.state.temperature} Kelvin</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{this.state.humidity} %</td>
                        </tr>
                    </tbody>
                </table>


            </div>
        );
    }
}