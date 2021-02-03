import location, { message, name, getGreeting } from "./myModule";
import add, { subtract } from "./math";

console.log(getGreeting("Nick"));
console.log(message, name, location);
console.log(add(1, 2));
console.log(subtract(2, 1));
