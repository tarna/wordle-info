# wordle-info
TypeScript library for fetching Wordle game info.

## Installation
Install wordle-info with [NPM](https://npmjs.com)

```bash
  npm install wordle-info
```

## Basic Usage
```ts
import wordle from 'wordle-info';

async function main() {
    const word1 = await wordle.getDay(1);
    console.log(word1);

    const word2 = await wordle.getDay(new Date(2024, 10, 3));
    console.log(word2);
}

main();
```

For more examples, visit [example.ts](https://github.com/tarna/wordle-info/blob/master/src/example.ts).

## Contributing
Contributions are always welcome!

See [contributing.md](CONTRIBUTING.md) for ways to get started.

## License
[MIT](https://choosealicense.com/licenses/mit)

## Contributors
- [@tarna](https://www.github.com/tarna)