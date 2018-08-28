# Peptide Cutter

[![Build Status](https://travis-ci.org/emptyport/peptide-cutter.svg?branch=master)](https://travis-ci.org/emptyport/peptide-cutter)
[![codecov](https://codecov.io/gh/emptyport/peptide-cutter/branch/master/graph/badge.svg)](https://codecov.io/gh/emptyport/peptide-cutter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A library for *in silico* proteolytic digestion of proteins and peptides.

View on npm [here](https://www.npmjs.com/package/peptide-cutter).


## Installation
npm install peptide-cutter --save

> **PLEASE NOTE**
>
> This module relies on positive lookbehind regex and thus can only be run with newer versions of JavaScript. You may need to use the ```--harmony``` argument with node in order to use this module.

> **Also note**
>
> v2.x.x introduces breaking changes from v1.x.x in the return format

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

Return format:
```javascript
[ { sequence: 'KAR', start: 0, end: 2, missed: 1 },
  { sequence: 'KARATE', start: 0, end: 5, missed: 2 },
  { sequence: 'AR', start: 1, end: 2, missed: 0 },
  { sequence: 'ARATE', start: 1, end: 5, missed: 1 },
  { sequence: 'ATE', start: 3, end: 5, missed: 0 } ]
```
* `sequence` is the digested fragment
* `start` is the 0-based index of where in the original sequence the fragment can be found
* `end` is the 0-based index of where in the original sequence the fragment ends (this value is inclusive)
* `missed` is the number of missed cleavages found in this particular fragment.

## About
The regex for the cleavage sites was ~~stolen~~ borrowed from the [Pyteomics](https://pypi.python.org/pypi/pyteomics) package which in turn comes from the [Expasy PeptideCutter](https://web.expasy.org/peptide_cutter/).

### Available enzymes
* arg-c
* asp-n
* bnps-skatole
* caspase 1-10
* chymotrypsin high specificity
* chymotrypsin low specificity
* clostripain
* cnbr
* enterokinase
* factor xa
* formic acid
* glutamyl endopeptidase
* granzyme b
* hydroxylamine
* iodosobenzoic acid
* lysc
* ntcb
* pepsin ph1.3
* pepsin ph2.0
* proline endopeptidase
* proteinase k
* staphylococcal peptidase i
* thermolysin
* thrombin
* trypsin

The available enzymes and their corresponding regex are also found in ```expasy_rules.json```


## Tests
You can run `npm test` to run the tests after installing the development dependencies. There are basic tests to make sure all the enzymes will cleave proteins, but I cannot guarantee their completeness.

## Future functionality
There are currently no planned improvements to this module. I am open to suggestions so let me know if you think something is missing.

## License
This software is released under the MIT license

## Support this project!

[![Support this project on Patreon!](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/MikeTheBiochem)
