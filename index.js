const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const dataDB=require("./data");
const mongoose = require('mongoose');
const methodOverride=require("method-override");
const session = require('express-session');
const flash = require('connect-flash');
const passport =  require('passport');
const LocalStrategy =  require('passport-local');
const User = require('./models/User');
const MongoStore = require('connect-mongo');

//Roues
const productRoute=require("./routes/productRoute");
const customerSignup=require("./routes/customersignup");
const vendorSignup=require("./routes/vendorsignup");
const reviewRouter=require("./routes/reviewRoute");
const authRoutes = require('./routes/auth');
const faqsRoutes = require('./routes/faqs');
const cartRoutes = require('./routes/cart ');
mongoose.set('strictQuery', true);

let dbURL='mongodb+srv://deeptisinghal2003:JIMoqPCoIKnj4wG5@cluster0.3xmkplt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURL)
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log(err);
});


//  dataDB();
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));



let secret = 'weneedabettersecretkey';

let store = MongoStore.create({
  secret:secret,
  mongoUrl: dbURL,
  touchAfter:24*60*60
})

const sessionConfig = {
  store:store,
  name:'bhaukaal',
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie:{
      httpOnly:true,
      expires:Date.now() + 1000*60*60*24*7,
      maxAge: 1000*60*60*24*7
  }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



passport.use(new LocalStrategy(User.authenticate()));


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

//Routers 

  app.use(productRoute);
  app.use(customerSignup);
  app.use(vendorSignup);
  app.use(reviewRouter);
  app.use(authRoutes);
  app.use(faqsRoutes);
  app.use(cartRoutes)

  
  // Start server
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
    });