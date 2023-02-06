import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  //creating IP state
  const [ip, setIP] = useState("");
  const [locationDetails, setLocationDetails] = useState(null);

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  useEffect(() => {
    //call geolocate method to get the location using ip address
    axios.get(`https://geolocation-db.com/json/${ip}`).then((res) => {
      console.log(res.data);
      setLocationDetails(res.data);
    });
  }, [ip]);

  return (
    <div className="App">
      <h2>Your IP Address is</h2>
      <h4>{ip}</h4>
      {/* show user city country and country code */}

      {locationDetails ? (
        <div className="locationsection">
          <h2>Your Location is</h2>
          <h4>
            City <span className='location'>{locationDetails.city} </span>
          </h4>
          <h4>
            Country<span className='location'>{locationDetails.country_name}</span>
          </h4>
          <h4>
            Country Code<span className='location'>{locationDetails.country_code}</span>{" "}
          </h4>
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
}

export default App;
