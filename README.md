# A simple example of a full multiplayer game web app built with React.js and Node.js stack

Major libraries used on front end:
- react
- webpack
- babel
- react-router
- ampersand
- sass
- jest

Major libraries used on server:
- node.js
- socket.io
- express

### Folder structure:
- **WS** - server side and compiled front end
- **react_ws_src** - React development source and testing

---

### View it online at 
https://x-ttt.herokuapp.com/

#### Configurable with external XML file - 
https://x-ttt.herokuapp.com/ws_conf.xml

---

##For demonstration purposes only.


### UPDATED CHANGES

1. Updated packages 
    The packages are very old and outdated. If this was a production app I would prioritize upgrading all the packages, webpack and linters as there are many depreciated packages and quite a few security concerns - around 140. However for times sake I only updated a minimal amount
    - update react and react router. I want to use/develop with more modern hooks and I like to use react context for state management. Using the app settings object wasn't triggering the rerenders I wanted. I upgraded react-router as well. However I didn't want to go too late a version because webpack issues would occur and I don't want to upgrade/spent lots of time configuring webpack for this exercise.
    - Removed node-sass

2. Created a login page
     - Instead of set name users must create an account or login.
     - This login data is persisted via a "mock api" which is really just local storage so you can log in and out of your existing account
     - The login section of the nav changes to "{username}" and takes you to a user profile section

4. Record and save game info/data
    - I have now set it to save game info - wins/losses/draws for computer and human players.
    - This is saved via the 'mock api' which can be viewed whenever the user is logged in in the user profile section

5. User profile section
    - This section is where the user can see their game scores in a table 
    - They also can log out

6. Error handling on play against humans.
    - If connecting to another human isn't working/connecting the status message just stays connecting. I have changed it to try 5 times then if it fails 
    an error message will be displayed

7. Fixed image routing.
    - The header and footer images were not displaying correctly when I downloaded this project. I changed the configs and the urls to the image files