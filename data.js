const mongoose = require('mongoose');
const Product=require("./models/product");


const products=[
    {
       name:"Iphone 11",
       img:"https://img.freepik.com/premium-photo/fashion-fabric-theme-3d-abstract-background_893012-52361.jpg?w=996",
        price:300,
        desc:"Apple iPhone 11 smartphone. Announced Sep 2019. Features 6.1″ display, Apple A13 Bionic chipset, 3110 mAh battery, 256 GB storage, 4 GB RAM"
    },
    {
        name:"Iphone 11",
        img:"https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=600",
         price:100,
         desc:"Apple iPhone 11 smartphone. Announced Sep 2019. Features 6.1″ display, Apple A13 Bionic chipset, 3110 mAh battery, 256 GB storage, 4 GB RAM"
     },
     {
        name:"Iphone 11",
        img:"https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=600",
         price:150,
         desc:"Apple iPhone 11 smartphone. Announced Sep 2019. Features 6.1″ display, Apple A13 Bionic chipset, 3110 mAh battery, 256 GB storage, 4 GB RAM"
     },
     {
        name:"Iphone 11",
        img:"https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600",
         price:300,
         desc:"Apple iPhone 11 smartphone. Announced Sep 2019. Features 6.1″ display, Apple A13 Bionic chipset, 3110 mAh battery, 256 GB storage, 4 GB RAM"
     },
     {
         name:"Iphone 11",
         img:"https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=600",
          price:100,
          desc:"Apple iPhone 11 smartphone. Announced Sep 2019. Features 6.1″ display, Apple A13 Bionic chipset, 3110 mAh battery, 256 GB storage, 4 GB RAM"
      },
      {
         name:"Iphone 11",
         img:"https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=600",
          price:150,
          desc:"Apple iPhone 11 smartphone. Announced Sep 2019. Features 6.1″ display, Apple A13 Bionic chipset, 3110 mAh battery, 256 GB storage, 4 GB RAM"
      },
];

async function dataDB(){
    await Product.insertMany(products);
}

module.exports=dataDB;