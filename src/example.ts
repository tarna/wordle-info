import wordle from '.';

(async function() {
    const word1 = await wordle.getDay(1);
    console.log(word1);

    const word2 = await wordle.getDay(new Date(2024, 10, 3));
    console.log(word2);
})();