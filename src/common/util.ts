import searchMessage from '../common/customMessage';

export function parseErrors(err) {
    const errors = [];
    if (err.errors) {
        Object.keys(err.errors).forEach(function (field) {
            var eObj = err.errors[field];
            errors.push(eObj.message);
        });
    } else {
        this.customizeError(errors, err);
    }

    return errors;
}

function customizeError(errors, err) {
    if (err.code) {
        if (searchMessage[err.code]) {
            errors.push(searchMessage[err.code])
        }
    } else if (err.message) {
        errors.push(err.message)
    }
}