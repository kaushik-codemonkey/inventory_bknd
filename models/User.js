const mongoose = require("mongoose");
const { boolean } = require("@hapi/joi");
const userSchema = mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      max: 255,
    },
    password: { type: String, required: true, min: 6 },
    date: {
      type: Date,
      default: Date.now,
    },
    loggedin: {
      type: Boolean,
      default: false,
    },
  },
  items: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      priceforone: {
        type: Number,
      },
      checked: {
        type: Boolean,
        default: true,
      },
      category: [],
      dateofpurchase: {
        type: Date,
        default: Date.now,
      },
      dateofcheckout: {
        type: Date,
      },
    },
  ],
});
module.exports = mongoose.model("Users", userSchema);
// the mongoose.model - creates/ uses the collection - hence it is dependent on the collection name
