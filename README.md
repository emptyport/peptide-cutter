# Peptide Cutter
A library for *in silico* proteolytic digestion of proteins and peptides.

View on npm [here](https://www.npmjs.com/package/peptide-cutter).


## Installation
npm install peptide-cutter --save

## Usage
``` javascript
var peptideCutter = require('peptide-cutter');

var options = {
  'enzyme': 'trypsin',
  'num_missed_cleavages': 2,
  'min_length': 2,
  'max_length': 30
};

var cutter = new peptideCutter(options);

var peptides = cutter.cleave("KARATE");
```

## Tests
You can run `npm test` to run the tests after installing the development dependencies.

## Future functionality
There are currently no planned improvements to this module. I am open to suggestions so let me know if you think something is missing.

## License
This software is released under the MIT license
