var throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');

const LOCALSTORAGE_KEY = 'feedback-form-state';

//Creating an object for storing data in localstorage
const formData = {
    email: '',
    message: '',

};

//Add eventListener
formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', trottle(onFormSubmit, 500));

//handlers
function onFormSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onFormInput(event) {
    if (event.target.name === 'email') {
        formData['email'] = event.target.value;
    }
    if (event.target.name === 'message') {
        formData['message'] = event.target.value;
    }
    return localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

//after reload page
formAfterReload();

function formAfterReload(){
    const saveFormData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    console.log(saveFormData);
    if (saveFormData) {
        inputEl.value = saveFormData.email;
        textareaEl.value = saveFormData.message;
    }
}
