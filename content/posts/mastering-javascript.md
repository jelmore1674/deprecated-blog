---
title: Mastering JavaScript
excerpt:
    JavaScript is the most important programming language for web development.
    You probably don't know it well enough!
image: mastering-js-thumb.png
isFeatured: false
date: '2021-10-30'
---

JavaScript powers the web - it's **the** most important programming language you
need to know as a web developer.

For example, you should understand code like this:

```ts
const hello: string = 'Hello World'
function printHello:string(dream) {
return dream
}

```

Learn more about it [here](https://academind.com).

```css
.this-class {
	border: 1px solid green;
}
```

```bash
sudo apt udpdate
```

### yml files

```yml
services:
    # Backend API
    facerecognitionbrain-api:
        container_name: backend
        build: ./
        command: npm start
        environment:
            POSTGRES_URI: postgres://someuser:somepassword@postgres:5432/smart-brain-docker
            REDIS_URI: redis://redis:6379
        links:
            - postgres
            - redis
        working_dir: /usr/src/facerecognition-api
        ports:
            - '3000:3000'
        volumes:
            - ./:/usr/src/facerecognition-api
    # PostgresDB
    postgres:
        environment:
            POSTGRES_USER: someuser
            POSTGRES_PASSWORD: somepassword
            POSTGRES_DB: smart-brain-docker
            POSTGRES_HOST: postgres
        build: ./postgres
        ports:
            - '5431:5432'

    # Redis
    redis:
        image: redis
        ports:
            - '6379:6379'
```
