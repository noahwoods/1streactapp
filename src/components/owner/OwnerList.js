import React, { Component } from 'react'


export default class OwnerList extends Component {
  render() {
    return (
      <section className="owners">
        {
          this.props.owners.map(owner =>
            <div key={owner.id}>
              <div className="card-body">
                <h5 className="card-title">
                  <div className="owner-name">{owner.name}</div>
                  <br></br>
                  <br></br>
                  {owner.phone}
                  <a href="#"
                    onClick={() => this.props.deleteOwner(owner.id)}
                    className="card-link">Delete</a>
                </h5>
              </div>
            </div>
          )
        }
      </section>
    );
  }
}
