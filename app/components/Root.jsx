import React from 'react'
import axios from 'axios'
const sentiment = require('sentiment');

export default class Data extends React.Component {

	constructor() {
		super()

		this.state = {
			products: [],
			reviews: []
		}

		this.getPositive = this.getPositive.bind(this);
		this.getNegative = this.getNegative.bind(this);
		this.getRecent = this.getRecent.bind(this);
	}
	
	componentDidMount() {
		axios.get('/api/products')
		.then(response => response.data)
		.then(products => {
			this.setState({products: products});
		});
	}

	getPositive() {
		axios.get('/api/reviews/positive')
		.then(response => response.data)
		.then(reviews => {
			this.setState({reviews: reviews});
		})
	}

	getRecent() {
		axios.get('/api/reviews/recent')
		.then(response => response.data)
		.then(reviews => {
			this.setState({reviews: reviews});
		})
	}

	getNegative() {
		axios.get('/api/reviews/negative')
		.then(response => response.data)
		.then(reviews => {
			this.setState({reviews: reviews});
		})
	}

	render() {

		return (
			<div> 
				{
				this.state.products.map((product, idx) => {
					return (<table key={idx}>
						<tbody>
					  <tr>
					    <th>image</th>
					    <th>name</th> 
					    <th>description</th> 
					  </tr>
					  <tr>
					    <td><img src={product.imUrl}></img></td>
					    <td>{product.title}</td> 
					    <td>{product.description}</td> 
					  </tr>
					  </tbody>
					</table>
				)})
				}

				<button onClick={this.getRecent}>All Reviews</button>
				<button onClick={this.getPositive}>Most Positive Reviews</button>
				<button onClick={this.getNegative}>Most Negative Reviews</button>

				<table>
						<tbody>
					  <tr>
					    <th>reviewerName</th>
					    <th>link</th> 
					    <th>reviewText</th>
					    <th>overall</th>
					    <th>score</th>
					    <th>keywords</th>
					  </tr>
				{ 

				this.state.reviews.map((review, idx) => {
					// let result = sentiment(review.reviewText);

					return (
					  <tr key={idx}>
					    <td>{review.reviewerName}</td>
					    <td><a href={review.link}>Link</a></td> 
					    <td>{review.reviewText}</td> 
					    <td>{review.overall}</td> 
					    <td>{review.score}</td> 
					    <td>{review.words}</td>
					  </tr>
				)})
				}
				</tbody>
				</table>
			</div>
		)
	}

}