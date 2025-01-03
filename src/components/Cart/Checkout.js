import { useEffect, useRef, useState } from "react";
import classes from "./Checkout.module.css";
import { BASE_URL } from "../../Configs/config";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    seatNumber: true,
    coachNumber: true,
    // trainNumber: true
  });
  const [trains, setTrains] = useState([])
  const [trainNumber,setTrainNumber] = useState(null)
  const [myStations, setStations] = useState(null)
  const [selectedStation, setSelectStation] = useState(null)
  const seatNumber = useRef();
  const coachNumber = useRef();
  // const trainNumber = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredSeat = seatNumber.current.value;
    const enteredCoach = coachNumber.current.value;
    // const enteredTrainNumber = trainNumber.current.value;

    const eenteredSeatIsValid = !isEmpty(enteredSeat);
    const enteredCoachIsValid = !isEmpty(enteredCoach);
    // const eenteredTrainNumberIsValid = isNot5Char(enteredTrainNumber);

    setFormInputValidity({
      seatNumber: eenteredSeatIsValid,
      coachNumber: enteredCoachIsValid,
      trainNumber: trainNumber
    });

    const formIsValid =
    eenteredSeatIsValid &&
    eenteredSeatIsValid 
    // eenteredTrainNumberIsValid

    if (!formIsValid) {
      return;
    }
    console.log({
      seatNumber: enteredSeat,
      coachNumber: enteredCoach,
      trainNumber: trainNumber,
      station: selectedStation 
    }, "Save Data")
    //submit the cart data
    props.onSubmit({
      seatNumber: enteredSeat,
      coachNumber: enteredCoach,
      trainNumber: trainNumber,
      station: selectedStation 
    });
  };

  //css classes
  const nameControlClasses = `${classes.control} ${
    formInputValidity.seatNumber ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.coachNumber ? "" : classes.invalid
  }`;
  const postaCodeControlClasses = `${classes.control} ${
    formInputValidity.trainNumber ? "" : classes.invalid
  }`;
  useEffect(()=>{
    fetch(`${BASE_URL}/get_trains`).then((resp)=> resp.json()).then((data)=> setTrains(data?.trains))
    .catch(e => console.log(e, "Error"))
  },[])
  const handleChange = (event) =>{
    const value = event.target.value;
    const data = trains?.filter(item => item.trainNumber === value)
    setTrainNumber({trainNumber:data[0].trainNumber, trainName: data[0]?.trainName})
    const station  = getFutureStations(data?.[0]?.stations)
    setStations(station)
  }
  const handleStationChange = (event) =>{
    const value = event.target.value;
    let data = myStations?.filter(item => item.stationName === value)
    setSelectStation(data[0])
  }
  function getFutureStations(stations) {
    // Get the current time using Date.now()
    const now = new Date();
    const currentDate = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    currentDate.setHours(currentHours, currentMinutes, 0, 0);
  
    // Filter stations with future arrival times
      const futureStations = stations?.filter((station) => {
        const [stationHours, stationMinutes] = station?.arrivalTime.split(":").map(Number);
        const stationDate = new Date();
        stationDate.setHours(stationHours, stationMinutes, 0, 0);
    
        return stationDate > currentDate;
      })
      // Return the filtered future stations or an empty array if no future stations
      return futureStations?.length > 0 ? futureStations : stations;
    
  }
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Seat Number</label>
        <input type="text" id="name" ref={seatNumber} />
        {!formInputValidity.seatNumber && <p>Please enter seat number!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Coach Number</label>
        <input type="text" id="street" ref={coachNumber} />
        {!formInputValidity.coachNumber && <p>Please enter a coach Number!</p>}
      </div>
      <div className={postaCodeControlClasses}>
        <label htmlFor="postal">Train Number</label>
        <select
        id="dropdown"
        value={trainNumber?.trainNumber ?? ""}
        onChange={handleChange}
        style={{
          width: "50%",
          padding: "8px 10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: "16px",
        }}
      >
        <option value="" disabled>
          -- Select --
        </option>
        {trains?.length > 0 && trains.map((option, index) => (
          <option key={index} value={option?.trainNumber}>
            {option?.trainName}
          </option>
        ))}
      </select>
      </div>
      <div className={postaCodeControlClasses}>
        <label htmlFor="postal">Delivery Address</label>
        <select
        id="dropdown2"
        value={selectedStation?.stationName || ""}
        onChange={handleStationChange}
        style={{
          width: "50%",
          padding: "8px 10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: "16px",
        }}
      >
        <option value="" disabled>
          -- Select --
        </option>
        {myStations?.length > 0 && myStations.map((option, index) => (
          <option key={index} value={option?.stationName}>
            {option?.stationName}-{option.stationCode}-{option.arrivalTime}
          </option>
        ))}
      </select>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
