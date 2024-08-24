const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../Utils/wrapAsync.js");
const expressError = require("../Utils/expressError.js");
const { listingschema } = require("../schema.js");


const validatelisting = (req, res, next) => {
    if (!req.body.listing) {
      throw new expressError(400, "Listing data is missing.");
    }
    let { error } = listingschema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new expressError(400, errMsg);
    } else {
      next();
    }
  };

//Index route
router.get(
    "/listings",
    wrapAsync(async (req, res) => {
      const allListings = await Listing.find({});
      res.render("index.ejs", { allListings });
    })
  );
  
  //Show route
  router.get(
    "/listings/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id).populate("reviews");
      res.render("show.ejs", { listing });
    })
  );
  
  //New route
  router.get("/listings/new", (req, res) => {
    res.render("new.ejs");
  });
  
  //Create route
  // app.post("/listings", validatelisting,wrapAsync( async (req,res)=>{
  //     let {title , description , url , price , country, location} = req.body;
  //     let listing = new Listing({title , description , url , price , country, location});
  //     await listing.save();
  //     res.redirect("/listings")
  // }));
  router.post(
    "/listings",
    validatelisting,
    wrapAsync(async (req, res) => {
      let listing = req.body.listing;
      console.log(listing);
      let saveListing = await Listing.create(listing); //or we can do== new Listing(listing).save();
      console.log(saveListing);
      res.redirect("/listings");
    })
  );
  
  // Edit route
  router.get(
    "/listings/:id/edit",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let listing = await Listing.findById(id);
      res.render("edit.ejs", { listing });
    })
  );
  
  // Update route
  router.put(
    "/listings/:id",
    validatelisting,
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let { title, description, url, price, country, location } = req.body;
      let listing = await Listing.findByIdAndUpdate(id, {
        title,
        description,
        url,
        price,
        country,
        location,
      });
      res.redirect(`/listings/${id}`);
    })
  );
  
  // Delete route
  router.delete(
    "/listings/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let deletedValue = await Listing.findByIdAndDelete(id);
      res.redirect("/listings");
      console.log(deletedValue);
    })
  );


  module.exports = router;