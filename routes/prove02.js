const express = require("express");
const router = express.Router();
let booksArray = [];


const outputHTMLRender = (res) => {
    res.render("prove02Output", {
        title: "Prove02 Output",
        books: booksArray
    });
};


router.get('/', (req, res, next) => {
    res.render("prove02Input", {
        title: "Prove02 Input"
    });
});


router.post('/outputData', (req, res, next) => {
    console.log("hey");

    const incomingData = [];
    req.on('data', (data) => {
        incomingData.push(data);
    });

    req.on('end', () => {
        data = Buffer.concat(incomingData).toString();
        data = data.split('&');
        let newTitle = data[0].split('=')[1].split('+').join(' ').trim();
        let newSummary = data[1].split('=')[1].split('+').join(' ').trim();
        if ((newTitle != "") || (newSummary != "")) {
            booksArray.push({
                title: newTitle,
                summary: newSummary
            });
        }

        res.redirect('/output');
    });
});


router.get('/output', (req, res, next) => {
    outputHTMLRender(res);
    console.log("what");
});

module.exports = router;