export const validateInputs = (validateData: any) => {
  return (req, res, next) => {
    let totalErrors = [];
    const allValdiationDatakeys = Object.keys(validateData);
    allValdiationDatakeys.forEach((key) => {
      const requestSourceData = validateData[key] && validateData[key].in;
      const errors: any = validateKeys(requestSourceData, req, validateData, key);
      // tslint:disable-next-line: no-unused-expression
      // tslint:disable-next-line: no-unused-expression
      errors && errors.length && (totalErrors = [...errors]);
    });
    console.log(totalErrors);
    totalErrors.length ? next(totalErrors) : next();
  };
};

const validateKeys = (type, request, validationConstraints, key) => {
  const allDataOfRequest = request[type[0]];
  const keysOfallDataOfRequest = Object.keys(allDataOfRequest);
  const errorMessages: any = [];
  keysOfallDataOfRequest.forEach((dataKey: string) => {
    if (dataKey === key) {
      if (validationConstraints[key].required) {
        if (validationConstraints[key].number) {
          return errorMessages.push(handleErrorCases(allDataOfRequest[key], 'number', validationConstraints[key]));
        }
        if (validationConstraints[key].string) {
          return errorMessages.push(handleErrorCases(allDataOfRequest[key], 'string', validationConstraints[key]));
        }
        if (validationConstraints[key].isArray) {
          return errorMessages.push(handleErrorCases(allDataOfRequest[key], 'isArray', validationConstraints[key]));
        } if (validationConstraints[key].isObject) {
          return errorMessages.push(handleErrorCases(allDataOfRequest[key], 'isObject', validationConstraints[key]));
        } if (validationConstraints[key].custom) {
          return errorMessages.push(handleErrorCases(allDataOfRequest[key], 'custom', validationConstraints[key]));
        } if (validationConstraints[key].regex) {
          return errorMessages.push(handleErrorCases(allDataOfRequest[key], 'regex', validationConstraints[key]));
        }
      }
      else {
        if (validationConstraints[key].hasOwnProperty('default')) {
          const errorMessage = handleErrorCases(allDataOfRequest[key], 'regex', validationConstraints[key]);
          if (errorMessage && errorMessage.errorMessage) {
            return errorMessages.push(errorMessage);
          } else {
            allDataOfRequest[key] = validationConstraints[key].default;
          }
        }
      }
    }
  });
  return errorMessages.filter((ele) => (ele !== undefined && ele !== false));
};

const handleErrorCases = (validateData, type, constraintObject) => {
  switch (type) {
    case 'string':
      if (!(typeof validateData === 'string')) {
        return { message: constraintObject.errorMessage ? constraintObject.errorMessage : 'string is required', code: 500 };
      }
      break;
    case 'number':
      if (!(typeof validateData === 'number')) {
        return { message: constraintObject.errorMessage ? constraintObject.errorMessage : 'number is required', code: 500 };
      }
      break;
    case 'regex':
      const regexString = new RegExp(constraintObject.regex);
      console.log(validateData);
      return typeof validateData === 'string' && constraintObject.regex && !regexString.test(validateData.trim()) && { message: constraintObject.errorMessage, code: 400 };
    case 'isArray':
      return validateData && validateData.length === undefined && { message: constraintObject.errorMessage, code: 400 };
    case 'custom':
      return constraintObject.custom();
    case 'isObject':
      return !(typeof validateData !== 'object') && { message: constraintObject.errorMessage, code: 400 };
  }
};



