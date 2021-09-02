---
title: PERN Stack Docker Part 1
excerpt:
    Deploying Full-Stack PERN (PostgreSQL, Express, React, Node) applications
    can be difficult. You have to have a decoupled front-end which means you
    have to deploy the front-end and back-end separately. Docker can make
    deploying...
image: pern-stack-docker-p1.png
isFeatured: true
date: '2021-08-26'
---

Deploying Full-Stack PERN (PostgreSQL, Express, React, Node) applications can be
difficult. You have to have a decoupled front-end which means you have to deploy
the front-end and back-end separately. Docker can make deploying so much easier.
We can have a single docker container, to deploy your full-stack application.
So, lets build ourselves a simple application! What we will build is a Personal
Journal. Diary if you will.

## Setting up our application

To start we will create a new directory. I will call it `personal-journal` .
After you create that directory we will `cd` into the newly created directory.
Then make three more directories `client` , `server`, and `postgres`. We will
actually start with setting up the node server.

```bash
mkdir personal-journal
cd personal-journal
mkdir client server postgres
cd server
```

## Setting up the NodeJS Server

Now that we have navigated to the directory we shall initialize npm in our sever
folder.

```bash
npm init
```

Following the prompts we now have node in our project. Now, lets install some of
our dependencies.

```bash
npm install express pg knex cors morgan
```

Now that we have our dependencies lets setup up our node server, lets set up our
`server.js` file.

```bash
touch server.js
```

I personally use VSCode as my editor of choice, but you can do this with atom or
your editor of choice. Just `cd` our of the server into the application
directory by doing the following.

```bash
cd ..
code .
```

Now VSCode should open and you can start to create your server. Lets start by
opening our server.js file. Lets make sure everything is working by putting this
in your `server.js`

```js
// import dependencies
const express = require('express');
const cors = require('cors');

// Start Express
const app = express();

// Req Obj as JSON
app.use(express.json());
// CORS Header to avoid errors
app.use(cors());

app.get('/', (req, res) => {
	res.send('Server is working!');
});

app.listen(5000, () => {
	console.log('Server Is Running!');
});
```

Now if you run the command `node server.js ` and go to `http://localhost:5000/`
You should see "Server is working!" in the browser.
