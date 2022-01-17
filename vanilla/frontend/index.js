import { DashboardView, OAuthView, JWTAuthView } from './views.js'




// Show Dashboard View as default
new DashboardView().showDiv('dashboard')

const navLinkSelector = document.querySelectorAll('nav > ul > li > a')

navLinkSelector.forEach((navLink) => {
    navLink.addEventListener('click', (event) => {
        const currentClass = event.target.className;

        switch (currentClass) {
            case 'dashboard':
                new DashboardView().showDiv('dashboard')
                break;
            case 'jwt-auth':
                new JWTAuthView().showDiv('jwt-auth')
                break;
            case 'auth':
                new OAuthView().showDiv('auth')
                break;
        }
    })
})