var peptide_cutter = require('./index');

var cut = new peptide_cutter({
    'enzyme': 'lysc',
    'num_missed_cleavages': 2,
    'min_length': 10
});
console.log(cut);

cut.cleave("PEPTIDEKYSSTRGGADEKKLYNM");
