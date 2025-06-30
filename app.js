const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



 const products = [
        {
            image : 'data:image/jpeg;base64,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',
            title : 'Bookish Boofer Jacket',
            price : '50,00 AED',
            slug : 'bookish-boofer-jacket',
        },
        {
            image : 'https://www.inkfactory.pk/wp-content/uploads/2019/08/T-Shirt-Mockup-007.jpg',
            title : 'Half Sleev T-Shirts',
            price : '0,00 AED',
            slug : 'half-sleev-tshirts',
        },
         {
            image : 'https://islamicmart.com.pk/cdn/shop/files/essArtboard_13.webp?v=1747834237',
            title : 'Islamic T-Shirts',
            price : '30,00 AED',
            slug : 'islamic-tshirts',
        },
         {
            image : 'https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/10-vintage-t-shirt-design-ideas/Playful%2C-Printing-Just-for-Fun-T-shirt-Design-by-Ena-designcrowd.png',
            title : 'Vantage T-Shirts',
            price : '70,00 AED',
            slug : 'vantage-tshirts',
        },
        {
            image : 'https://yumi.pk/cdn/shop/files/White.jpg?v=1745528709&width=600',
            title : 'Boys T-Shirts',
            price : '20,00 AED',
            slug : 'boys-tshirts',
        }



    ]


// Define a route
app.get('/', (req, res) => {
   
 res.render( 'index' , { products: products});

});


app.get('/:slug', (req, res) => {
    const slug = req.params.slug;
    const product = products.find(p => p.slug === slug);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.render('product', { product });
});

// Serach feautures 
app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );

    res.render('index', { products: filteredProducts });
});
// Serve static files (Bootstrap, CSS, JS)
app.use(express.static('public'));



    // Login setup 

// session setup
app.use(session({
    secret : 'mysecretkey',
    resave: false,
    saveUninitialized: true,  
}))


// Dumy login 
const users ={
    username : 'mehmood',
    password : '12345',   
}

// route login 
app.get('/', (req, res) => {
  if (req.session.isAuth) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check if the username and password match
    if (username === users.username && password === users.password) {
        req.session.isAuth = true; // Set session variable to indicate authentication
        return res.redirect('/dashboard'); // Redirect to dashboard on successful login
    }
    res.render('login', { error: 'Invalid username or password' }); // Render login page with error
});

//  Create middleware
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Use this middleware for the homepage
app.get('/', isAuthenticated, (req, res) => {
    const products = [ /* your existing products array */ ];
    res.render('index', { products });
});



// dashboard 
app.get('/dashboard', (req, res) => {
  if (req.session.isAuth) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});


// logout  
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/dashboard'); // Redirect to dashboard on error
        }
        res.redirect('/'); // Redirect to login page after logout
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
