/* globals $, Sammy */

import home from "./controllers/home.js"
import register, { registerPost } from "./controllers/register.js"
import login, { loginPost } from "./controllers/login.js"
import logout from "./controllers/logout.js"
import { create, createPost, deletePost, details, edit, editPost, like } from "./controllers/items.js";


window.addEventListener("load", () => {

    const app = Sammy('#container', function (context) {

        // Register Handlebars extension
        this.use('Handlebars', 'hbs');

        // Create user data storage in "app" scope
        this.userData = {
            email: localStorage.getItem('email') || '',
            userId: localStorage.getItem('userId') || '',
        };

        // Sammy's context === this (Sammy.EventContext)
        // Gets information about the location
        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

        this.get('#/register', register);

        this.get('#/login', login);

        this.get('#/logout', logout);

        this.get('#/create', create);

        // Everything after "/" is put in params.id
        this.get('#/edit/:id', edit);

        // Needed to avoid Sammy's async function problem
        this.post('#/register', (context) => { registerPost.call(context); });

        this.post('#/login', (context) => { loginPost.call(context); });

        this.post('#/create', (context) => { createPost.call(context); });

        this.post('#/edit/:id',  (context) => { editPost.call(context); });

        this.get('#/like/:id',  (context) => { like.call(context); });

        // PUT request wth no input fields
        this.get('#/delete/:id',  (context) => { deletePost.call(context); });

        this.get('#/details/:id',  (context) => { details.call(context); });

        this.get('', function () {
            this.swap('<h1>404 Page not found</h1>');
        });

    });

    app.run();

});
