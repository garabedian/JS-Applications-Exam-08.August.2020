import { getItems } from "../data.js";

export default async function home() {

    this.partials = {
        header: await this.load('./templates/header.hbs'),
        footer: await this.load('./templates/footer.hbs'),
        login: await this.load('./templates/login.hbs'),
        itemsAll: await this.load('./templates/itemsAll.hbs'),
        itemEach: await this.load('./templates/itemEach.hbs'),
    };

    const result = await getItems();

    const context = { items: Object.values(result).sort((a, b) => a.title.localeCompare(b.title)) };

    Object.assign(context, this.app.userData);

    console.log(context);

    this.partial('./templates/home.hbs', context);
}