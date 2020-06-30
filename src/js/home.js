import '../css/index.css';
import search from './search.js';
import render from './render.js';

const id = prompt('Quien es el pokemon?')

search( id )
.then( data => {
  render(data)
})