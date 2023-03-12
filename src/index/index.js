import { render } from '../util/util'
import template from './index.html';

export default function index() {
    render(template);

    document.getElementById('test').style.color = 'red';
}