// import PropTypes from 'prop-types';
import React from 'react';
// import { useHistory } from 'react-router-dom';
// import MyContext from '../context/MyContext';

function Login() {
  return (
    <h1>
      OLA
    </h1>
  );
}
// const { handleChange, isDisabled, submitLogin } = useContext(MyContext);
//   const history = useHistory();

//   const redirectTo = (pathname) => {
//     submitLogin();
//     history.push(pathname);
//   };

//   return (
//     <div className="container-form d-flex justify-content-center align-items-center">
//       <form className="p-3 pt-5 pb-5 form border rounded">
//         <div className="d-flex justify-content-center">
//           <h1 className="h1 login-title fw-bold mb-5 text-center">
//             TRYBE
//             <span>FOODS</span>
//           </h1>
//         </div>
//           <label htmlFor="inputEmail">Email Address</label>
//           <Form.Control
//             type="email"
//             name="inputEmail"
//             id="inputEmail"
//             data-testid="email-input"
//             placeholder="E-mail"
//             onChange={ handleChange }
//           />
//         </form>

//         <Form.Group className="mb-3">
//           <Form.Label htmlFor="inputPassword">Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="inputPassword"
//             id="inputPassword"
//             data-testid="password-input"
//             placeholder="Password"
//             onChange={ handleChange }
//           />
//           <Form.Text muted>
//             Your password must have at least 7 characters.
//           </Form.Text>
//         </Form.Group>
//         <div className="d-flex justify-content-center">
//           <Button
//             type="button"
//             disabled={ isDisabled }
//             data-testid="login-submit-btn"
//             onClick={ () => redirectTo('/meals') }
//             variant="warning"
//           >
//             Submit
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }

// Login.propTypes = {
//   history: PropTypes.shape({}),
//   push: PropTypes.func,
// }.isRequired;

export default Login;
