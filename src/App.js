import React from 'react';

import Titles from "./components/Titles";
import Form from "./components/Form";
import Table from "./components/Table";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      parkingLot: {
        1: { regNo: 'KA-01-AB-1234', carColor: 'BLUE', dateAndtime: '2022-10-18T19:30', isOccupied: true },
        2: { regNo: '', carColor: 'RED', dateAndtime: '', isOccupied: false },
        3: { regNo: 'KA-09-AK-9268', carColor: 'RED', dateAndtime: '2022-10-18T19:30', isOccupied: true },
        4: { regNo: 'KA-10-DE-8991', carColor: 'BLACK', dateAndtime: '2022-10-18T19:30', isOccupied: true },
        5: { regNo: '', carColor: 'RED', dateAndtime: '', isOccupied: false },
        6: { regNo: '', carColor: 'GREEN', dateAndtime: '', isOccupied: false },
        7: { regNo: '', carColor: 'YELLOW', dateAndtime: '', isOccupied: false },
        8: { regNo: '', carColor: 'RED', dateAndtime: '', isOccupied: false },
        9: { regNo: '', carColor: 'GREEN', dateAndtime: '', isOccupied: false },
        10: { regNo: 'KA-10-AA-5555', carColor: 'WHITE', dateAndtime: '2022-10-19T19:30', isOccupied: true },
      },

      slotsAvailable: 6,
      freeSlotList: [2,5,6,7,8,9]
    }

    this.addCar = this.addCar.bind(this)
    this.removeCar = this.removeCar.bind(this)
  }

  addCar(slotNo, regNo, carColor, dateAndtime) {
    console.log("addCar in App gets these parameters", slotNo, regNo, carColor, dateAndtime);

    let stateTmp = Object.assign({}, this.state);    //creating copy of object
    // console.log("copy of parkingLot", JSON.stringify(stateTmp))
    // stateTmp is assigned parkingLot every time addCar is executed and keeps on adding it as arrays
    stateTmp.parkingLot[slotNo] = { regNo: regNo, carColor: carColor, dateAndtime: dateAndtime, isOccupied: true }     //updating value
    this.setState({ stateTmp })
    this.setState({ slotsAvailable: this.state.slotsAvailable - 1 })
    
    const index = this.state.freeSlotList.indexOf(parseInt(slotNo));
    // console.log("index",index)
    // console.log("TypeOfSlotNO", typeof slotNo)
    let freeSlotListTemp = this.state.freeSlotList
    if (index > -1) { // only splice array when item is found
      freeSlotListTemp.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log("freeSlotListTemp",freeSlotListTemp)
    this.setState({ freeSlotList: freeSlotListTemp },() =>{console.log("freeSLotList after add car", this.state.freeSlotList)} )
    console.log("updated values in stateTmp only which are occupied", JSON.stringify(stateTmp))
  }

  removeCar(slotNo) {

    const regNo = this.state.parkingLot[slotNo].regNo;
    const dateAndtime = this.state.parkingLot[slotNo].dateAndtime;
    var currentdate = new Date()
    var datetime = currentdate.getFullYear()  + "-"
                  + (currentdate.getMonth()+1)  + "-" 
                  + currentdate.getDate() + "T"
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes()

    alert('DONE! \n'+regNo +'\nenter: '+dateAndtime+'\nexit: '+datetime)
    let confirmAction = window.confirm("Are you sure to remove?");
      if (confirmAction) {
        this.state.parkingLot[slotNo].isOccupied = false;
        this.setState({ parkingLot: this.state.parkingLot })       //this.state.parkingLot removes that particular slot, this.state removes all
        this.setState({ slotsAvailable: this.state.slotsAvailable + 1 })
        this.setState({ freeSlotList: [...this.state.freeSlotList,parseInt(slotNo)] }, () => { console.log("freeSLotList after remove car", this.state.freeSlotList) })
      } else {
        alert('Canceled remove');
      }
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
                  <Form parkingLot={this.state.parkingLot} addCar={this.addCar} />
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
                  <h1 className="spot" >Free Slot(S): <span>{this.state.freeSlotList.join(" ")}</span></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ); //dateandtime
  }
}

export default App;
