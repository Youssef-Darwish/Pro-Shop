const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const log4js = require("log4js");
const logger = log4js.getLogger("productController.js");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  logger.debug(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    logger.debug(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
    res.json(product);
  } else {
    res.status(404);
    logger.error(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product by id
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    logger.debug(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    logger.error(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
    throw new Error("Product not found");
  }
});
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  logger.debug(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
  res.status(201).json(createdProduct);
});
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.image = image;
    product.brand = brand;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    logger.debug(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
    res.json(updateProduct);
  } else {
    res.status(404);
    logger.error(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   Post /api/products/:id'/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id
    );
    if (alreadyReviewed) {
      res.status(400);
      logger.error(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    logger.debug(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    logger.error(`${req.method} ${req.originalUrl}  ${res.statusCode}`);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
};
