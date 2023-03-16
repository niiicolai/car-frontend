import Navigo from 'navigo';
import _ from 'lodash';

import { redirect } from './util/util';
import { clearAuthenticated } from './model/authenticated';
import show from './layout/layout';

import index from './pages/index/index';
import cars from './pages/cars/cars';
import reservations from './pages/reservations/reservations';
import login from './pages/login/login';
import members from './pages/members/members';
import signup from './pages/signup/signup';
import profile from './pages/profile/profile';
import editProfile from './pages/editProfile/editProfile';

const router = new Navigo('/', true);

router.on('/', () => show(index));
router.on('/cars', () => show(cars));
router.on('/reservations', () => show(reservations));
router.on('/members', () => show(members));
router.on('/profile', () => show(profile));
router.on('/profile-edit', () => show(editProfile));
router.on('/login', () => show(login));
router.on('/signup', () => show(signup));
router.on('/logout', () => {
    clearAuthenticated();
    redirect('login');
});

router.resolve();

