const express = require("express");
const router = express.Router();

const {allUser,register,login,getQuote,postQuote}  = require('../controller/user')

router.get("/allusers",allUser );

router.post("/register",register);

router.post("/login",login );
router.post("/quote",postQuote)
router.get("/quote",getQuote)

// router.post("/quote",quote)

module.exports = router
