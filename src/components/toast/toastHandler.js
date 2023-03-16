import insertToast from "./toast";

const PRIMARY_KEY = 'primary';
const SECONDARY_KEY = 'secondary';
const SUCCESS_KEY = 'success';
const INFO_KEY = 'info';
const WARNING_KEY = 'warning';
const DANGER_KEY = 'danger';


// Note: Why note just pass the className key directly?
//       The API error callback, calls a callback with a single argument,
//       and it is, therefore, more convenient to have a method with a single argument.
//
// Note: The class does also provides a way to encapsulate the display time into
//       a single object, removing unecessary code from where the toast is required.
//
export default class ToastHandler {
    constructor(displayTime) {
        this.displayTime = displayTime;
    }

    primary(text) {
        insertToast(PRIMARY_KEY, text, this.displayTime);
    }

    secondary(text) {
        insertToast(SECONDARY_KEY, text, this.displayTime);
    }

    success(text) {
        insertToast(SUCCESS_KEY, text, this.displayTime);
    }

    info(text) {
        insertToast(INFO_KEY, text, this.displayTime);
    }

    warning(text) {
        insertToast(WARNING_KEY, text, this.displayTime);
    }

    danger(text) {
        insertToast(DANGER_KEY, text, this.displayTime);
    }
}
