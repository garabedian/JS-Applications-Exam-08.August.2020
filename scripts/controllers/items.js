import { showInfo, showError } from '../notification.js';
import { createItem, getItems, getItemById, getItemsByOwner, updateItem, deleteItem as apiDelete, checkResult } from '../data.js';

export async function create() {
    this.partials = {
        header: await this.load('./templates/header.hbs'),
        footer: await this.load('./templates/footer.hbs')
    };


    this.partial('./templates/create.hbs', this.app.userData);
}

export async function createPost() {
    const item = {
        title: this.params.title,
        description: this.params.description,
        imageUrl: this.params.imageUrl,
        creator: this.app.userData.email
    };

    if (Object.values(item).some(v => v.length === 0)) {
        showInfo("All fields are required");
        return;
    }



    try {
        const result = await createItem(item);

        checkResult(result);

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}

export async function deletePost() {
    if (confirm('Are you sure you want to delete this item?') == false) {
        return this.redirect('#/home');
    }

    const itemId = this.params.id;

    try {
        const result = await apiDelete(itemId);

        checkResult(result);

        showInfo('Movie deleted');

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}


export async function details() {
    this.partials = {
        header: await this.load('./templates/header.hbs'),
        footer: await this.load('./templates/footer.hbs'),
        details: await this.load('./templates/details.hbs')
    };

    const item = await getItemById(this.params.id);

    item.isAuthor = item.creator === this.app.userData.email;

    Object.assign(item, this.app.userData);

    console.log(item);

    this.partial('./templates/details.hbs', item);
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/header.hbs'),
        footer: await this.load('./templates/footer.hbs')
    };

    const item = await getItemById(this.params.id);

    Object.assign(item, this.app.userData);

    this.partial('./templates/edit.hbs', item);
}

export async function editPost() {
    const item = {
        title: this.params.title,
        description: this.params.description,
        imageUrl: this.params.imageUrl
    };

    if (Object.values(item).some(v => v.length === 0)) {
        showInfo("All fields are required");
        return;
    }

    const itemId = this.params.id;

    try {

        const result = await updateItem(itemId, item);

        checkResult(result);

        showInfo('Movie edited');
        this.redirect('#/home/');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}

export async function like() {


    const item = await getItemById(this.params.id);

    let updated = {};

    if (item.people_liked) {
        updated = { people_liked: item.people_liked + ", " + this.app.userData.email,
                    likes: item.likes + 1
                  };
    } else {
        updated = { people_liked: this.app.userData.email,
                    likes: 1
                  };
    }

    const itemId = this.params.id;

    try {

        const result = await updateItem(itemId, updated);

        checkResult(result);

        showInfo('Liked successfully');
        this.redirect('#/home/');
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}
