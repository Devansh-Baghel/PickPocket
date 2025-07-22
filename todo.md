- [ ] add APIerror response type
- [ ] add APIresponse type
- [ ] save to obsidian feature
- [ ] import all saves from pocket feature


## Bugs
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
- [ ] reading progress bar
- [ ] dark mode reading theme
- [ ] render articles properly
- [ ] list view option to see all saves
- [ ] grid view option to see all saves
- [ ] compact view option to see all saves
- [ ] convert article to pdf
- [ ] add a proper tsconfig settings
- [ ] add auto import sorter prettier plugin
- [ ] add auto tailwind class sorter plugin

    ### Auth
    - [ ] support magic links
    - [ ] remove Logo Here text with actual logo in /login
    - [ ] add google login support
    - [ ] make google login ui req to google login and github login ui req to github login
    - [ ] replace the Loading Auth Status text with a skeleton of the entire app

    ### Themes
    - [x] Solar light theme
    - [x] Citrus light theme
    - [x] add a theme store
    - [x] add a theme selector / toggle
    - [ ] use the shadcn select component instead of the native browser one
    - [ ] sepia reading theme
    - [ ] dark themes (citrus dark, solar dark)

    ### Fonts
    - [x] option for user to change UI font (fonts aren't synced to themes, user can mix and match both).
    - [x] font toggle component
    - [x] font store
    - [ ] option for user to change Article font

    ### Search 
    - [ ] add search bar
    - [ ] add search by tag
    - [ ] add search by highlight
    - [ ] add search by collection


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