import {useRouterError} from "react-router-dom"
import '../style.css';

const Error = () => {
  return ( 
    <div className="error-container">
      <h1 className="error-title">Oops!!! 😿</h1>
      <h2 className="error-subtitle">Something went wrong</h2>

      <img
        className="error-image"
        src="https://cataas.com/cat/sad"
        alt="sad cat"
      />

      <p className="error-text">Don't worry, even cats have bad days , huhhhh 🐾</p>
    </div>
  );
};

export default Error;