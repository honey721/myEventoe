import express from "express";
import {createArticle,deleteArticle,getAllArticle, updateArticle} from "../controllers/article.js";

const router = express.Router();

//CREATE
router.post("/", createArticle);


// Update
router.put("/update",updateArticle);


router.get("/findAll",getAllArticle);
// router.put("/update/:id", updateArticle);


// Delete 
router.delete("/delete/:id",deleteArticle)


export default router;

