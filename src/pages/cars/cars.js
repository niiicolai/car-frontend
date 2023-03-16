import { renderCollection } from '../../util/util';
import { request, requestOptions } from '../../util/api';
import { hasRole, ADMIN } from '../../model/authenticated';
import { createSecondaryButton } from '../../components/button/button';
import { updateCard, appendCard } from './carsCard';
import { newCarModal, editCarModal, rentCarModal } from './carsModal';
import { clearForm } from '../../components/form/form';
import { toggleVisibility } from '../../components/modal/modal';
import ToastHandler from '../../components/toast/toastHandler';
import template from './cars.html';

import './cars.css';

const saveMessage = 'The car was saved successfully!';
const updateMessage = 'The car was updated successfully!';
const rentMessage = 'The car reservation was saved successfully!';
const toastHandler = new ToastHandler(3000);

export default function cars() {
    let newButton = null;
    let render = null;

    const rentModal = rentCarModal(onRentCar, toastHandler);
    
    if (hasRole(ADMIN())) {
        const newModal = newCarModal(onNewCar, toastHandler);
        const editModal = editCarModal(onEditCar, toastHandler);

        newButton = createSecondaryButton('New car');
        newButton.onclick = newModal.closeMethod;

        render = [newModal.element, editModal.element, rentModal.element, newButton, template];
    } else {
        render = [rentModal.element, template];
    }

    renderCollection(render);
    fetchAllCars();
    addNewButton(newButton);
}   

function addNewButton(newButton) {
    if (newButton != null)
        document.querySelector('.car-header').appendChild(newButton);
}

function fetchAllCars() {
    const options = requestOptions('/cars', 'GET', null);
    request(options, onNewCars, toastHandler.secondary.bind(toastHandler));
}

function onNewCars(cars) {
    for (let i = 0; i < cars.length; i++)
        appendCard(cars[i]);
}

function onNewCar(car) {
    appendCard(car);
    onSuccess(saveMessage, 'new-car-modal');
}

function onEditCar(car) {
    updateCard(car);
    onSuccess(updateMessage, 'edit-car-modal');
}

function onRentCar(reservation) {
    onSuccess(`${rentMessage} - ID: ${reservation.id}`, 'rent-car-modal');
}

function onSuccess(message, modalId) {
    toastHandler.success(message);

    const modal = document.getElementById(modalId);
    clearForm(modal.querySelector('form'));
    toggleVisibility(modal);
}
