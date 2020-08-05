<p align="center">
<img src="https://raw.githubusercontent.com/oliviasztanga/dew-web/master/public/favicon.ico" alt="" height="150" width="150"/>
</p>
<h1 align="center">dew webstore</h1>
<p align="center"><i>A fully functional e-commerce web application for a fictional cosmetics brand.</i></p>
<br />



## Technologies

Javscript, React, Redux, Bootstrap, Node, Express, Sequelize, PostgreSQL, Heroku, Google OAuth

## Live Demo
A live demo is hosted on Heroku [here](https://dew-webstore.herokuapp.com/).

## Installation

```js
// install required libraries
npm install

// create project database
createdb dew

// seed project database
npm run seed

// run app for development
npm run start-dev
```

## Project Overview

<p align="center">
<img src="https://github.com/oliviasztanga/dew-web/blob/master/screenshots/home.gif?raw=true" alt="" height="450" width=""/>
</p>
<br/>
<p align="center">Users arrive at a fully styled home page displaying featured products and multiple entry-points to browse products.</p>
<br/>

<p align="center">
<img src="https://github.com/oliviasztanga/dew-web/blob/master/screenshots/all-products.gif?raw=true" alt="" height="450" width=""/>
</p>
<br/>
<p align="center">Users can navigate between viewing all products or products by selected category.</p>
<br/>

<p align="center">
<img src="https://github.com/oliviasztanga/dew-web/raw/master/screenshots/user-access.gif?raw=true" alt="" height="450" width=""/>
</p>
<br/>
<p align="center">Users are able to register or log in to keep track of their past orders.</p>
<br/>

<p align="center">
<img src="https://github.com/oliviasztanga/dew-web/blob/master/screenshots/cart-features.gif?raw=true" alt="" height="450" width=""/>
</p>
<br/>
<p align="center">Users are notified of changes to their cart by toast notifications. Cart collates multiple additions of the same product, and handles removal and changes of quantity. If user selects a quantity of zero, an item is removed from the cart. The cart is stored in session or user memory, so users can leave the page and return to their cart in progress.</p>
<br/>
