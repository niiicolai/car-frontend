import { hasRole, isAuthenticated, ADMIN } from '../../model/authenticated';
import { createSecondaryButton } from '../../components/button/button';
import { showEditCarModal, showRentCarModal } from './carsModal';
import cardBuilder from '../../components/card/card';

function createCard(car) {
    const card = cardBuilder()
        .className(`default car-${car.id}`)
        .title(`${car.make} ${car.model}`)
        .image(car.imgSrc, `${car.make} ${car.model} image`)
        .text(`Price: ${car.pricePrDay}<br>Discount: ${car.bestDiscount}`)
        .footer(`Created: ${car.created}`)
        .build();

    if (isAuthenticated()) {
        const footer = card.lastElementChild;
        const button = createSecondaryButton('Rent');
        button.onclick = () => showRentCarModal(car);
        footer.appendChild(button);
    }

    if (hasRole(ADMIN())) {
        const footer = card.lastElementChild;
        const button = createSecondaryButton('Edit');
        button.onclick = () => showEditCarModal(car);
        footer.appendChild(button);
    }

    return card;
}

export function updateCard(car) {
    const card = document.querySelector(`.car-${car.id}`);
    card.querySelector('header h2').innerHTML = `${car.make} ${car.model}`;
    card.querySelector('.body p').innerHTML = `Price: ${car.pricePrDay}<br>Discount: ${car.bestDiscount}`;
    card.querySelector('footer p').innerHTML = `Created: ${car.created}`;
}

export function appendCard(car) {
    const card = createCard(car);
    document.getElementById('cars').appendChild(card);
}