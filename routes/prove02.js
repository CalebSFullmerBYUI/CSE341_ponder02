const express = require("express");
const router = express.Router();
let booksArray = [];

function makeProductId(product) {
    return product.title + product.author + Math.floor((Math.random() * 1000000000));
}

router.get("/", (req, res, next) => {
    res.render("prove02Output", {
        title: "Books Output",
        booksData: booksArray
    })
});

router.get("/add-product", (req, res, next) => {
    res.render("prove02Input", {
        title: "Add Product"
    });
});

router.post("/add-product", (req, res, next) => {
    req.body.title = req.body.title.trim();
    req.body.author = req.body.title.trim();
    req.body.description = req.body.description.trim();
    console.log(req.body.description);

    booksArray.push({
        title: (req.body.title != "" ? req.body.title : "[-- NO TITLE --]"),
        author: (req.body.author != "" ? req.body.author : "[-- NO AUTHOR --]"),
        price: (req.body.price > 0 ? req.body.price : 0),
        description: req.body.description,
        id: makeProductId(req.body)
    });

    console.log(booksArray[booksArray.length - 1].id)

    res.redirect("/");
});

router.post("/delete-product", (req, res, next) => {
    let removeIndex = booksArray.findIndex((book) => { return book.id === req.body.productId });

    if (removeIndex > -1) {
        booksArray.splice(removeIndex, 1);
    }

    res.redirect("/");
});

module.exports = router;