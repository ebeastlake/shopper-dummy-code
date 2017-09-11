const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/shopper')
const sentiment = require('sentiment');

// models here

const Review = db.define('review', {
  reviewerID: {
    type: Sequelize.STRING
  },
  asin: {
    type: Sequelize.STRING
  },
  reviewerName: {
    type: Sequelize.STRING
  },
  helpful: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  reviewText: {
    type: Sequelize.TEXT
  }, 
  overall: {
    type: Sequelize.FLOAT
  }, 
  summary: {
    type: Sequelize.TEXT
  }, 
  unixReviewTime: {
    type: Sequelize.BIGINT
  }, 
  reviewTime: {
    type: Sequelize.TEXT
  }, 
  score: {
    type: Sequelize.INTEGER
  },
  words: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
}, {
  getterMethods: {
    link: function() {
      return 'https://www.amazon.com/dp/' + this.asin;
    }
    // ,
    // sentiment: function() {
    //   return sentiment(this.reviewText);
    // }
  }, 
  hooks: {
    beforeCreate: (review, options) => {
      let data = sentiment(review.reviewText);
      console.log(sentiment);
      review.score = data.score;
      review.words = data.words;
    }
  }
});

const Product = db.define('product', {
  asin: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  }, 
  description: {
    type: Sequelize.TEXT, 
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  },
  imUrl: {
    type: Sequelize.TEXT
  }
  // , 
  // salesRank: {
  //   type: Sequelize.FLOAT
  // }, 
  // categories: {
  //   type: Sequelize.TEXT
  // }
});

const Related = db.define('related', {
  also_bought: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  also_viewed: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
});

// associations below
Product.belongsTo(Related);

Review.nMostPositive = function(asin) {
  const n = 10;
  return Review.findAll({where: {asin: asin}, order: [['score', 'DESC']], limit: n});
}

Review.nMostNegative = function(asin) {
  const n = 10;
  return Review.findAll({where: {asin: asin}, order: [['score', 'ASC']], limit: n});
}

Review.nMostRecent = function(asin) {
  const n = 10;
  return Review.findAll({where: {asin: asin}, order: [['unixReviewTime', 'DESC']], limit: n});
}

module.exports = db;