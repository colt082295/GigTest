Rooms = new Meteor.Collection('rooms');
Categories = new Meteor.Collection('categories');






if (Meteor.isClient) {
  
  
   Template.home.helpers({
    rooms: function () {
        Meteor.subscribe('rooms');
        return Rooms.find({});
        
      },
    
     });



  Template.nav.onRendered(function() {
    
        $(document).foundation();
        
        
    });
    
    
    Template.videoRoom.onDestroyed(function() {
        
        
        videojs("video").dispose();
        console.log("Destroyed");
        
        
        
    })
    
    
    Template.videoRoom.onRendered(function() {
    
                      //videojs("video").ready(function(){
                      var player = videojs("video").ready(function(){
                          //var player = videojs('video', {  }, function() {
                          console.log('Good to go!');
                          
                          /*
                          
                          I have to figure out a way to pass the correct port for the video to the video player on the page.
                          
                          */
                          this.bigPlayButton.hide();
                          this.loadingSpinner.show();
                          
                          
                          // find out way to get loading spinner to show up so user knows something is happening.
                          
                          
                          //this.duration(result.duration);
                          
                          // {"type":"application/x-mpegURL", "src":"http://167.114.103.80:2347/stream/stream.m3u8"},
                          //this.src({"type":"video/webm", "src":"http://167.114.103.80:"+result.port});
                          //this.duration(result.duration);
                          this.load();
                          //this.play();
                          
                          // The duration gets screwed up for some reason, but if i pause the video once the page loads, the duration is right. Why?
                          
                          
                          
                        
                          //this.play(); // if you don't trust autoplay for some reason
                          //this.duration(result.duration);
                          
                          this.on("play", function(){
        //this.duration(result.duration);
        this.loadingSpinner.hide();
        //this.controlBar.show();

      });
      
      /*
                     this.on("loadeddata", function(){ // is this an actual event?
        this.duration(result.duration);
        this.play();
        this.loadingSpinner.hide();
        //this.controlBar.show();

      });
      */
      
                     this.on("loadedmetadata", function(){ // is this an actual event?
                     
        //this.duration(result.duration);
        //this.play();
        this.loadingSpinner.hide();
        this.bigPlayButton.show();
        //this.controlBar.show();
                     

      });
    
                      });
                
                
            
    });
    
    
    
    
    Template.addRoom.events({

        'click #submit': function(event, template) {
            event.preventDefault();
            /*
            notifications.on('message', function(message) {
                console.log(message);
            });
            */
            
            var roomName = $('#room_name').val();
            var roomDescription = $('#room_description').val();

                Meteor.call('addRoom', roomName, roomDescription, function(error, result) { // Try to guess the title from the filename

                    if (error) {

                        console.log("Error adding room!");

                    }
                    else {

                        //console.log(result);
                        Router.go("home");


                    }

                });




        },
        
    });
    
    
        Template.videoRoom.events({
          
          'click #submit_youtube': function(event, template) {
            event.preventDefault();
          console.log($('#youtube_link').val());
        // THIS WON'T WORK FOR WHATEVER REASON. CHECK THE GIGS PROJECT TO SEE HOW IT WORKS IN THERE. IT'S SIMPLY NOT CAPTURING THE CLICK EVENT.



        },

        'click #remove_room': function(event, template) {
            event.preventDefault();
            /*
            notifications.on('message', function(message) {
                console.log(message);
            });
            */
            
            var id = this._id;

                Meteor.call('removeRoom', id, function(error, result) { // Try to guess the title from the filename

                    if (error) {

                        console.log("Error removing room!");

                    }
                    else {

                        console.log("Removed "+id);
                        Router.go("home");


                    }

                });




        },
        
        
        /*
        
        'submit #youtube_form': function(event, template) {
            event.preventDefault();
            
            notifications.on('message', function(message) {
                console.log(message);
            });
            
            
            var link = $('#youtube_link').val();
            
            
            console.log(link);



        },
        */
        
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                  
  
  
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
   
   
   
   
   
  });
  
  
  
    Meteor.publish('rooms', function() {
        //this.unblock();
        return Rooms.find({});
    });
  
  
  Meteor.publish('room', function(id) {
        //this.unblock();
        return Rooms.find({
            _id: id
        });
    });
    
    
    
    Meteor.methods({
    
    
    addRoom: function(roomName, roomDescription) {
                
                
                Rooms.insert({
                  roomName: roomName,
                  roomDescription: roomDescription,
                  queue: [],
                });
                
            },
            
            
    removeRoom: function(id) {
                
                
                Rooms.remove({_id: id});
                
            },
    
    });
  
  
}
