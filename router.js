Router.map(function(){
    // This routes the template to a specificed link
    this.route('home', {path: '/'} );
});


Router.route('/room/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'videoRoom', // This links to the template
  
  waitOn: function() {
        return Meteor.subscribe('room', this.params._id);
      },
      data: function() {
        return Rooms.findOne({_id: this.params._id})
      },
      
      fastRender: true,
});


Router.route('/add-room', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'addRoom', // This links to the template
  /*
  waitOn: function() {
        return Meteor.subscribe('room', this.params._id);
      },
      data: function() {
        return {
        room : Rooms.find()}
      },
      */
      
      fastRender: true,
});