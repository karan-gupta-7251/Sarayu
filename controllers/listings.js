const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("new.ejs");
};


module.exports.showListing = async (req, res) => {
    try {
      const { id } = req.params;
      const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" }, })
        .populate("owner");
      if (!listing) {
        req.flash("error", "This Listing is not exist!");
        res.redirect("/listings");
      } else {
        res.render("show.ejs", { listing });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

module.exports.createListing = async (req, res) => {
    let listing = req.body.listing;
    listing.owner = req.user._id; // Assign owner to the listing object
    let saveListing = await Listing.create(listing); // Save the listing
    console.log(saveListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  }


  module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    try {
      let listing = await Listing.findById(id);
      if (!listing) {
        req.flash("error", "This Listing is not exist!");
        res.redirect("/listings");
      } else {
        // You might want to add a check here to ensure the user is authorized to edit the listing
        res.render("edit.ejs", { listing });
      }
    } catch (err) {
      req.flash("error", "An error occurred while retrieving the listing.");
      res.redirect("/listings");
    }
  }


module.exports.updateListing =async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);

    }


module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedValue = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
    console.log(deletedValue);
  }