const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/sarayu");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "66e1cbaa4f5692f3aea1060f",
  }));
  await Listing.insertMany(initdata.data);
  console.log("data was intialized");
};

initDB();
