// if(Meteor.isClient) {
//   Meteor.startup(function() {
//     Meteor.subscribe('companys');
//   });
// }

if (Meteor.isClient) {
  Meteor.subscribe('stocks_db');
  Meteor.subscribe('events_db');
  Meteor.subscribe('topics_db');
  Meteor.subscribe('companys_db');
}