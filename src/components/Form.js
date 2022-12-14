import React from "react";

class Form extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      newCarColor: "",
      newCarRegNo: "",
      newCarDateTime: ""
    }
    this.addCar = this.addCar.bind(this);
    this.onRegNoInputChange = this.onRegNoInputChange.bind(this);
    this.setSelectedColor = this.setSelectedColor.bind(this);
    this.setDateandTime = this.setDateandTime.bind(this);
	}

  checkColor(CarColor) {
    if (CarColor === "") {
      alert("Choose your car's color");
      return false;
    } else {
      return true;
    }
  }
	
	checkRegNoFormat(regNo) {
    if (regNo.match("^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-[0-9]{4}$")) {
      return true;
    } else {
      alert("Write your registration no in the following format: KA-01-AB-1234");
      return false;
    }
  }

  checkDateAndTime(dateAndtime){
    if (dateAndtime === ""){
      alert("Choose your date and time")
      return false;
    } else {
      return true;
    }
  }

  
   addCar(e) {
		e.preventDefault();
		
		// Formating  
    if (!this.checkRegNoFormat(this.state.newCarRegNo)) {
      return false;
		}
    if (!this.checkColor(this.state.newCarColor)) {
      return false;
		}
    if (!this.checkDateAndTime(this.state.newCarDateTime)) {
      return false;
		}
		
		var newSlotNo = 0; 
		
		// to find closest available slot. first value is closest.
		
		Object.keys(this.props.parkingLot).map((slot) => {
      if (!this.props.parkingLot[slot].isOccupied && newSlotNo === 0) {
        newSlotNo = slot;
        // these parameters are passed to addCar() in App
				this.props.addCar(newSlotNo, this.state.newCarRegNo, this.state.newCarColor, this.state.newCarDateTime);
				// console.log(this.props.addCar)
				return
      }
    })

		if (newSlotNo === 0) {
			alert('Sorry, no spots available right now!')
		}
	}
	
	onRegNoInputChange(e) {
    this.setState({ newCarRegNo: e.target.value.toUpperCase()});
    // console.log('pressed key is', e.target.value);
    
  }

  setSelectedColor(e) {
    this.setState({ newCarColor: e.target.value.toUpperCase()});
    // console.log(e.target.value);
  }

  setDateandTime(e){
    this.setState({ newCarDateTime: e.target.value.toUpperCase()});
  }


	render () {
		return (
			<form>
        <input
          onChange={this.onRegNoInputChange}
          type="text"
          name="regno"
          placeholder="KA-01-AB-1234"
        />
        <select name="select" onChange={this.setSelectedColor}>
          <option value="">None</option>
          <option value="Blue">Blue</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Black">Black</option>
        </select>
        <input type="datetime-local" 
        name="DateTime" id="start-time" onChange={this.setDateandTime}/>
        <div className="park-car-button">
          <button onClick={this.addCar}>Park Car</button>
          </div>
      </form>
		);
	}
};

export default Form;
