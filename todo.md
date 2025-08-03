- [ ] add APIerror response type
- [ ] add APIresponse type
- [ ] save to obsidian feature
- [x] import all saves from pocket feature
- [ ] generate tldr for this article ai feature, use cloudflare ai gateway

### UI Reference
https://blog.mozilla.org/wp-content/blogs.dir/278/files/2023/05/09_pocket.gif


## Bugs
- [x] in create highlight route, we aren't checking if the article id exists before, fix that.
- [x] UI in /app/login doesn't show up initially as user's selected UI font. (only the ui in /sink changes font)
- [x] fix the controller pattern hono ts problem 
    problem:- https://hono.dev/docs/guides/best-practices#don-t-make-controllers-when-possible
    - [x] fix for /saves
    - [x] fix for /articles
    - [x] fix for /highlights

    ### Doesn't exist bugs
    - [x] GET to /articles/nonArticleId should return 404
    - [x] GET to /saves/saveIdThatDoesntExist/archive should return 404
    - [x] GET to /saves/saveIdThatDoesntExist/unarchive should return 404
    - [x] GET to /saves/saveIdThatDoesntExist/favorite should return 404
    - [x] GET to /saves/saveIdThatDoesntExist/unfavorite should return 404



## Frontend 
- [x] light mode reading theme
- [x] font options
- [x] setup a landing page and other static pages on the "/" route
- [x] move all dynamic web app features to /app
- [x] remove global CheckAuth from __root and add it to /app
- [x] remove global useEffect to load initial auth session from __root and add it to /app
- [x] add navigation (sidebar) for screens bigger than md:
- [x] dark mode reading theme
- [x] render articles properly
- [ ] use shadcn/ui sidebar component to make the sidebar collapsible.
- [ ] reading progress bar
- [ ] list view option to see all saves
- [ ] grid view option to see all saves
- [ ] compact view option to see all saves
- [ ] convert article to pdf
- [ ] add a proper tsconfig settings
- [ ] add auto import sorter prettier plugin
- [ ] add auto tailwind class sorter plugin


- [ ] replace /app mock ui page filter options with separate pages for filters:
    - [x] /app/saves
    - [ ] /app/archived
    - [ ] /app/favorite
    - [ ] /app/search?q=

    ### Mock UI (UIs made with AI for testing features, replace this with real better uis later)
    - [x] save new article ui
    - [x] article reading view ui /app/saves/saveId
    - [x] import from pocket ui

    ### Auth
    - [x] support magic links
    - [x] remove Logo Here text with actual logo in /login
    - [x] add google login support
    - [x] make google login ui req to google login and github login ui req to github login
    - [ ] replace the Loading Auth Status text with a skeleton of the entire app
    - [ ] after signup add a custom welcome message like /welcome

    ### Themes
    - [x] Solar light theme
    - [x] Citrus light theme
    - [x] Emerald light theme
    - [x] Sky light theme
    - [x] Sky Dark theme
    - [x] add a theme store
    - [x] add a theme selector / toggle
    - [x] better theme switching component like https://monkeytype.com/settings?highlight=theme
    - [x] toggle themes in a better way without ThemeProvider/useEffect
    - [x] Lavender theme
    - [x] Mint theme
    - [x] Midnight theme
    - [x] Charcoal theme
    - [x] Github theme from monkeytype
    - [x] Nord theme from monkeytype
    - [x] Serika theme from monkeytype
    - [x] Gruvbox dark theme from monkeytype
    - [x] Dracula theme from monkeytype
    - [x] Catppuccin theme from monkeytype
    - [x] Create a setup to add any theme from monkeytype at will
    - [ ] Move theme info { key: "theme-classname", value: "Theme Display Name" } from ts file to json and load the json into the themeStore
    - [ ] sepia reading theme
    - [ ] dark themes (citrus dark, solar dark)
    - [ ] don't load all themes css for themes up front, load them dynamically through js.

    ### Fonts
    - [x] option for user to change UI font (fonts aren't synced to themes, user can mix and match both).
    - [x] font toggle component
    - [x] font store
    - [x] better font switching component like https://monkeytype.com/settings?highlight=fontFamily
    - [x] toggle fonts in a better way without FontsProvider/useEffect
    - [x] combine fonts arr from fontStore and FontToggle files, so that you don't have to make the same change in both the files
    - [x] simplify the FontToggle component
    - [x] add 10 more reading themes 
    - [ ] option for user to change Article font
    - [ ] Support custom reading font like https://monkeytype.com/settings?highlight=fontFamily
    - [ ] don't load all fonts css for themes up front, load them dynamically through js.

    ### Search 
    - [ ] add search bar
    - [ ] add search by tag
    - [ ] add search by highlight
    - [ ] add search by collection

    ### Profile Page
    - [x] mock profile ui
    - [x] remove settings ui from profile
    - [ ] replace with real ui

    ### Settings Page
    - [x] mock settings page ui
    - [ ] replace with real ui

## Backend 
- [x] add hono/logger
- [x] trim trailing slashes
- [x] add cors
- [x] setup secure headers
- [x] add a 8 sec timeout https://hono.dev/docs/middleware/builtin/timeout 
- [x] move parseArticle to a util file
- [x] setup custom logger
- [x] add global auth middleware
- [ ] learn the web standards cache api and add hono cache middleware 
- [ ] add caching to the /articles/:articleId endpoint
- [ ] add a proper tsconfig settings
- [ ] add auto import sorter prettier plugin

    ### Import from pocket
    - [x] csv parsing
    - [x] new route for uploading csv
    - [ ] better handling for this (current setup will hit 10ms CPU time limit)

    ### Auth
    - [x] add custom auth server
    - [x] configure sso for custom auth server
    - [x] remove legacy auth setup 

    ### Error Handling
    - [x] add error handling in parseArticle util
    - [ ] add global default error handling with hono app.onError()

    ### Zod Validations
    - [x] /saves
    - [x] /articles
    - [x] /highlights

    ### Endpoints
    #### Saves
    - [x] get all saves
    - [x] get all saves by user
    - [x] post save by user
        - [x] parse article by cheerio
        - [x] save article to articles table
        - [x] save save to saves table
    - [x] mark save as archived
    - [x] mark save as favorite
    - [x] remove save from favorites
    - [x] remove save from archive
    - [x] delete save
    - [x] pagination
        - [x] paginate all saves
        - [x] paginate all saves by user
    - [x] get saves metadata and article data with content both in a single endpoint

    #### Articles
    - [x] get article by id
    - [x] refresh article content, title, excerpt, lang, publishedTime, siteName (parse article again by cheerio)

    #### Collections
    - [ ] get all collections
    - [ ] get all collections by user
    - [ ] create collection
    - [ ] delete collection
    - [ ] add saves to collection (support for both single save as well as multiple saves)
    - [ ] remove saves from collection (support for both single save as well as multiple saves)

    #### Tags
    - [ ] get all tags
    - [ ] get all tags by user

    #### Highlights
    - [x] get all highlights by user
    - [x] get all highlights by user by article
    - [x] create highlight
    - [x] delete highlight


## Maybe some day
- [ ] bump.sh integration
- [ ] 