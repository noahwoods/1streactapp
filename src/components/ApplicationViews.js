import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './locations/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'


class ApplicationViews extends Component {

  // hard coded data
  // employeesFromAPI = [
  //     { id: 1, name: "Jessica Younker" },
  //     { id: 2, name: "Jordan Nelson" },
  //     { id: 3, name: "Zoe LeBlanc" },
  //     { id: 4, name: "Blaise Roberts" }
  // ]

  // locationsFromAPI = [
  //     { id: 1, name: "Nashville North", address: "500 Doggo Lane" },
  //     { id: 2, name: "Nashville South", address: "114 Meow Street" }
  // ]

  // animalsFromAPI = [
  //     { id: 1, name: "Doodles" },
  //     { id: 2, name: "Jack" },
  //     { id: 3, name: "Angus" },
  //     { id: 4, name: "Henley" },
  //     { id: 5, name: "Derkins" },
  //     { id: 6, name: "Checkers" }
  // ]

  // ownersFromAPI = [
  //   { id: 1, name: "Peter Parker", phone: "774-337-6261"},
  //   { id: 2, name: "Scott Lang", phone: "843-268-6261"},
  //   { id: 3, name: "Peter Quill", phone: "467-827-5673"},
  //   { id: 4, name: "Tony Stark", phone: "843-626-4766"}
  // ]

  // state = {
  //     employees: this.employeesFromAPI,
  //     locations: this.locationsFromAPI,
  //     animals: this.animalsFromAPI,
  //     owners: this.ownersFromAPI
  // }
  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: []
  }

  componentDidMount() {
    const newState = {}

    fetch("http://localhost:5002/animals")
      .then(r => r.json())
      .then(animals => newState.animals = animals)
      .then(() => fetch("http://localhost:5002/employees")
        .then(r => r.json()))
      .then(employees => newState.employees = employees)
      .then(() => fetch("http://localhost:5002/locations")
        .then(r => r.json()))
      .then(locations => newState.locations = locations)
      .then(() => fetch("http://localhost:5002/owners")
        .then(r => r.json()))
      .then(owners => newState.owners = owners)
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
          return <LocationList locations={this.state.locations} />
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