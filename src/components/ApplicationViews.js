import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './locations/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import AnimalManager from "../modules/AnimalManager"
import EmployeeManager from "../modules/EmployeeManager"
import OwnerManager from "../modules/OwnerManager"
import LocationManager from "../modules/LocationManager"





class ApplicationViews extends Component {

  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: []
  }

  componentDidMount() {
    const newState = {}
    AnimalManager.getAll().then(allAnimals => {
      newState.animals = allAnimals
    })
    EmployeeManager.getAll().then(allEmployees => {
    newState.employees = allEmployees
    })
    LocationManager.getAll().then(allLocations => {
      newState.locations = allLocations
    })
    OwnerManager.getAll().then(allOwners => {
      newState.owners = allOwners
    })
.then(() => this.setState(newState))

  }

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(e => e.json())
      .then(animals => this.setState({
        animals: animals
      })
      )
  }

  deleteEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    })
      .then(x => x.json())
      .then(() => fetch(`http://localhost:5002/employees`))
      .then(x => x.json())
      .then(employees => this.setState({
        employees: employees
      })
      )
  }

  deleteOwner = id => {
    return fetch(`http://localhost:5002/owners/${id}`, {
      method: "DELETE"
    })
      .then(o => o.json())
      .then(() => fetch(`http://localhost:5002/owners`))
      .then(o => o.json())
      .then(owners => this.setState({
        owners: owners
      })
      )
  }




  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <LocationList
            locations={this.state.locations} />
        }} />
        <Route path="/animals" render={(props) => {
          return (
            <AnimalList
              animals={this.state.animals}
              owners={this.state.owners}
              deleteAnimal={this.deleteAnimal} />

          )
        }} />
        <Route path="/employees" render={(props) => {
          return <EmployeeList
            employees={this.state.employees}
            deleteEmployee={this.deleteEmployee} />
        }} />
        <Route path="/owners" render={(props) => {
          return <OwnerList
            owners={this.state.owners}
            deleteOwner={this.deleteOwner} />

        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews