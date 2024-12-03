module.exports = returnString;

var random = require("random-number-in-range");

var quotes = ["Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.",
"Listen, Morty, I hate to break it to you but what people call love is just a chemical reaction that compels animals to breed. It hits hard, Morty, then it slowly fades, leaving you stranded in a failing marriage. I did it. Your parents are gonna do it. Break the cycle, Morty. Rise above. Focus on science.",
"Weddings are basically funerals with cake.","All right, all right, cool it! I see what's happening here. You're both young, you're both unsure about your place in the universe, and you both want to be Grandpa's favorite. I can fix this. Morty, sit here. Summer, you sit here. Now, listen—I know the two of you are very different from each other in a lot of ways, but you have to understand that as far as Grandpa's concerned, you're both pieces of shit! Yeah. I can prove it mathematically. Actually, l-l-let me grab my whiteboard. This has been a long time coming, anyways",
"It's like the N word and the C word had a baby and it was raised by all the bad words for Jews.","What about the reality where Hitler cured cancer, Morty? The answer is: Don't think about it.",
"You're young, you have your whole life ahead of you, and your anal cavity is still taut yet malleable.","He's not a hot girl. He can't just bail on his life and set up shop in someone else's.",
"I turned myself into a pickle. I'm Pickle Riiiiick!","The universe is basically an animal. It grazes on the ordinary. It creates infinite idiots just to eat them. Smart people get a chance to climb on top, take reality for a ride, but it will never stop trying to throw you and eventually it will, there’s no other way off."];


function returnString() {
	var integer = random(0, quotes.length - 1);
	var string = quotes[integer];
	return string;
}