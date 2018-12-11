import React from "react";

export default ({ history }) => (
  <div className="historyList">
    <ul>
      {
        history.split(',').map( el => (
          <li>
            {el}
          </li>
        )) 
      }
    </ul>
  </div>
)