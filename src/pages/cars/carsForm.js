import { request, requestOptions } from '../../util/api';
import { formBuilder, getBlankFields } from '../../components/form/form';
import ToastHandler from '../../components/toast/toastHandler';

const toastHandler = new ToastHandler(3000);
const blankFieldsMessage = "The following fields are required: ";

function carFormBuilder() {
    return formBuilder()
        .input('make', 'text', 'make')
        .input('model', 'text', 'model')
        .input('registrationNumber', 'text', 'Registration number')
        .input('pricePrDay', 'number', 'Price pr. day')
        .input('bestDiscount', 'number', 'Best discount');
}

export function newCarForm(success, error) {
    return carFormBuilder()
        .submit('Create', (data) => {
            if (hasBlankFields(data)) return;
            const options = requestOptions('/cars', 'POST', data);
            request(options, success, error);
        })
        .build();
}

export function editCarForm(success, error) {
    return carFormBuilder()
        .input('id', 'hidden')
        .submit('Update', (data) => {
            if (hasBlankFields(data)) return;

            const options = requestOptions('/cars', 'PATCH', data);
            request(options, success, error);
        })
        .build();
}

export function rentCarForm(success, error) {
    return formBuilder()
        .input('rentalDate', 'date', null, null, 'Rental date:')
        .input('carId', 'hidden')
        .input('memberUsername', 'hidden')
        .submit('Rent', (data) => {
            if (hasBlankFields(data)) return;

            const options = requestOptions('/reservations', 'POST', data);
            request(options, success, error);
        })
        .build();
}

function hasBlankFields(data) {
    let blankFields = getBlankFields(data);
    if (blankFields.length > 0) {
        toastHandler.secondary(blankFieldsMessage + blankFields.toString());
        return true;
    }
    return false;
}