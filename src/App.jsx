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
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  useEffect(() => {
    // axios.get(`https://geolocation-db.com/json/${ip}`).then((res) => {
    //   console.log(res.data);
    //   setLocationDetails(res.data);
    // });

    // axios.get(`https://ipfind.co/?ip=${ip}&auth=8e7d9c05-752d-462c-a7b8-e6223bbee504`,
    // {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //   }
    // }).then((res) => {
    //   console.log(res.data);
    //   setLocationDetails(res.data);
    // }
    // );

    //1879f8e663714bd39496672aa6aaf629

    axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=1879f8e663714bd39496672aa6aaf629&ip_address=${ip}`).then((res) => {
      console.log(res.data);
      setLocationDetails(res.data);
    }
    );
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
            Country<span className='location'>{locationDetails.country}</span>
          </h4>
          <h4>
            Country Code<span className='location'>{locationDetails.country_code}</span>{" "}
          </h4>
          <h4>
            Region <span className='location'>{locationDetails.region}</span>
          </h4>
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
}

export default App;
