let weekdays=[];
weekdays.push("Thursday", "Friday");
weekdays.unshift("Monday","Tuesday");
// weekdays.splice(1,2,"martes");
weekdays[0] = weekdays[weekdays.length-1];

console.log(weekdays[0], weekdays[1], weekdays[2], weekdays[3]);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1));
         [ array[i], array[j] ] = [ array[j], array[i] ];
     }
}

// let shuffledArray = weekdays.shuffle(weekdays);

for(let i = 0; i < weekdays.length; i++) {
    console.log(weekdays[i]);
}