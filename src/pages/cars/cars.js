import { renderCollection } from '../../util/util';
import { request, requestOptions } from '../../util/api';
import { hasRole } from '../../model/authenticated';
import { createSecondaryButton } from '../../components/button/button';
import ToastHandler from '../../components/toast/toastHandler';
import cardBuilder from '../../components/card/card';
import formBuilder from '../../components/form/form';
import createModal from '../../components/modal/modal';
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
                request(options, newCarSuccess, toastHandler.secondary.bind(toastHandler));
            })
            .build();

        const modal = createModal('new-car-modal', 'New Car', form);
        newButton = createSecondaryButton('New car', null);
        newButton.onclick = modal.closeMethod;

        rendables.push(modal.element);
    }
    
    rendables.push(template);
    renderCollection(rendables);

    if (newButton != null) {
        document.querySelector('.car-header').appendChild(newButton);
    }

    const options = requestOptions('/cars', 'GET', null);
    request(options, getCarsSuccess, toastHandler.secondary.bind(toastHandler));
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
    return cardBuilder()
        .className('default')
        .title(`${car.make} ${car.model}`)
        .image(car.imgSrc, `${car.make} ${car.model} image`)
        .text(`Price: ${car.pricePrDay}<br>Discount: ${car.bestDiscount}`)
        .footer(`Created: ${car.created}`)
        .build();
}
