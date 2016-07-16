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
    this.locationList = ko.observableArray([]);

    // Loop over all locations and create an observable for each and add to array
    initialLocations.forEach(function(locationItem){
        self.locationList.push( new Location(locationItem));
    });

    this.searchValue = ko.observable('');

    this.searchArray = ko.computed(function() {




        if(self.searchValue() !== '') {
           // get search value and set to lowercase for future search use
            var filter = self.searchValue().toLowerCase();
            console.log('filter: ' + filter);
            return self.locationList();
        } else {
            return ko.utils.arrayFilter(self.locationList(), function(prod) {
                return prod.genre == self.searchValue();
            });
        }


    });


};



ko.applyBindings(new ViewModel());
});