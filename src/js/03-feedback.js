import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onFormSumbit);

let formData = {};

takeLocalStorageItems();

function consoleData(event) {
  const text = {};
  new FormData(event).forEach((value, key) => (text[key] = value));

  console.log(text);
}

function onInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function takeLocalStorageItems() {
  const storageItem = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (!storageItem) return;
  Object.keys(storageItem).forEach(key => {
    const element = refs.form.querySelector(`[name="${key}"]`);
    element.value = storageItem[key];
  });
}

function onFormSumbit(event) {
  event.preventDefault();

  consoleData(event.currentTarget);

  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  formData = {};
}
