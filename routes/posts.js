import express from 'express'; //commonJS => const express = require('express');
import pc from '../controllers/postController.js';
const router = express.Router();


const getRequestedMiddleware = (req, res, next) => {
	console.log('get was requested');
	next();
}

const deleteHappenedMiddleware = (req, res, next) => {
	console.log("something was deleted!");
	next();
}

router.get('/', getRequestedMiddleware, pc.getPosts );

router.post('/', pc.createPost );

router.get('/:id', pc.getPost );

router.put('/:id', pc.editPost);

router.delete('/:id', deleteHappenedMiddleware, pc.deletePost);


export default router; //commonJS => module.exports = router;