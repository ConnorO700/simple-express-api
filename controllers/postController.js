let posts = [
	{ id: 0, title: "postZero" },
	{ id: 1, title: "postOne" },
	{ id: 2, title: "postTwo" },
	{ id: 3, title: "postThree" },
	{id: 4, title: "postFour"}
];

// @desc Get all posts
// @route GET /api/posts
const getPosts = (req, res, next) => {
	const dir = req.query.dir ?? "desc"
	let limit = parseInt(req.query.limit) ?? 500;
	if (isNaN(limit) || limit <= 0) limit = 500;
	if (dir === "desc") {
		return res.status(200)
			.json(posts.slice(0, limit));
	}
	res.status(200)
		.json(posts.slice(posts.length - limit, posts.length));
};

// @desc Create a post
// @route POST /api/posts
const createPost = (req, res, next) => {
	const newPost = req.body;
	if (!newPost) {
		const error = new Error("Missing request body, failed to update");
		error.status = 400;
		return next(error);
	}
	posts.push({ id: posts.length, ...newPost });
	const post = posts[posts.length - 1];
	res.status(201)
		.json(post);
};

// @desc Get post by id
// @route GET /api/posts/:id
const getPost = (req, res, next) => {
	const id = parseInt(req.params.id);
	const post = posts.find(p => p.id == id);
	if (!post) {
		const error = new Error(`A post with the id: ${id} was not found`);
		error.status = 404;
		return next(error);
	}
	res.status(200)
		.json(post);
};

// @desc Edit post by id
// @route PUT /api/posts/:id
const editPost = (req, res, next) => {
	const id = parseInt(req.params.id);
	const post = req.body;
	const postIndex = posts.findIndex(p => p.id === id)
	if (postIndex == -1) {
		const error = new Error(`Unable to update because post with id:${id} does not exist`);
		error.status = 404;
		return next(error);
	}
	posts[postIndex].title = post.title;
	res.status(200)
		.end();
};

// @desc Delete post by id
// @route DELETE /api/posts/:id
const deletePost = (req, res, next) => {
	const id = parseInt(req.params.id);
	const postIndex = posts.findIndex(p => p.id === id)
	if (postIndex == -1) {
		const error = new Error(`Unable to delete because post with id:${id} does not exist`);
		error.status = 404;
		return next(error);
	}
	posts.splice(postIndex, 1);
	res.status(200)
		.end();
};

const postController = {
	getPost: (req, res, next) => getPost(req, res, next),
	getPosts: (req, res, next) => getPosts(req, res, next),
	createPost: (req, res, next) => createPost(req, res, next),
	editPost: (req, res, next) => editPost(req, res, next),
	deletePost: (req, res, next) => deletePost(req, res, next),
}

export default postController;