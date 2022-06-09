'use strict';

const state = {
  temperature: 0,
};

const raiseTemp = () => {
  console.log('hotter'); //remove later
  state.temperature += 1;
  const temp = document.getElementById('temp');
  temp.textContent = `${state.temperature}°`;
  changeTempDisplay();
};

const changeTempDisplay = () => {
  const temp = document.getElementById('temp');
  const tempEmoji = document.getElementById('tempEmoji');
  if (state.temperature >= 80) {
    temp.style.color = '#fb392b';
    tempEmoji.textContent = '🥵';
  } else if (state.temperature >= 70) {
    temp.style.color = '#f88800';
    tempEmoji.textContent = '🙂';
  } else if (state.temperature >= 60) {
    temp.style.color = '#fbc200';
    tempEmoji.textContent = '🙂';
  } else if (state.temperature >= 40) {
    temp.style.color = '#10c095';
    tempEmoji.textContent = '😬';
  } else if (state.temperature < 40) {
    temp.style.color = '#0ebede';
    tempEmoji.textContent = '🥶';
  }
};

const lowerTemp = () => {
  console.log('colder'); //remove later
  state.temperature -= 1;
  const temp = document.getElementById('temp');
  temp.textContent = `${state.temperature}°`;
  changeTempDisplay();
};

const changeCity = () => {
  const searchBar = document.getElementById('searchBar');
  const city = document.getElementById('city');
  city.textContent = searchBar.value;
};

const registerEventHandlers = () => {
  const hotterButton = document.getElementById('hotterButton');
  hotterButton.addEventListener('click', raiseTemp);
  const colderButton = document.getElementById('colderButton');
  colderButton.addEventListener('click', lowerTemp);
  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('input', changeCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
