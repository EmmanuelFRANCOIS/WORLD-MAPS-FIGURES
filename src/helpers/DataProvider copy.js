import { useEffect, useState } from 'react';
import axios from "axios";

const CountriesData = () => {

  // Countries data
  const [data, setData] = useState([]);

  // Countries data sorting
  const tri = 'top';
  const triTab = (a, b) => {
    a = a.translations.fra.common.toLowerCase();
    b = b.translations.fra.common.toLowerCase();
    if (tri === 'top') { 
      return a.localeCompare(b); 
    } else if (tri === 'down') {
      return -a.localeCompare(b);
    }
  }

  // Function to prepare data array
  const prepData = (rawData) => {
    rawData.sort(triTab);
    setData(rawData);
  }
  
  // Countries data loading (ajax)
  useEffect( () => {
    axios.get(`https://restcountries.com/v3.1/all`)
         .then( (res) => prepData(res.data) );
  });

  return data;

}

export default CountriesData;