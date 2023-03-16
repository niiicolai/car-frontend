import { getAuthenticated } from '../../model/authenticated';
import { newCarForm, editCarForm, rentCarForm } from './carsForm';
import { createModal, toggleVisibility } from '../../components/modal/modal';

export function newCarModal(success, toastHandler) {
    const form = newCarForm(success, toastHandler.secondary.bind(toastHandler));
    return createModal('new-car-modal', 'New Car', form);
}

export function editCarModal(success, toastHandler) {
    const form = editCarForm(success, toastHandler.secondary.bind(toastHandler));
    return createModal('edit-car-modal', 'Edit Car', form);
}

export function rentCarModal(success, toastHandler) {
    const form = rentCarForm(success, toastHandler.secondary.bind(toastHandler));
    return createModal('rent-car-modal', 'Rent Car', form);
}

export function showEditCarModal(car) {
    const e = document.getElementById('edit-car-modal');
    e.querySelector('input[name=id]').value = car.id;
    e.querySelector('input[name=make]').value = car.make;
    e.querySelector('input[name=model]').value = car.model;
    e.querySelector('input[name=pricePrDay]').value = car.pricePrDay;
    e.querySelector('input[name=bestDiscount]').value = car.bestDiscount;
    e.querySelector('input[name=registrationNumber]').value = car.registrationNumber;
    toggleVisibility(e);
}

export function showRentCarModal(car) {
    const e = document.getElementById('rent-car-modal');
    const a = getAuthenticated();
    e.querySelector('input[name=carId]').value = car.id;
    e.querySelector('input[name=memberUsername]').value = a.username;
    toggleVisibility(e);
}