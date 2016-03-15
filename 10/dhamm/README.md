# Coding Challenge #10

**Markov chains** are probabilistic state graphs that attempt to provide a better model for state transitions than purely random selection.

They can be initialized with a set of input relationships, each consisting of a start state, an end state, and a probability. For a short example, let's look at this input:

> A rabbi, a priest, and a Scientologist walk into a bar.

Our Markov chain would look something like this:

```js
{
	'A':             {'rabbi':  1.00},
	'rabbi':         {',':      1.00},
	',':             {'a':      0.50, 'and': 0.50},
	'a':             {'priest': 0.33, 'bar': 0.33, 'Scientologist': 0.33},
	'priest':        {',':      1.00},
	'and':           {'a':      1.00},
	'Scientologist': {'walk':   1.00},
	'walk':          {'into':   1.00},
	'into':          {'a':      1.00},
	'bar':           {'.':      1.00},
	'.':             {'[END]':  1.00}
}
```

Executing this Markov chain would give us results like these:

> A rabbi, a priest, and a Scientologist walk into a bar.

> A rabbi, and a bar.

> A rabbi, a bar, and a Scientologist walk into a priest, and a bar.

This is with a naive Markov chain that only has one point of context, using the current word to predict the next - you could achieve more realistic language by taking into account the prior word (or words) as well.

For more information, check out [this page](http://setosa.io/ev/markov-chains/) which has some great visualizations.

### Goal

For this challenge, you'll be building a Markov chain using input from Wikipedia articles, executing it, and displaying the output.

The `addArticle()` function fetches the article, strips the HTML, and tokenizes its contents before calling `addToMarkovChain()`, which you will need to implement.

Have some fun with article selection - who knows, maybe "Adolf Hitler" and "Teletubbies" might make a good mashup.

How you display the results is up to you. Feel free to make any modifications to the existing code.