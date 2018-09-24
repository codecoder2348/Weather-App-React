import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup} from 'react-map-gl';
import CityPin from './city-pin';
import CityInfo from './city-info';

const TOKEN = 'pk.eyJ1Ijoic2hhbmUtcGlvbmVlciIsImEiOiJjampyN2YwZ3MzeGQxM3JteGh6YWM3Yjg5In0.joFZOIVkzx9ZVpX5B0BsZA';

const cities = [
    {"id": 5419396, "city": "New York", "latitude": 40.6643, "longitude": -73.9385},
    {"id": 5809844, "city": "Seattle", "latitude": 47.6205, "longitude": -122.3509},
    {"id": 5128638, "city": "Denver", "latitude": 39.7618, "longitude": -104.8806}
];

export default class App extends Component {

    _resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: this.props.width || window.innerWidth,
                height: this.props.height || window.innerHeight
            }
        });
    };
    _updateViewport = (viewport) => {
        this.setState({viewport});
    };
    renderCityMarker = (city, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}>
                <CityPin size={20} onClick={() => this.setState({popupInfo: city})}/>
            </Marker>

        );
    };

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 37.785164,
                longitude: -100,
                zoom: 3.5,
                bearing: 0,
                pitch: 0,
                width: 500,
                height: 500,
            },
            popupInfo: null
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize);
        this._resize();
    }

    _renderPopup() {
        const {popupInfo} = this.state;

        // to display popup if clicked on marker else do not display anything
        return  popupInfo && (
            <Popup tipSize={5}
                   anchor="top"
                   longitude={popupInfo.longitude}
                   latitude={popupInfo.latitude}
                   onClose={() => this.setState({popupInfo: null})}>
                <CityInfo info={popupInfo} />

            </Popup>

        );
    }

    render() {
        const {viewport} = this.state;
        return (
            <MapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/basic-v9"
                onViewportChange={this._updateViewport}
                mapboxApiAccessToken={TOKEN}>
                {cities.map(this.renderCityMarker)}
                {this._renderPopup()}
            </MapGL>
        );
    }
}