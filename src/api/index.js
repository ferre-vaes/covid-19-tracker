import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
   try {
      const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);

      return { confirmed, recovered, deaths, lastUpdate };
   } catch (error) {
      return error;
   }
}

export const fetchDailyData = async () => {
   try {
      const { data } = await axios.get(`${url}/daily`);

      return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
   } catch (error) {
      return error;
   }
};

export const fetchTopTenCountries = async () => {
   try {
      const countries = await fetchCountries();

      const dataCountries = [];

      await Promise.all(countries.map(async (country) => {
         const data = await getData(country);
         dataCountries.push(data);
      }));

      return dataCountries.sort((a,b) => b.confirmed - a.confirmed).splice(0,10);
   } catch (error) {
      return error;
   }
}

const getData = async (country) => {
   try {
      const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(`${url}/countries/${country}`);

      return { confirmed: confirmed.value, recovered: recovered.value, deaths: deaths.value, lastUpdate, country };
   } catch (error) {

   }

}

const fetchCountries = async () => {
   try {
      const { data: { countries } } = await axios.get(`${url}/countries`);

      return countries.map((country) => country.name);
   } catch (error) {
      return error;
   }

}