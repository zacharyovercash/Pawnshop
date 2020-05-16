const mongoose= require('mongoose');
const Schema= mongoose.Schema;

var ItemSchema= mongoose.Schema({
  TicketID:Number,
  Item:String,
  Quanity:Number,
  CostPer:Number,
});

var Item=mongoose.model('Item',ItemSchema);

module.exports = Item;
