import React, { Component } from "react";
import {
  geolocationApi,
  searchCity,
  iconsSwitch1
} from "../actions/searchAction";
import Search from "./Search";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/en-gb";
import Addfavotire from "./Addfavotire";
import Toggleswitch from "./Toggleswitch";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import SplitText from "react-pose-text";

const charPoses = {
  exit: { y: 40, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: ({ charInWordIndex }) => ({
      type: "spring",
      delay: charInWordIndex * 30,
      stiffness: 500 + charInWordIndex * 150,
      damping: 10 - charInWordIndex * 1
    })
  }
};

class App extends Component {
  state = {
    flagToggle: true
  };

  componentDidMount() {
    this.props.searchCity(this.props.cityName);
    this.props.geolocationApi();
  }

  render() {
    return (
      <div>
        <div className="toggle-location">
          <span className="toggle-container">
            <Toggleswitch />
          </span>
          <div className="displayLocation">
            <img
              className="LocationImgStyle"
              src={require("../data/icons/icons8-location-8000.png")}
              alt="location"
            />
            <p className="myLocation">{this.props.dataLocation}</p>
          </div>
        </div>
        {/* <Hamburger /> */}
        <Search />
        <div className="container">
          <div className="container-card2">
            {this.props.forcast.map((temp, i) => {
              return (
                <div key={i} className="card-in">
                  <div className="Addfavotire">
                    <Addfavotire />
                  </div>

                  <SplitText
                    initialPose="exit"
                    pose="enter"
                    charPoses={charPoses}
                  >
                    {`${this.props.cityName}, ${this.props.cityId}`}
                  </SplitText>
                  <div className="container-toggle-Temperature">
                    <h6 className="title-city">
                      {this.state.flagToggle
                        ? temp.Temperature.Metric.Value + " ℃"
                        : temp.Temperature.Imperial.Value + " °F"}
                    </h6>
                    <div className="toggleTemp1">
                      <BootstrapSwitchButton
                        checked={true}
                        offlabel="°F"
                        onstyle="info"
                        offstyle="info"
                        onlabel="℃"
                        size="sm"
                        onChange={checked => {
                          this.setState({ flagToggle: checked });
                        }}
                      />
                    </div>
                  </div>
                  <div className="container-WeatherText-iconsSwitch1">
                    <h6>{`${temp.WeatherText}`}</h6>
                    <img src={iconsSwitch1(temp.WeatherText)} alt="none" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="all">
            {this.props.forcasts.map((temp, i) => {
              const fahrenheitMin = temp.Temperature.Minimum.Value;
              const fahrenheitMax = temp.Temperature.Maximum.Value;
              const CelsiusMin = ((5 / 9) * (fahrenheitMin - 32)).toFixed(0);
              const CelsiusMax = ((5 / 9) * (fahrenheitMax - 32)).toFixed(0);
              return (
                <div key={i} className="item">
                  <h5 className="card-title2">
                    {moment(temp.Date).format("L")}
                  </h5>
                  <h5 className="card-title2">
                    {moment(temp.Date).format("dddd")}
                  </h5>
                  {this.state.flagToggle ? (
                    <h5 className="card-text1">
                      {CelsiusMin} - {CelsiusMax} {" ℃"}
                    </h5>
                  ) : (
                    <h5 className="card-text1">
                      {fahrenheitMin} - {fahrenheitMax} {" °F"}
                    </h5>
                  )}
                  <h6 className="card-title1">{this.props.cityId}</h6>
                  {/* <br /> */}
                  <img
                    className="img-icon-home1"
                    // style={{ width: "80px" }}
                    src={iconsSwitch1(temp.Day.IconPhrase)}
                    alt="none"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <br />
        <div className="line-1 anim-typewriter">
          React Weather-app <br />
          Made by Dori with ❤️
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  forcast: state.searchReducer.forcast,
  forcasts: state.searchReducer.forcasts,
  cityName: state.searchReducer.cityName,
  cityId: state.searchReducer.cityId,
  dataLocation: state.searchReducer.dataLocation,
  image: state.searchReducer.image
});

export default connect(mapStateToProps, { searchCity, geolocationApi })(App);
//♡
