import { render } from '../util/util';

import header from './header.html';
import footer from './footer.html';

import './layout.css'
import './header.css'
import './footer.css'

export default function layout(page) {
    render(header);
    page();
    render(footer);
}   