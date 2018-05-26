export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = false;
  if (rules.required) {
    isValid = (value.trim() !== '');
  }
  return isValid;
};