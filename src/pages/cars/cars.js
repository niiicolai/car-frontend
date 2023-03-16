import { renderCollection } from '../../util/util';
import { request, requestOptions } from '../../util/api';
import { hasRole } from '../../model/authenticated';
import ToastHandler from '../../components/toast/toastHandler';
import card from '../../components/card/card';
import formBuilder from '../../components/form/form';
import createModal from '../../components/modal/modal';
import createButton from '../../components/button/button';
import template from './cars.html';

import './cars.css';

const toastHandler = new ToastHandler(3000);

export default function cars() {
    const rendables = [];
    let newButton = null;

    if (hasRole('ADMIN')) {
        const form = formBuilder()
            .input('make', 'text', 'make')
            .input('model', 'text', 'model')
            .input('registrationNumber', 'text', 'Registration number')
            .input('pricePrDay', 'number', 'Price pr. day')
            .input('bestDiscount', 'number', 'Best discount')
            .submit('Create', (data) => {
                const options = requestOptions('/cars', 'POST', data);
                request(options, newCarSuccess, toastHandler.danger.bind(toastHandler));
            })
            .build();

        const modal = createModal('new-car-modal', 'New Car', form);
        newButton = createButton('secondary', 'New car');
        newButton.onclick = modal.closeMethod;

        rendables.push(modal.element);
    }
    
    rendables.push(template);
    renderCollection(rendables);

    if (newButton != null) {
        document.querySelector('.car-header').appendChild(newButton);
    }

    const options = requestOptions('/cars', 'GET', null);
    request(options, getCarsSuccess, toastHandler.danger.bind(toastHandler));
}

function newCarSuccess(json) {
    addCarCard(document.getElementById('cars'), json);
    toastHandler.success('The car was saved successfully!');
}

function getCarsSuccess(cars) {
    const wrapper = document.getElementById('cars');
    for (let i = 0; i < cars.length; i++) {
        addCarCard(wrapper, cars[i]);
    }
}

function addCarCard(wrapper, car) {
    const _card = createCarCard(car);
    wrapper.appendChild(_card);
}

function createCarCard(car) {
    return card({
        className: 'default',
        header: {
            text: `${car.make} ${car.model}`
        },
        body: {
            imgSrc: car.imgSrc,
            imgAlt: `${car.make} ${car.model} image`
        },
        footer: {
            text: `Price: ${car.pricePrDay}<br>Discount: ${car.bestDiscount}`
        }
    });
}
