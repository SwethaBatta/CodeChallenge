import React, { Component } from "react";
import axios from "axios";
const config = require("./../config");

class CompanyCost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyData: [],
    };
  }

  componentDidMount() {
    axios.get(`${config.URL}/companyData`).then((res) => {
      const companyData = res.data;
      this.setState({ companyData });
    });
  }

  render() {
    return (
      <div>
        <div className="companyDetails">
          <div className="">
            <br />
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <b>Company</b>
                  </th>
                  <th>
                    <b>Cost</b>
                  </th>
                  <th>
                    <b>Employee count</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.companyData.map((company) => (
                  <tr key={company._id}>
                    <td key={company._id}>{company._id}</td>
                    <td key={company.cost}>{company.cost}</td>
                    <td key={company.count}>{company.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyCost;
