import { renderCollection } from '../../util/util';
import { requestGet, requestPost } from '../../util/api';
import { hasRole } from '../../model/authenticated';
import card from '../../components/card/card';
import toast from '../../components/toast/toast';
import form from '../../components/form/form';
import modal from '../../components/modal/modal';
import button from '../../components/button/button';
import template from './cars.html';

import './cars.css';

const toastDisplayTime = 3000;

const formSettings = [
    { name: 'make', type: 'text', placeholder: 'make' },
    { name: 'model', type: 'text', placeholder: 'model' },
    { name: 'registrationNumber', type: 'text', placeholder: 'Registration number' },
    { name: 'pricePrDay', type: 'number', placeholder: 'Price pr. day' },
    { name: 'bestDiscount', type: 'number', placeholder: 'Best discount' },
    {
        value: 'Save', type: 'submit', onclick: (data) => {
            requestPost('/cars', data, newCarSuccess, toastError);
        }
    }
];

export default function cars() {
    const rendables = [];
    let newButton = null;

    if (hasRole('ADMIN')) {
        const _form = form(formSettings);
        const _modal = modal({
            id: 'new-car-modal',
            header: { text: 'New Car' },
            body: _form
        });
        newButton = button({
            text: 'New car',
            className: 'secondary',
            onclick: _modal.closeMethod
        });

        rendables.push(_modal.element);
    }
    
    rendables.push(template);
    renderCollection(rendables);

    if (newButton != null) {
        document.querySelector('.car-header').appendChild(newButton);
    }

    requestGet('/cars', getCarsSuccess, toastError);
}

function newCarSuccess(json) {
    const _toast = toast({
        className: 'success',
        text: 'The car was saved successfully!',
        displayTime: toastDisplayTime
    });

    addCarCard(document.getElementById('cars'), json);
    document.body.appendChild(_toast);
}

function getCarsSuccess(cars) {
    const wrapper = document.getElementById('cars');
    for (let i = 0; i < cars.length; i++) {
        addCarCard(wrapper, cars[i]);
    }
}

function toastError(err) {
    const _toast = toast({
        className: 'danger',
        text: err,
        displayTime: toastDisplayTime
    });
    document.body.appendChild(_toast);
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
