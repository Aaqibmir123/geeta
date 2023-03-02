import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Authcontextprovider } from './Components/store/Authcontext';
import { BrowserRouter } from 'react-router-dom';
import { Authcontextproviders } from './Components/store/Expensescontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Authcontextprovider>
   <Authcontextproviders>
      <App />
      </Authcontextproviders>
    </Authcontextprovider>
  </BrowserRouter>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
