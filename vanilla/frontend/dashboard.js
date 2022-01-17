// View Definition
class Dashboard {

    constructor(info) {
        this.initializeSelectors()
        this.setDescription(info.description)
        this.setTitle(info.title)

        form = DashboardForm("NAME", "DESCRIPTION")
        form.initForm()
        this.renderDashboard()
    }

    initializeSelectors() {
        this.dashboardTitle = document.querySelector('.dashboard-title');
        this.dashboardDescription = document.querySelector('.dashboard-description');
    }

    setDescription(description) {
        this.dashboardDescription.innerHTML = description;
    }
    setTitle(title) {
        this.dashboardTitle.innerHTML = title;
    }


    renderItems = async() => {

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

    processItemClick = async(event) => {
        console.log(`Button Clicked!`);
        await renderDashboard(event.target)
    }

    renderDashboard = async(btn) => {

        await renderItems();


        const itemName = btn.classList[1];

        const res = await fetch(`http://localhost:3000/item/${itemName}`);

        if (res.status == 200) {
            const contents = await res.json();
            const dashboard = new Dashboard(contents);
        }
    }

}

class DashboardForm {

    constructor(title, nameLabel, descriptionLabel) {
        this.title = title
        this.nameLabel = this.nameLabel
        this.descriptionLabel = this.descriptionLabel
    }

    initForm() {
        titleSelector = document.querySelector('h1')[titlelLabelSelector, descriptionLabelSelector] = document.querySelector('form > div > label');
        submitSelector = document.querySelector('form > div > button')

        titleSelector.innerHTML = this.title
        titleLabelSelector.innerHTML = this.nameLabel
        descriptionLabelSelector.innerHTML = this.descriptionLabel
    }

}



export { DashboardForm };