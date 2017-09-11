'use strict'
const api = require('express').Router()
const db = require('../models')

const Review = db.models.review;
const Product = db.models.product;

api.route('/products')
	// load all data
	.get(function(req, res) {
		Product.findAll()
		.then(products => res.status(200).json(products));
	});

// api.route('/reviews')
// 	// load all data
// 	.get(function(req, res) {
// 		Review.findAll()
// 		.then(reviews => res.status(200).json(reviews));
// 	});

api.route('/reviews/positive')
	// load all data
	.get(function(req, res) {
		Review.nMostPositive('616719923X')
		.then(reviews => res.status(200).json(reviews));
	});

api.route('/reviews/negative')
	// load all data
	.get(function(req, res) {
		Review.nMostNegative('616719923X')
		.then(reviews => res.status(200).json(reviews));
	});

api.route('/reviews/recent')
	// load all data
	.get(function(req, res) {
		Review.nMostRecent('616719923X')
		.then(reviews => res.status(200).json(reviews));
	});

module.exports = api;