/*  I like to use {...object} the spread operator in my code
    due to the age of all the packages and bable config this doesn't work.
    I don't want to spend too much time changing config so I have created a spread operator function as a work around
*/
export const spreadOperator = (originalObject, updatedProperties) => {
    return Object.keys(updatedProperties).reduce((acc, key) => {
      const originalValue = originalObject[key];
      const updatedValue = updatedProperties[key];
  
      if (
        typeof originalValue === 'object' &&
        typeof updatedValue === 'object' &&
        originalValue !== null &&
        updatedValue !== null
      ) {
        acc[key] = spreadOperator(originalValue, updatedValue);
      } else {
       
        acc[key] = updatedValue;
      }
  
      return acc;
    }, Object.assign({}, originalObject));
  };
  