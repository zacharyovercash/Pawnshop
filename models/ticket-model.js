const mongoose= require('mongoose');
const Schema= mongoose.Schema;

var TicketSchema= mongoose.Schema({
  TicketID:Number,
  username:String,
  First_Name:String,
  Last_Name:String,
  First_Item:String,
  DateDue:String,
  TotalCost:Number

});

var Ticket=mongoose.model('ticket',TicketSchema);

module.exports= Ticket;
