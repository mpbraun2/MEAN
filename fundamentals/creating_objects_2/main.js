function VehicleConstructor(name, wheels, passengers, speed){
//private variable
if (!(this instanceof VehicleConstructor)){   //this is protection code to ensure that we added "new" to the last Vehicle Constructor on line 30
  return new VehicleConstructor(name, wheels, passengers, speed);
}

var self = this;
var distance_travelled = 0;
//private methods
function updateDistanceTravelled(){
  distance_travelled += self.speed;  //this.speed does not match the this.speed in the public object, so we add var self = this;
}

    this.name = name || "unicycle";
    this.wheels = wheels || 1;
    this.passengers = passengers || 0;
    this.speed = speed || 0;

    this.makeNoise = function (){
        console.log("Making Noise");
    }
    this.move = function(){
      updateDistanceTravelled();
      this.makeNoise();
    }
    this.checkMiles = function(){
      return distance_travelled;
    }
}
var bus = new VehicleConstructor('bus', 8, 35, 60); // always add new keyword to constructor. Otherwise will print global variable.
console.log(bus.checkMiles());
bus.move();
console.log(bus.checkMiles());