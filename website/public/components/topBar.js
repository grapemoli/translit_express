// Define the component.
class TopBar extends HTMLElement {
    constructor () {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <link rel='stylesheet' href='/@material/typography/dist/mdc.typography.css'/>
        <link rel='stylesheet' href='/@material/theme/dist/mdc.theme.css'/>
        <link rel='stylesheet' href='/@material/top-app-bar/dist/mdc.top-app-bar.css'/>
        <link rel='stylesheet' href='/@material/icon-button/dist/mdc.icon-button.css'/>
        <link rel='stylesheet' href='/stylesheets/style.css'/>
    
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
    
        <script src='/@material/top-app-bar/dist/mdc.topAppBar.js'></script>
        <script src='/@material/icon-button/dist/mdc.iconButton.js'></script>
        <script src='javascripts/index.js'></script>

        <style>
            .material-symbols-outlined {
                font-variation-settings: 'FILL' 100,
                'wght' 400,
                'GRAD' 0,
                'opsz' 24
            }
        </style>
            
        <script>
            // Reroute methods.
            function toHome() {
                window.location.href = '/';
            }
            
            function toSearch() {
                window.location.href = '/bible';
            }
            
            function toSaved() {
                window.location.href = '/saved';
            }
            
            function toAccount() {
                window.location.href = '/account';
            }
        </script>
         
         
        <header class="mdc-typography mdc-top-app-bar mdc-top-app-bar--fixed mdc-menu-surface--anchor" style="left:0px; top:0px">
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <button id='home' class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button material-symbols-outlined" aria-label="Home">home</button>
                    <span class="mdc-top-app-bar__title">Translit</span>
                </section>
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                    <button id='search' class="material-icons mdc-top-app-bar__action-item mdc-icon-button material-symbols-outlined" aria-label="Search">search</button>
                    <button id='saved' class="material-icons mdc-top-app-bar__action-item mdc-icon-button material-symbols-outlined" aria-label="Favorite">favorite</button>
                    <button id='account' class="material-icons mdc-top-app-bar__action-item mdc-icon-button material-symbols-outlined" aria-label="Person">person</button>
                </section>
            </div>
        </header>
        `;

        document.getElementById('home').addEventListener('click', function (event) {
            window.location.href = '/';
        });

        document.getElementById('search').addEventListener('click', function (event) {
            window.location.href = '/bible';
        });

        document.getElementById('saved').addEventListener('click', function (event) {
            window.location.href = '/saved';
        });

        document.getElementById('account').addEventListener('click', function (event) {
            window.location.href = '/account';
        });
    }
}

customElements.define('top-bar', TopBar);
