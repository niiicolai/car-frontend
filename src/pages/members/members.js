import { render } from '../../util/util'
import { request, requestOptions } from '../../util/api';
import ToastHandler from '../../components/toast/toastHandler';
import cardBuilder from '../../components/card/card';
import template from './members.html';

import './members.css';

const toastHandler = new ToastHandler(3000);

export default function members() {
    render(template);

    const options = requestOptions(`/members`, 'GET', null);
    request(options, getMembersSuccess, toastHandler.secondary.bind(toastHandler));
}

function getMembersSuccess(members) {
    const wrapper = document.getElementById('members');
    for (let i = 0; i < members.length; i++) {
        addMemberCard(wrapper, members[i]);
    }
}

function addMemberCard(wrapper, reservation) {
    const _card = createMemberCard(reservation);
    wrapper.appendChild(_card);
}

function createMemberCard(member) {
    return cardBuilder()
        .className('default')
        .title(`${member.username}`)
        .text(`Full name: ${member.firstName} ${member.lastName}`)
        .footer(`Created: ${member.created}<br>Last edited: ${member.lastEdited}`)
        .build();
}
