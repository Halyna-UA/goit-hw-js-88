import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

//Creating an object for storing data in localstorage
const formData = {
    email: '',
    message: '',
};

//Add eventListener
formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

//handlers
function onFormSubmit(event) {
    event.preventDefault();
    if (!formEl.elements.email.value || !formEl.elements.message.value ) {
        return alert(`Please, enter your data`);
      }
    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log(formData);
    event.currentTarget.reset();
}

function onFormInput(event) {
    console.log(Boolean(formEl.elements.email.value));
     if(formEl.elements.email.value || formEl.elements.message.value){
        formData.email = formEl.elements.email.value;
        formData.message = formEl.elements.message.value;
     }
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

//after reload page
formAfterReload();

function formAfterReload(){
    if(localStorage.getItem(LOCALSTORAGE_KEY)){
    const saveFormData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    console.log(saveFormData);
    formEl.elements.email.value = saveFormData.email;
    formEl.elements.message.value = saveFormData.message;
  
}
    
}
