/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const moment = require('moment');
moment().format();

const nacimiento = moment('1982-03-01').format('YYYY-MM-DD');

const hoy = moment().format('YYYY-MM-DD');

const total = moment(nacimiento, 'YYYY-MM-DD').fromNow(moment(hoy, 'YYYY-MM-DD'), 'years');

console.log(total);
