import { DashboardForm } from './dashboard.js'

class View {

    constructor(title) {
        this.title = title;
    }

    setTitle() {
        const titleSelector = document.querySelectorAll('h2')[0]
        titleSelector.innerHTML = this.title
    }

    showDiv(divTitle) {
        console.log('showing div')
        document.querySelectorAll('div.contents > div').forEach(div => div.style.display = "none");
        document.querySelector(`div.${divTitle}`).style.display = "block"
    }

}

class DashboardView extends View {
    constructor() {
        super("Dashboard")
        super.setTitle()
        this.setLabels("Name", "Description")
        this.showItems()
    }
    setLabels(nameLabel, descriptionLabel) {
        const [labelSelector, descriptionSelector] = document.querySelectorAll('form > div > label')
        labelSelector.innerHTML = nameLabel
        descriptionSelector.innerHTML = descriptionLabel
    }
    async showItems() {
        const res = await fetch('http://localhost:3000/items');

        if (res.status != 200) {
            return;
        }

        const itemsData = await res.json();
        console.log(`All Items = ${JSON.stringify(itemsData)}`);

        let idxKey = 0;
        const listParent = document.querySelector("ul");
        let item, itemButton;

        Object.keys(itemsData).forEach((item) => {
            item = document.createElement("li");
            itemButton = document.createElement("button");
            itemButton.setAttribute("class", `item-button item${idxKey+1}`);

            itemButton.innerHTML = `item ${idxKey+1}`;
            itemButton.addEventListener('click', processItemClick);

            idxKey += 1;
            item.appendChild(itemButton);
            listParent.appendChild(item);
        })
    }
}

class OAuthView extends View {
    constructor() {
        super("OAuth")
        super.setTitle()
    }
}

class JWTAuthView extends View {
    constructor() {
        super("JWT Auth")
        super.setTitle()
    }
}

export { DashboardView, OAuthView, JWTAuthView }