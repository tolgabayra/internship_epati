import React from 'react'
import ReactDOM from "react-dom"
import App from './App';
import ne from "./ne.ts"

console.log("hello from webpack");
console.log("burasi webpack deneme konsolu")

console.log("hello from webpack");
console.log("burasi webpack deneme konsolu")

console.log("hello from webpack");
console.log("burasi webpack deneme konsolu")

import './styles/main.scss';

/**
 * Tolga BAYRAK ---
 * burası bundle deneme alanı...
 * Burası bundle deneme alanı2...
 * BUrası bundle deneme alanı3...
 */

 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
   <React.StrictMode>
     <App />
   </React.StrictMode>
 );
 