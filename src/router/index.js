const user = require('./user.router');
const product = require('./product.router');
const cart = require('./cart.router');
const comment = require('./comment.router');
const image = require('./image.router');
function router(app){
    app.use('/users',user);
    app.use('/products',product);
    app.use('/carts',cart);
    app.use('/comments',comment);
    app.use('/images',image);
}
module.exports = router;