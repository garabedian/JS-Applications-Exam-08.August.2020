import { logout as apiLogout, checkResult } from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function logout() {
    try {
        const result = await apiLogout();

        checkResult(result);

        this.app.userData.email = '';
        this.app.userData.userId = '';

        showInfo('Successful logout');

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}