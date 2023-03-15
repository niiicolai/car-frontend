import { render } from '../util/util';
import { isAuthenticated } from '../model/authenticated';
import header from '../components/navigation/header';
import footer from '../components/footer/footer';

import './layout.css'



export default function layout(page) {
    document.body.innerHTML = "";

    const headerSettings = {
      links: [
          {text: 'Home', href: '/'},
          {text: 'Cars', href: '/cars'}
      ]
    };

    const footerSettings = {
        text: 'Copyright ...'
    }

    if (isAuthenticated()) {
        headerSettings.links.push({text: 'Reservations', href: '/reservations'});
        headerSettings.links.push({text: 'Profile', href: '/profile'});
        headerSettings.links.push({text: 'Logout', href: '/logout'});
    } else {
        headerSettings.links.push({text: 'Signup', href: '/signup'});
        headerSettings.links.push({text: 'Login', href: '/login'});
    }

    const _header = header(headerSettings);
    const _footer = footer(footerSettings);

    render(_header);
    page();
    render(_footer);
}   
