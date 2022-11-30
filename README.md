Based on [`NodeJsBase`](https://github.com/DawidKrok/NodeJsBase)
this server uses [`express`](https://www.npmjs.com/package/express) and [`mongoose`](https://mongoosejs.com/) and implements [Jason Web Token](https://jwt.io/) for user 
authorization. 

It's also secured against:
- DOS Attacks
- XSS Attacks
- NoSQL Injections

# Usage
Without being logged only `localhost:5000/` index page is available where all products are displayed.  
    
    
After logging into user account the `/cart` and `/share` pages are available. Index page also changes.

On index page user can now add products to cart by clicking on them. User can also go to `/cart` page by clicking on the cart icon.

On `/cart` page user can see all products added to their cart, change their quantity or choose delivery type and promo code. The final price is displayed at the bottom. User can also obtain `Share Link` that can be given to other user.

`/share` page should be accessed by pasting other users' `Share Link`. It adds contents of shared cart to the cart of user that is using this link.


# Folder structure
### db
Contains files representing database structure.  
It cointains [`schemes.js`](db/schemes.js) that implements [`mongoose.Schema`s](https://mongoosejs.com/docs/guide.html). Each `Schema` represents collection in database. Using them in other files allows for data manipulation in database.

### loaders
Contains basic configuration for `mongoose` and `express`.  
[`mongoose.js`](loaders/mongoose.js) connects with database based on `MONGO_URL` from `.env` file.  
[`express.js`](loaders/express.js) creates express app and configures basic security and avaibility features.

### services
Contains business logic of API like adding, getting, updating and deleting data from `MongoDB` and logging system with `JWT` handling.

### routers
Contains files with endpoints for handling user's `request`s. They're supposed to assign functions from `services`. 

### views
Contains `hbs` files. They're just a more convinient version of html files and are usually meant to be returned by one of endpoints as a `HtmlResponse`.

### public
Contains public rescources. Everything in it can be referenced by frontend (see one of files from `views` folder for a reference).