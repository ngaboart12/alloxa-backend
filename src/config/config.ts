
import mongoose from "mongoose";
import ProductModel from "../models/Product";

const url:any = process.env.DATABASE_URL
mongoose.connect(url).then(()=>{
    console.log("database connected")
}).catch((error:any)=>{
    console.log(error)

})



const products = [
  { name: 'Hammer', category: 'Tools', badge: 'New', imageUrl: 'https://m.media-amazon.com/images/I/71tTWyypTKL.jpg', quickAction: true, price: 15.99 },
  { name: 'Screwdriver', category: 'Tools', badge: 'Sale', imageUrl: 'https://t3.ftcdn.net/jpg/03/43/23/06/360_F_343230663_3xSvB7lfTmqHd3jEDqLvWob4gmj93Tdw.jpg', quickAction: false, price: 7.99 },
  { name: 'Concrete Mixer', category: 'Construction Equipment', badge: 'Limited', imageUrl: 'https://image.made-in-china.com/2f0j00AsaUCObKLpqL/Concrete-Mixer-Prices-in-Rwandan-Francd.webp', quickAction: true, price: 299.99 },
  { name: 'Bulldozer', category: 'Heavy Machinery', badge: 'Featured', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/CatD9T.jpg/1200px-CatD9T.jpg', quickAction: false, price: 12000.99 },
  { name: 'Cement', category: 'Materials', badge: 'Bestseller', imageUrl: 'https://st2.depositphotos.com/1029541/6378/i/450/depositphotos_63780727-stock-photo-bags-of-cement.jpg', quickAction: true, price: 9.99 },
  { name: 'Brick', category: 'Materials', badge: 'New', imageUrl: 'https://img.freepik.com/free-photo/red-brick-wall-pattern-texture_53876-23210.jpg', quickAction: false, price: 1.99 },
  { name: 'Ladder', category: 'Tools', badge: 'Featured', imageUrl: 'https://www.hss.com/medias/sys_master/images/images/8879317352478.jpg', quickAction: true, price: 49.99 },
  { name: 'Wrench', category: 'Tools', badge: 'Sale', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chrome_Vanadium_Adjustable_Wrench.jpg', quickAction: false, price: 12.99 },
  { name: 'Drill', category: 'Power Tools', badge: 'Limited', imageUrl: 'https://www.shutterstock.com/image-photo/cordless-drill-screwdriver-bit-on-260nw-1048446001.jpg', quickAction: true, price: 89.99 },
  { name: 'Safety Helmet', category: 'Safety Gear', badge: 'Bestseller', imageUrl: 'https://ladwas.com/wp-content/uploads/2022/07/519oZb7UACL._SL1500_.jpg', quickAction: false, price: 19.99 },
];

async function seedProducts() {
  try {
   const deletes =  await ProductModel.deleteMany({});
   if(deletes){
       console.log('Existing products removed');

   }

  const insert =   await ProductModel.insertMany(products);
  if(insert){
      console.log('Database seeded with products');

  }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}
