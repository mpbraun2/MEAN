function fib() {
  var previous = 0
  var current = 1
  function nacci() {
    z=previous+current;
    console.log(z);
    previous =current;
    current = z;
  }
  return nacci
}
var fibCounter = fib();
fibCounter() // should console.log "1"
fibCounter() // should console.log "1"
fibCounter() // should console.log "2"
fibCounter() // should console.log "3"
fibCounter() // should console.log "5"
fibCounter() // should console.log "8"
fibCounter()
fibCounter()
fibCounter()
fibCounter()