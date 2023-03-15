import { render } from '../../util/util'
import { requestGet } from '../../util/api';
import card from '../../components/card/card';
import toast from '../../components/toast/toast';
import template from './reservations.html';

const toastDisplayTime = 3000;

export default function reservations() {
    render(template);
    requestGet('/reservations', getReservationsSuccess, toastError);
}

function getReservationsSuccess(reservations) {
    const wrapper = document.getElementById('reservations');
    for (let i = 0; i < reservations.length; i++) {
        addReservationCard(wrapper, reservations[i]);
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

function addReservationCard(wrapper, reservation) {
    const _card = createReservationCard(reservation);
    wrapper.appendChild(_card);
}

function createReservationCard(reservation) {
    return card({
        className: 'default',
        header: {
            text: `ID: ${reservation.id}`
        },
        footer: {
            text: `Created: ${reservation.created}`
        }
    });
}
