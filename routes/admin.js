const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course} = require("../db");

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    

    await Admin.create({
        username:username,
        password:password
    })
     res.json({
        msg:"Admin create sucessfully"
     })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const tittle = req.body.tittle;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    //zod

    const newCourse = await Course.create({
        tittle,
        description,
        imageLink,
        price
    })
    res.json({
        msg:"Course Created Sucessfully",courseId:newCourse._id
    })

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({})
    .then(function(response){
        res.json({
            courses:response
        })
    })
});

module.exports = router;