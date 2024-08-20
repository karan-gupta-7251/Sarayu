// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const wrapAsync = require("./Utils/wrapAsync.js");
// const expressError = require("./Utils/expressError.js");
// const { listingschema, reviewSchema } = require("./schema.js");
// const Review = require("./models/review.js");

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "/public")));

// app.listen("8080", () => {
//   console.log("Server is working");
// });

// main()
//   .then(() => {
//     console.log("Connected to Database");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/sarayu");
// }

// const validatelisting = (req, res, next) => {
//   let { error } = listingschema.validate(req.body);
//   if (error) {
//     console.log(error);
//     let errMsg = err.details.map((el) => el.message).join(",");
//     throw new expressError(400,errMsg)
//   } else {
//     next();
//   }
// };

// const validateReview = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);
//   if (error) {
//     console.log(error);
//     let errMsg = err.details.map((el) => el.message).join(",");
//     throw new expressError(400,errMsg)
//   } else {
//     next();
//   }
// };

// //Index route
// app.get(
//   "/listings",
//   wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("index.ejs", { allListings });
//   })
// );

// //Show route
// app.get(
//   "/listings/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("show.ejs", { listing });
//   })
// );

// //New route
// app.get("/listing/new", (req, res) => {
//   res.render("new.ejs");
// });

// //Create route
// // app.post("/listings", validatelisting,wrapAsync( async (req,res)=>{
// //     let {title , description , url , price , country, location} = req.body;
// //     let listing = new Listing({title , description , url , price , country, location});
// //     await listing.save();
// //     res.redirect("/listings")
// // }));
// app.post(
//   "/listings",
//   validatelisting,
//   wrapAsync(async (req, res) => {
//     let listing = req.body.listing;
//     console.log(listing);
//     let saveListing = await Listing.create(listing); //or we can do== new Listing(listing).save();
//     console.log(saveListing);
//     res.redirect("/listings");
//   })
// );

// // Edit route
// app.get(
//   "/listing/:id/edit",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     let listing = await Listing.findById(id);
//     res.render("edit.ejs", { listing });
//   })
// );

// // Update route
// app.put(
//   "/listing/:id",
//   validatelisting,
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     let { title, description, url, price, country, location } = req.body;
//     let listing = await Listing.findByIdAndUpdate(id, {
//       title,
//       description,
//       url,
//       price,
//       country,
//       location,
//     });
//     res.redirect(`/listings/${id}`);
//   })
// );

// // Delete route
// app.delete(
//   "/listing/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     let deletedValue = await Listing.findByIdAndDelete(id);
//     res.redirect("/listings");
//     console.log(deletedValue);
//   })
// );

// // Reviews
// // post route

// app.post("/listings/:id/reviews", validateReview, wrapAsync( async (req, res) => {
//   let listing = await Listing.findById(req.params.id);
//   let newReview = new Review(req.body.review);

//   listing.reviews.push(newReview);
//   await newReview.save();
//   await listing.save();

//   res.redirect(`/listing/${listing._id}`);
// }));

// // app.get("/testListing", async (req, res) => {
// //   let sampleListig = new Listing({
// //     title: "Villa in miami",
// //     description:
// //       "5 Bed room villa with all necessary things one maid forr cleaning fully air conditioned with swimming pool and garden ",
// //     image:
// //       "https://static1.mansionglobal.com/production/media/article-images/92f2616f2a10d79c2ed128c724dd3e0f/large_1.20190612_02_DSC_0413_ED_HR.jpg",
// //     location: "Miami, Florida",
// //     country: "USA",
// //   });

// //   await sampleListig.save();
// //   console.log("sample saved");
// //   res.send("successful testing");
// // });

// // app.all("*",(req,res,next)=>{
// //   next(new expressError(404 ,"Page not found"))
// // });

// // app.use((err, req , res , next)=>{
// // let {statusCode = 500 ,message = "something went wrong"} =  err;
// // res.render("error.ejs",{message})
// // // res.status(statusCode).send(message);
// // });

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Not Found"));
// });
// app.use((err, req, res, next) => {
//   let { statusCode = 500, msg = "Some error" } = err;
//   res.status(statusCode).render("error.ejs", { err });
// });

// app.get("/", (req, res) => {
//   res.send("root");
// });


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./Utils/wrapAsync.js");
const ExpressError = require("./Utils/expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.listen("8080", () => {
  console.log("Server is working");
});

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

const validateSchema = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    console.log(errMsg);
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Index route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
  })
);

//Show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("show.ejs", { listing });
  })
);

//New route
app.get("/listing/new", (req, res) => {
  res.render("new.ejs");
});

//Create route
// app.post("/listings", validatelisting,wrapAsync( async (req,res)=>{
//     let {title , description , url , price , country, location} = req.body;
//     let listing = new Listing({title , description , url , price , country, location});
//     await listing.save();
//     res.redirect("/listings")
// }));
app.post(
  "/listings",
  validateSchema,
  wrapAsync(async (req, res) => {
    let listing = req.body.listing;
    console.log(listing);
    let saveListing = new Listing(listing); //or we can do== new Listing(listing).save();
    await saveListing.save();
    // console.log(saveListing);
    res.redirect("/listings");
  })
);

// Edit route
app.get(
  "/listing/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("edit.ejs", { listing });
  })
);

// Update route
app.put(
  "/listing/:id",
  validateSchema,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    console.log(req.body.listing);
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    await listing.save();
    res.redirect(`/listings/${id}`);
  })
);

// Delete route
app.delete(
  "/listing/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedValue = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log(deletedValue);
  })
);

// Reviews
// post route

app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listing/${listing._id}`);
  })
);

// app.get("/testListing", async (req, res) => {
//   let sampleListig = new Listing({
//     title: "Villa in miami",
//     description:
//       "5 Bed room villa with all necessary things one maid forr cleaning fully air conditioned with swimming pool and garden ",
//     image:
//       "https://static1.mansionglobal.com/production/media/article-images/92f2616f2a10d79c2ed128c724dd3e0f/large_1.20190612_02_DSC_0413_ED_HR.jpg",
//     location: "Miami, Florida",
//     country: "USA",
//   });

//   await sampleListig.save();
//   console.log("sample saved");
//   res.send("successful testing");
// });

// app.all("*",(req,res,next)=>{
//   next(new expressError(404 ,"Page not found"))
// });

// app.use((err, req , res , next)=>{
// let {statusCode = 500 ,message = "something went wrong"} =  err;
// res.render("error.ejs",{message})
// // res.status(statusCode).send(message);
// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Not Found"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "something went worng" } = err;
  res.status(status).render("error.ejs", { err });
});

app.get("/", (req, res) => {
  res.send("root");
});
