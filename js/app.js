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

var Location = function(locationItem) {
    this.title = ko.observable(locationItem.title);
    this.location = ko.observable(locationItem.location);
    this.note = ko.observable(locationItem.note);
};


var ViewModel = function() {
    // Set self to this so we can access the this of the View Model Function while still accessing the this of a specific binding.
    var self = this;
    // Create an empty observable array to hold the locations
    self.locationList = ko.observableArray([]);

    // Loop over all locations and create an observable for each and add to array
    initialLocations.forEach(function(locationItem){
        self.locationList.push( new Location(locationItem));
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
            return Location.title().toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
        });
    });




};



ko.applyBindings(new ViewModel());
});