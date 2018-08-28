var peptide_cutter = require('./index');

var cut = new peptide_cutter({
    'enzyme': 'arg-c',
    'num_missed_cleavages': 0,
    'min_length': 4,
    'max_length': 30
});
console.log(cut);

var peptides = cut.cleave("ARGININE");
for(var i=0; i<peptides.length; i++) {
    console.log(peptides[i]);
}

let missed = new peptide_cutter({
    'enzyme': 'lysc',
    'min_length': 2,
    'num_missed_cleavages': 2
  });
  peptides = missed.cleave('AKGKYK');
  console.log(peptides);
