/**
|--------------------------------------------------
| For Function Based Component. Please UnComment When We Used Function Based Component in All Files.
|--------------------------------------------------
*/
import React from 'react'
import Loading from "./Loading.gif";

const Spinner = ()=>{
    return (
      <div className='text-center'>
        <img src={Loading} alt="Loading" />
      </div>
    )
}

export default Spinner;












/**
|--------------------------------------------------
| For ClassBased Component. Please UnComment When We Used ClassBased Component in All Files.
|--------------------------------------------------
*/

// import React, { Component } from 'react'
// import Loading from "./Loading.gif";

// export class Spinner extends Component {
//   render() {
//     return (
//       <div className='text-center'>
//         <img src={Loading} alt="Loading" />
//       </div>
//     )
//   }
// }

// export default Spinner
