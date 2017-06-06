function VehicleConstructor(name, wheels, passengers){
    var vehicle = {};

    vehicle.name = name;
    vehicle.wheels = wheels;
    vehicle.passengers = passengers;

    vehicle.makeNoise = function (){
        console.log("Making Noise");
    }

    return vehicle;
}

var Bike = VehicleConstructor("Bike", 2, 1);
Bike.makeNoise = function(){
    console.log("ring ring!");
}
Bike.makeNoise();


var Sedan = VehicleConstructor("Sedan", 4, 4);
Sedan.makeNoise = function(){
    console.log('honk, honk');
}
Sedan.makeNoise();

var Bus = VehicleConstructor("Bus", 4, 1);
Bus.pickUpPassengers = function(passengers){
    Bus.passengers += passengers;
}
console.log(Bus.passengers);
Bus.pickUpPassengers(14);
console.log(Bus.passengers);