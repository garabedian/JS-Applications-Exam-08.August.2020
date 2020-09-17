import { register as apiRegister, login as apiLogin, checkResult } from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/header.hbs'),
        footer: await this.load('./templates/footer.hbs')
    };

    this.partial('./templates/register.hbs', this.app.userData);
}

export async function registerPost() {
    try {
        if (this.params.password !== this.params.repeatPassword) {
            throw new Error('Password don\'t match');
        }
        if (this.params.email.length < 3) {
            throw new Error('Email must be filled.');
        }
        if (this.params.password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        const result = await apiRegister(this.params.email, this.params.password);

        checkResult(result);

        showInfo('Successful registration!');

        const loginResult = await apiLogin(this.params.email, this.params.password);

        checkResult(loginResult);

        this.app.userData.email = result.email;
        this.app.userData.userId = result.objectId;

        showInfo(`Logged successful.`);

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
        showError(err.message);
        this.redirect('#/register');
    }
}