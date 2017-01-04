let db = require('../../db');
let uuid = require('uuid');
var userModel = require('./user.js');

//////// FAKE DATA //////////////////////
var data = [
  {
    coupon_id: 1,
    title: '$20 off socks',
    image: '../../assets/img/socks.png',
    item_name: 'Socks',
    original_price: 10,
    coupon_price: 5,
    coupon_savings: 5,
    start_at: 'start_date',
    end_at: 'end_date',
    created_at: 'created_at_date',
  },
  {
    coupon_id: 2,
    title: '$5 off socks',
    image: '../../assets/img/socks.png',
    item_name: 'Socks',
    original_price: 10,
    coupon_price: 5,
    coupon_savings: 5,
    start_at: 'start_date',
    end_at: 'end_date',
    created_at: 'created_at_date',
  },
  {
    coupon_id: 3,
    title: '$5 off socks',
    image: '../../assets/img/socks.png',
    item_name: 'Socks',
    original_price: 10,
    coupon_price: 5,
    coupon_savings: 5,
    start_at: 'start_date',
    end_at: 'end_date',
    created_at: 'created_at_date',
  }
];

var userData = [
  {
    email: 'fleckblake@gmail.com',
    password: 'Packer123',
    first_name: 'Blake',
    last_name: 'Fleck',
    dob: '1990-04-24 12:00:00',
    gender: 'm',
    total_savings: 100
},
  {
    email: 'gujames@gmail.com',
    password: 'DTownBoogie',
    first_name: 'James',
    last_name: 'Gu',
    dob: '1993-05-21 12:00:00',
    gender: 'm',
    total_savings: 50
  },
  {
    email: 'pengjosh@gmail.com',
    password: 'Beacon',
    first_name: 'Josh',
    last_name: 'Peng',
    dob: '1985-10-20 12:00:00',
    gender: 'm',
    total_savings: 75
  },
  {
    email: 'HongSusan@gmail.com',
    password: 'Password123',
    first_name: 'Susan',
    last_name: 'Hong',
    dob: '1994-08-19 12:00:00',
    gender: 'f',
    total_savings: 5000
  }
]

// GET request for /user
// retrieve all users (array of user objects)
exports.retrieveUsers = (req, res) => {
  userModel.retrieveUsersAsync()
  .then(users => {
    res.status(200).json(users);
  })
  .catch((err) => {
    res.status(404).send('could not find any users in user table');
  })};

// POST request for /user
// find or create a new user in user model
exports.createUser = (req, res) => {
  // var params = [req.body.email, req.body.password, req.body.first_name, req.body.last_name, req.body.dob, req.body.gender];
  var params = {
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dob: req.body.dob,
    gender: req.body.gender
  };
  userModel.createUserAsync(params)
  .then(user => {
    res.status(201).json(user);
    // res.sendStatus(201);
  })
  .catch((err) => {
    res.status(400).send('create post error from server');
  });
};


// GET request for /user/:user_id
// retrieve one user with a specific user_id
exports.retrieveOneUser = (req, res) => {
  var params = [req.params.user_id];
  userModel.retrieveOneUserAsync(params)
  .then(user => {
    res.status(200).json(user);
  })
  .catch((err) => {
    res.status(404).send('could not find user with user_id=' +req.params.user_id+ ' in user table');
  })
}

// GET request for /user/coupon
// retrieve all user coupons that have previously been sent to a specific user
// coupons must have matching user_id
exports.retrieveUserCoupons = (req, res) => {
  var params = { user_id: req.body.user_id };
  userModel.retrieveUserCouponsAsync(params)
  .then((coupons) => {
    console.log('successfully retrieved all user coupons');
    res.status(200).json(coupons);
  }).catch((err) => {
    console.log('could not find any entries in user_coupon_table')
    res.status(404).send('could not find any entries in user_coupon table');
  });
};

// POST request for /user/coupon
// check to see if newly created coupons are ready to be sent out to users
// if there are user coupons available, creates a new entry in user_coupon table
// coupons must have matching beacon_id and created_at
exports.sendUserCoupons = (req, res) => {
  var params = { created_at: req.body.created_at, beacon_id: req.body.beacon_id };
  userModel.sendUserCouponsAsync(params)
  .then((coupons) => {
    console.log('successfully found entries in user_coupon table')
    res.status(200).json(coupons);
  }).catch((err) => {
    console.log('could not find any entries in user_coupon table');
    res.status(404).send('could not find any entries in user_coupon table');
  });
};

// GET request for /user/coupon/:coupon_id
// retrieve a specific user coupon with coupon_id
exports.retrieveOneUserCoupon = (req, res) => {
  var params = { coupon_id: req.params.coupon_id };
  userModel.retrieveOneUserCouponAsync(params)
  .then((coupon) => {
    console.log('successfully retrieved a specific user coupon with a specific coupon_id', req.params.coupon_id);
    res.status(200).json(coupon);
  }).catch((err) => {
    console.log('could not find a specific user coupon with a specific coupon_id', req.params.coupon_id);
    res.status(404).send('could not find a specific user coupon with a specific coupon_id', req.params.coupon_id);
  });
};

// POST request for /user/coupon/:coupon_id
// create a user coupon with coupon_id by adding a new entry in
// user_coupon table and coupon table
exports.createUserCoupon = (req, res) => {
  var params = { user_id: req.body.user_id, coupon_id: req.params.coupon_id, used: req.body.used, req.body.expired: expired };
  userModel.createUserCouponAsync(params)
  .then((coupon) => {
    console.log('successfully created a specific user coupon with coupon_id', req.params.coupon_id);
    res.status(201).json(coupon);
  }).catch((err) => {
    console.log('could not create a specific user coupon with coupon_id', req.params.coupon_id);
    res.status(400).send('could not create a specific user coupon', req.params.coupon_id);
  });
};

// PUT request for /user/coupon/:coupon_id
// update/modify an existing user coupon with coupon_id
exports.useUserCoupon = (req, res) => {
  var params = { coupon_id: req.params.coupon_id };
  userModel.useUserCouponAsync(params)
  .then((coupon) => {
    console.log('successfully used a specific user coupon with coupon_id', req.params.coupon_id);
    res.status(200).json(coupon);
  }).catch((err) => {
    console.log('could not use specific user coupon with coupon_id', req.params.coupon_id);
    res.status(400).send('could not use specific user coupon with coupon_id', req.params.coupon_id);
  });
};