function personConstructor(name){
    var person = {};
        person= {
            name: name,
            distance_traveled: 0
    }
function say_name(){
    console.log(person.name);
say_name();
}
function say_something(param){
    console.log(person.name + ' says ' + param);
}
say_something("I am cool")
function walk(){
    console.log(person.name + " is walking");
    person.distance_traveled +=3;
    console.log(person.distance_traveled + ' miles traveled!');
}
walk();
function run(){
    console.log(person.name + " is running");
    person.distance_traveled +=10;
    console.log(person.distance_traveled + ' miles traveled!');
}
run();
function crawl(){
    console.log(person.name + ' is crawling');
    person.distance_traveled +=1;
    console.log(person.distance_traveled + ' miles traveled!');
}
crawl();
}
personConstructor("Bozo");


function ninjaConstructor(name, cohort){
    var belt = ["yellow", "green", "red", "black"];
    var ninja = {};
    ninja = {
        name: name,
        cohort: cohort,
        belt_level: 0
    }
    console.log("Name?", ninja.name, "Cohort?", ninja.cohort, "Belt Level?", ninja.belt_level)
    function levelUp(){
        if (ninja.belt_level < 2){
        ninja.belt_level += 1;
        ninja.belt = belt[ninja.belt_level];
        }
    return ninja
    }
}
ninjaConstructor("Maxwell", "Javascript");