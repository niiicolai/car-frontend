import Navigo from 'navigo';
import _ from 'lodash';

import show from './layout/layout';

import index from './index/index';
import about from './about/about';
import contact from './contact/contact';

const router = new Navigo('/', true);

router.on('/', () => show(index));
router.on('/about', () => show(about));
router.on('/contact', () => show(contact));

router.resolve();

