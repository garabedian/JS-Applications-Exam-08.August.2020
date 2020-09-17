import { login as apiLogin, checkResult } from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function login() {
    this.partials = {
        header: await this.load('./templates/header.hbs'),
        footer: await this.load('./templates/footer.hbs'),
    };

    this.partial('./templates/login.hbs', this.app.userData);
}

export async function loginPost() {
    try {
        const result = await apiLogin(this.params.email, this.params.password);

        checkResult(result);

        this.app.userData.email = result.email;
        this.app.userData.userId = result.objectId;

        showInfo(`Login successful.`);

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}