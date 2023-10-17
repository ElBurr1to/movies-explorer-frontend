import React, { useCallback } from "react";
import validator from 'validator';


export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    validateInput(target, name, value);
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  function validateInput(target, name, value) {
    switch (name) {
      case 'name':
        validateName(target, value);
        break;
      case 'email':
        validateEmail(target, value);
        break;
      case 'password':
        validatePassword(target, value);
        break;
      default:
        break;
    }
  }

  function validateName(target, value) {
    if (value.length === 0) target.setCustomValidity('Это поле должно быть заполнено');
    else if (value.length < 2) target.setCustomValidity('Длина имени должна быть не менее 2 символов');
    else if (value.length > 30) target.setCustomValidity('Длина имени должна быть не более 30 символов');
    else if (/[^a-zA-Zа-яА-ЯёЁ0-9\- ]/.test(value)) target.setCustomValidity('Имя содержит недопустимые символы');
    else target.setCustomValidity('');
  }

  function validateEmail(target, value) {
    if (value.length === 0) target.setCustomValidity('Это поле должно быть заполнено');
    else if (!validator.isEmail(value)) target.setCustomValidity('Данное значение не является почтой');
    else target.setCustomValidity('');
  }

  function validatePassword(target, value) {
    if (value.length === 0) target.setCustomValidity('Это поле должно быть заполнено');
    else target.setCustomValidity('');
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, setValues, errors, isValid, resetForm, setIsValid };
}