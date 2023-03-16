import { render } from '../../util/util'
import { request, requestOptions } from '../../util/api';
import ToastHandler from '../../components/toast/toastHandler';
import cardBuilder from '../../components/card/card';
import template from './reservations.html';

import './reservations.css';

const toastHandler = new ToastHandler(3000);

export default function reservations() {
    render(template);
    const options = requestOptions('/reservations', 'GET', null);
    request(options, getReservationsSuccess, toastHandler.secondary.bind(toastHandler));
}

function getReservationsSuccess(reservations) {
    const wrapper = document.getElementById('reservations');
    for (let i = 0; i < reservations.length; i++) {
        addReservationCard(wrapper, reservations[i]);
    }
}

function addReservationCard(wrapper, reservation) {
    const _card = createReservationCard(reservation);
    wrapper.appendChild(_card);
}

function createReservationCard(reservation) {
    return cardBuilder()
        .className('default')
        .title(`ID: ${reservation.id}`)
        .text(`Car ...`)
        .footer(`Created: ${reservation.created}`)
        .build();
}
