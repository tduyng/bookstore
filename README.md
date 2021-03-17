# Bookstore

Create modern web app clean architecture with NestJS + MongoDB & ViteJS + React

Visit demo for client side at : [https://bookzeta.netlify.app/](https://bookzeta.netlify.app/)


## Technologies
- Crawl data
  - Using Python + Scrapy to crawl books data from other website
- Backend
  - NodeJs/NestJs TypeScript
  - MongoDB/Mongoose
  - Cloudinary for uploading images
  - Jest (testing)
- Front-end
  - ReactJS
  - ViteJS (really fast)
  - Redux + Redux Thunk
  - SCSS
  - Cypress (testing)

## Features
- **MongoDB** for database cloud
- **Testing**: Unit testing, End to end testing with **Jest** & **Cypress**
- **CI-CD**: GitHub actions
- Auth with **Jwt**, session, **refresh toke**n
- Social auth with **Facebook & Google auth**
- Enhance server **security** with helmet, csurf, rate-limit, proxy
- Send email with **nodemailer** + **Sendgrid**
- **Verification** account + reset password with jwt token
- **Upload** image with NestJS/multer & **Cloudinary**
- **Full-text search** books
- Query/Get books by genre with **pagination**
- Manage state with **Redux** + Thunk (**@redux/toolkit** way)
- Improve **SEO** with react-helmet
- **Lazyload** page & components
- Lint & format with **Eslint + Prettier**
- Documentation with Swagger/Open API

- Improvements:
  - Custom logger with winston
  - Nginx
  - Testing

## Issues

Some issues when deploy in production with heroku & netlify. 
  - Proxy: I set proxy to redirect to server side when client side request with url '/api/*'. It works perfectly on local. But when I deploy client on netlify and using their proxy with [configuration](https://docs.netlify.com/routing/redirects/) in `_redirects` file. It didn't work.So I must using request to server link directly with cross-origin. 
    
    ---> Solution: Maybe try using setting for `netlify.toml`, don't use `_redirects` files. 
    
    I'm not return to test proxy with it (because I have already use send direct link to server, not pass proxy, see below.). 
    
    But I found when I set redirect link React router with option `/* /index.html 200` in `_redirects` file, it didn't work. When I use `netlify.toml`, it works. So I think that is the problem.


  - Now if I call fetch request directly to server, I have trouble with `cross-origin`. After some hours wasting time, finally, I make the job done:
    - Set Header from request at client side with options: 

      ```ts
      const defaultFetchOptions: RequestInit = {
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      await fetch(server_link_request, { ...defaultFetchOptions, ...morOptions });

      ```

    - Use/Enable cors at server side
      ```ts
      app.enableCors({ //or app.use(cors({...}) for express.js)
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
      });

      ```

      But the two solutions above not enough. It sill has error `...has been blocked by CORS policy ...`


    - So how to solve it? The solutions is creating an middleware to update header for each request:

      ```ts
         	// Enable cors middleware
      app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', env.clientUrl); // update to match the domain you will make the request from
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
        );
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', true);
        if (req.method === 'OPTIONS') {
          return res.sendStatus(204);
        }
        next();
      });
      ```

    I solve my cross-origin issues with this solution.

  - Issue cookies not working on heroku.

    Yeah, I have trouble with that problem too even I try to set middleware `app.set('trust proxy', 1)`. After several tests to change config in express-session, finally, I see that heroku doesn't work when we specify an client domain for cookies. I must use sameSite='none', secure=true, and disable cookie domain:

    Here is my session configuration:
    ```ts
    // session.config.ts 
    import session from 'express-session';
    import { envConfig } from './env.config';
    export const SESSION_AUTH_KEY = 'SESSION_AUTH';

    export function sessionConfig(): session.SessionOptions {
      const env = envConfig();
      const __prod__ = env.mode === 'production';
      // In-memory storage
      return {
        name: SESSION_AUTH_KEY,
        secret: env.sessionSecret,
        resave: false,
        saveUninitialized: false,
        proxy: true, // add this when behind a reverse proxy, if you need secure cookies
        cookie: {
          httpOnly: true,
          secure: __prod__,
          maxAge: env.jwt.jwtRefreshExpiredTime, // 30 days --> need >= max of alive time of refresh token
          sameSite: __prod__ ? 'none' : 'lax',
          // domain: __prod__ ? '.bookzeta.netlify.app' : undefined,
        },
      };
    }

    ```

    That's it. I still have a lot of things to do for make this project more  closer as an real application but I will try it when I have time to work on them  xD.

## Fast screencast

[![Screen cast](https://media.giphy.com/media/pSOySnzqtQA2CH0Vc1/giphy.gif)](https://www.youtube.com/watch?v=bAreBxxrDac)



## Images
<div align="center">
<img src="docs/img/home.png"/>
</div>

