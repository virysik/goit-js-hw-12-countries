import './sass/main.scss';
import axios from "axios";
import debounce from "lodash.debounce";
import showCountry from "./template/showCountry";
import showCountries from "./template/showCountries";
import { error } from '../node_modules/@pnotify/core/dist/PNotify';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/core/dist/BrightTheme.css'


const refs = {
    input: document.querySelector('.search'),
    list: document.querySelector('.list'),
    wrapper: document.querySelector('.wrapper'),
}

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name/';


function onInput(e) {
    let countryName = e.target.value;
  
    axios.get(countryName).then(response => {
        let names = response.data.map(e => e.name);

        if (names.length === 1) {
            clearList();
            renderWrapper(response.data[0]);
            return;
        }

        if (names.length >= 2 && names.length <= 10) {
            clearWrapper();
            renderList(names);
            return;
        }

        clearList();
        clearWrapper();
        error({
           text: 'Too many matches found. Please enter a more specific query!'
      });
        
    }).catch(error => console.log(error));
}
function clearList() {
    if (refs.list.innerHTML !== '') {
        refs.list.innerHTML = '';
    }
 }
function clearWrapper() {
    if (refs.wrapper.innerHTML !== '') {
        refs.wrapper.innerHTML = '';
    }
 }
function renderWrapper(country) {
    refs.wrapper.innerHTML = showCountry(country);
 }
function renderList(countries) {
    refs.list.innerHTML = showCountries(countries);
}

refs.input.addEventListener('input', debounce(onInput, 500));