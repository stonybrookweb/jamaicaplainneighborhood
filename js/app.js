var initialLocations = [
    {
        title: 'Jamaica Pond',
        location: {
            lat: 42.317161,
            lng: -71.120342
        },
        note: 'nothing to see here'
    },
    {
        title: 'FoMu Premium Alternative Ice Cream',
        location: {
            lat: 42.314303,
            lng: -71.114265
        }
    },
    {
        title: 'JP Centre Yoga',
        location: {
            lat: 42.312448,
            lng: -71.113943
        }
    },
    {
        title: 'JP Boat House',
        location: {
            lat: 42.315776,
            lng: -71.117557
        }
    },
    {
        title: 'JP licks',
        location: {
            lat: 42.312878,
            lng: -71.114382
        }
    }
];


// Wrap functionality in jQuery ready function to make sure page is loaded before doing anything
$(document).ready(function(){

var Location = function(locationItem, id) {
    this.title = ko.observable(locationItem.title);
    this.location = ko.observable(locationItem.location);
    this.note = ko.observable(locationItem.note);
    this.id = id;
};


var ViewModel = function() {
    // Set self to this so we can access the this of the View Model Function while still accessing the this of a specific binding.
    var self = this;
    // Create an empty observable array to hold the locations
    self.locationList = ko.observableArray([]);

    // Loop over all locations and create an observable for each and add to array
    // Neat trick to get an index on an element using a for each loop instead of doing a for loop.
    // http://stackoverflow.com/questions/10179815/how-do-you-get-the-loop-counter-index-using-a-for-in-syntax-in-javascript
    // Need index so we can us that when we send a click to the google maps api
    initialLocations.forEach(function(locationItem, id){
        self.locationList.push( new Location(locationItem, id));
    });

    self.query = ko.observable('');

    // List filtering possible through help via forums especially this example by coach John Mav http://codepen.io/JohnMav/pen/OVEzWM
    // Other good helpful filtering references:
    //      http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.
    //      http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
    // Unable to find good documentation on arrayFilter which seems to be an internal utilitiy in Knockout that is accessbile for other uses.
    // It appears the arrayFilter takes two values, an array and a search value which can be a function.
    // The arrayFilter will go through each item in the array and return only those items that match.
    // Each search is completed using the indexOf Javascript function that returns -1 if the string is not found.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
    // TODO: Update data model and search to filter on categories
    self.search = ko.computed(function(){
        return ko.utils.arrayFilter(self.locationList(), function(Location){
            // console.log('query :' +self.query() + ' ' + Location.title().toLowerCase().indexOf(self.query().toLowerCase()));
            if(Location.title().toLowerCase().indexOf(self.query().toLowerCase()) >= 0){
                // https://developers.google.com/maps/documentation/javascript/markers#remove
                console.log('show this one: ' + Location.id);
                markers[Location.id].setMap(map);

            } else {
                console.log('hide this one: ' + Location.id);
                markers[Location.id].setMap(null);
            }
            return Location.title().toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
        });
    });

    // When a location in the list of locations is clicked we want the info window to show so we send a click
    self.mapClick = function(){
        google.maps.event.trigger(markers[this.id], 'click');
    }

};


var waitForMapLoad = setTimeout(function(){ko.applyBindings(new ViewModel());}, 300);

});