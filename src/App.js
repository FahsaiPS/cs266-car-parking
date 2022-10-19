import React from 'react';

import Titles from "./components/Titles";
import Form from "./components/Form";
import Table from "./components/Table";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      parkingLot:{
        1:{regNo:'KA-01-AB-1234',carColor:'BLUE',dateAndtime: '2022-10-18T19:30',isOccupied:true},
        2:{regNo:'4312',carColor:'RED',dateAndtime: '2018-10-18T19:30',isOccupied:false},
        3:{regNo:'KA-09-AK-9268',carColor:'RED',dateAndtime: '2018-10-18T19:30',isOccupied:true},
        4:{regNo:'KA-10-DE-8991',carColor:'BLACK',dateAndtime: '2018-10-18T19:30',isOccupied:true},
        5:{regNo:'',carColor:'RED',isOccupied:false},
        6:{regNo:'',carColor:'GREEN',isOccupied:false},
        7:{regNo:'',carColor:'YELLOW',isOccupied:false},
        8:{regNo:'',carColor:'RED',isOccupied:false},
        9:{regNo:'',carColor:'GREEN',isOccupied:false},
        10:{regNo:'KA-10-AA-5555',carColor:'WHITE',dateAndtime: '2018-10-19T19:30',isOccupied:true},
      },

      slotsAvailable: 6
    }

    this.addCar = this.addCar.bind(this)
    this.removeCar = this.removeCar.bind(this)
  }

  addCar(slotNo,regNo,carColor,dateAndtime) {
    console.log("addCar in App gets these parameters", slotNo,regNo,carColor,dateAndtime);
    
    let stateTmp = Object.assign({}, this.state);    //creating copy of object
    // console.log("copy of parkingLot", JSON.stringify(stateTmp))
    // stateTmp is assigned parkingLot every time addCar is executed and keeps on adding it as arrays
    stateTmp.parkingLot[slotNo] = {regNo:regNo,carColor:carColor,dateAndtime:dateAndtime,isOccupied:true}     //updating value
    this.setState({stateTmp})
    this.setState({slotsAvailable:this.state.slotsAvailable - 1})
    console.log("updated values in stateTmp only which are occupied", JSON.stringify(stateTmp))
  }

  removeCar(slotNo) {
    this.state.parkingLot[slotNo].isOccupied = false;
    this.setState({parkingLot:this.state.parkingLot})       //this.state.parkingLot removes that particular slot, this.state removes all
    this.setState({slotsAvailable:this.state.slotsAvailable + 1})
    console.log(`updated parkingLot after row ${slotNo} removed`, JSON.stringify(this.state.parkingLot))
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form parkingLot={this.state.parkingLot} addCar={this.addCar}/>
                  <div className="tbl-header">
                    <table>
                      <thead>
                        <tr>
                          <th>Action</th>
                          <th>Slot No</th>
                          <th>Registration No</th>
                          <th>Car Color</th>
                          <th>Date & Time</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div className="tbl-content">
                    <Table parkingLot={this.state.parkingLot} removeCar={this.removeCar} />
                  </div>
                  <h1 className="spot" >Spots Left: <span>{this.state.slotsAvailable}</span></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
