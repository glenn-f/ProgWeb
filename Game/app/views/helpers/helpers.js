const { type } = require("jquery");

function checked(current, value) {
    if (current == value) {
        return "checked";
    } else {
        return "";
    }
}
function printError(errors, campo) {
    let msg;
    if (typeof errors !== 'undefined') {
        errors.errors.forEach(e => {
            if (e.path == campo) {
                msg = e.message;
            }
        });
    }
    return msg;
}

module.exports = { checked, printError }
