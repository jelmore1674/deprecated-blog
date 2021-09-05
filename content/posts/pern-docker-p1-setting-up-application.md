---
title: PERN Stack Docker Part 1 Setting Up
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

### Setting up the NodeJS Server

Now that we have navigated to the directory we shall initialize npm in our sever
folder.

```bash
npm init
```

Following the prompts we now have node in our project. Now, lets install some of
our dependencies.

```bash
npm install express cors
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

[insert image here]

Now lets create some dummy data. This is how I want to the post object to be.
However, you can create whatever.

```js
// Dummy Data
const dummyJournalPost = {
	title: 'Coding is great',
	content: 'There are so many ways to use Javascript, I have had a blast.',
	date: '08-29-2021',
};
```

Now lets create a route that will read the dummy data.

```js
app.get('/posts', (req, res) => {
	const post = dummyJournalPost;
	res.json(post);
});
```

You should have gotten the dummy post returned in your browser.

Now that we have our dummy data returned, lets setup our docker file. First,
create a `.dockerignore` file. Put our `node_modules` in it. So we can ignore
those files. Then lets create our `Dockerfile`

```docker
FROM node:latest

WORKDIR /app/server

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
```

Now we can actually move on to adding our client. So, lets `cd` back to our root
folder by running the following command.

```bash
cd ..
```

### Setting up React

Now let's create our react app by using `create-react-app`

```bash
npx create-react-app client
```

It will create the react app in our client directory. So lets `cd` there and
remove git from the client.

```bash
cd client
rm -rf .git
```

The reason we remove git from the client is because we want the entire
application as a whole to be tracked in our main `personal-journal` directory.
Now that we have our react frontend installed, let fire it up to make sure it is
working.

```bash
npm start
```

Then you should navigate to `http:localhost:3000/` and you will see the react
homepage.

[insert image here]

Now inside of our react app, in the app.js file lets use the React useEffect
hook to get our dummy data displayed on the home page.

```jsx
function App() {
	const [postData, setPostData] = React.useState('');

	React.useEffect(() => {
		const getData = async () => {
			const response = await fetch('http://localhost:5000/posts');
			const post = await response.json();
			setPostData(post);
		};
		getData();
	}, []);

	return (
		<div className='App'>
			<h2>{postData.title}</h2>
			<p>{postData.content}</p>
		</div>
	);
}

export default App;
```

Then you should have the content displayed in the browser. Now that we have our
frontend connected to our backend, let's work on setting up our client for
dockerization. We need a `Dockerfile` and a `.dockerignore` file. With these we
shall set up our .dockerignore by copying our .gitignore file a pasting it into
our .dockerignore file. Now lets create our Dockerfile.

```docker
FROM node:latest

WORKDIR /app/client

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
```

Now that we have our Dockerfile, we are ready for Docker.

### Setting up PostgreSQL

Postgres is great to setup, all we need to do is `cd` back to our project root
directory then navigate to the `Postgres` folder. Once there lets create a few
files.

```bash
mkdir seed tables
touch Dockerfile deploy_schemas.sql seed/seed.sql tables/tables.sql
```

Now inside of our editor let navigate to our Posgres folder and lets create our
table first. Lets look at our dummy data from earlier. It had the properties
`title`,`content`, and `date`. So our SQL should have that. So in our tables.sql
lets build our table.

```sql
BEGIN TRANSACTION;

CREATE TABLE posts (
  id serial PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content text NOT NULL,
  post_date timestamp NOT NULL
);

COMMIT;
```

Now in our seeds let's seed some random data into our database. Let's go to our
seed.sql file and add our queries to add some data.

```sql
BEGIN TRANSACTION;

INSERT INTO posts (title,content,post_date) VALUES('JS is really cool', 'While working with JS I have had so much fun.','2021-08-23');
INSERT INTO posts (title,content,post_date) VALUES('TS is better', 'While working with TS I have had so many less errors.','2021-08-25');

COMMIT;
```
