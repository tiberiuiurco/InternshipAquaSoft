const jwt = require("jsonwebtoken");

export function checkToken(){
    var isExpired = false;
    const token = localStorage.getItem('id_token');
    var decodedToken=jwt.decode(token, {complete: true});
    var dateNow = new Date();
    if(decodedToken.exp < dateNow.getTime())
        isExpired = true;

    return isExpired;
  };
    