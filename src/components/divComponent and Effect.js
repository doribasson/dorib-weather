// import React from "react";

// const App = () => {
//   return <div>ddddd</div>;
// };

// export default App;

// *************************************************************************************

// import React from "react";

// const App = () => <div>ddd</div>;

// export default App;

// *************************************************************************************

// import React from "react";

// const App = () => {
//   return (
//     <div>
//       <div>dsfdfds</div>
//       <div>aaaa</div>
//     </div>
//   );
// };

// export default App;

// *************************************************************************************

// import React from "react";

// const App = () => (
//   <div>
//     <div>dsfdfds</div>
//     <div>aaaassss</div>
//   </div>
// );

// export default App;

// *************************************************************************************

// import React from "react";

// const App = () => {
//   let a = 4;
//   if (a > 5)
//     return (
//       <div>
//         <div>dsfdfds</div>
//         <div>aaaassss</div>
//       </div>
//     );
//   else
//     return (
//       <div>
//         <div>vvvvvvvv</div>
//         <div>vvvvvvv</div>
//       </div>
//     );
// };

// export default App;

// *************************************************************************************

// import React from "react";

// const App = () => <div>{6 > 7 ? <div>sasaass</div> : <div>dsdadsa</div>}</div>;

// export default App;

// import React from "react";

// const App = () => (
//   <div>
//     {8 > 7 ? (
//       <div>
//         <div>sasaass</div>
//         <div>aaaasaass</div>
//         <div>bbbbbbbb</div>
//       </div>
//     ) : (
//       <div>dsdadsa</div>
//     )}
//   </div>
// );

// export default App;

// *************************************************************************************

// import React from "react";

// const App = () => (
//   <div>
//     {6 > 7 ? (
//       <div>
//         <div>sasaass</div>
//         <div>aaaasaass</div>
//         <div>bbbbbbbb</div>
//       </div>
//     ) : (
//       <div>
//         <div>dsdadsa</div>
//         <div>dsdadsa</div>
//         <div>dsdadsa</div>
//       </div>
//     )}
//   </div>
// );

// export default App;

// *******************************************************************************

import React from "react";

const App = () => {
  if (9 > 6)
    // if (5 > 6)
    return (
      <div>
        {6 > 7 ? (
          <div>
            <div>sasaass</div>
            <div>aaaasaass</div>
            <div>bbbbbbbb</div>
          </div>
        ) : (
          <div>
            <div>dsdadsa</div>
            <div>dsdadsa</div>
            <div>dsdadsa</div>
          </div>
        )}
      </div>
    );
  else return <div>not bigger then 9</div>;
};

export default App;

// *******************************************************************************

import React, { useEffect, useState } from "react";

export const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // (async function() {
    //with anonymous function
    (async () => {
      try {
        setLoading(true);
        const response = await fetch("https://restcountries.eu/rest/v2/all");
        const res = await response.json();
        setLoading(false);
        console.log(res);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    })();
  }, []); //[], to make it like componentDidmount
  //[var], make it like componentDidupdate just when var update
  //without [] , make it like componentDidmount for all var that update ..update? setName("sdori") - Hooks state
  if (!loading) {
    return (
      <ul>
        {error ? (
          <li>{error.message}</li>
        ) : (
          countries.map((country, index) => <li key={index}>{country.name}</li>)
        )}
      </ul>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default App;
