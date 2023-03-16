import { request, requestOptions } from '../../util/api';
import formBuilder from '../../components/form/form';

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
            const options = requestOptions('/cars', 'POST', data);
            request(options, success, error);
        })
        .build();
}

export function editCarForm(success, error) {
    return carFormBuilder()
        .input('id', 'hidden')
        .submit('Update', (data) => {
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
            const options = requestOptions('/reservations', 'POST', data);
            request(options, success, error);
        })
        .build();
}
