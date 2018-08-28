var peptideCutter = require('../index');
let test = require('tape');

const interleukinBeta = "MAEVPELASEMMAYYSGNEDDLFFEADGPKQMKCSFQDLDLCPLDGGIQLRISDHHYSKGFRQAASVVVAMDKLRKMLVPCPQTFQENDLSTFFPFIFEEEPIFFDTWDNEAYVHDAPVRSLNCTLRDSQQKSLVMSGPYELKALHLQGQDMEQQVVFSMSFVQGEESNDKIPVALGLKEKNLYLSCVLKDDKPTLQLESVDPKNYPKKKMEKRFVFNKIEINNKLEFESAQFPNWYISTSQAENMPVFLGGTKGGQDITDFTMQFVSS";

test('Default Values', function(t) {
  let defaultValues = new peptideCutter();
  let regex = new RegExp("([KR](?=[^P]))|((?<=W)K(?=P))|((?<=M)R(?=P))", "g");

  t.equal(defaultValues.enzyme, 'trypsin', 'enzyme is trypsin');
  t.equal(defaultValues.num_missed_cleavages, 0, 'missed cleavages is 0');
  t.equal(defaultValues.min_length, 8, 'min length is 8');
  t.equal(defaultValues.max_length, 30, 'max length is 30');
  t.equal(defaultValues.regex.toString(), regex.toString(), 'regex should be for trypsin');

  t.end();
});

test('Setting Values', function(t) {
  let passedValues = new peptideCutter({
    'enzyme': 'lysc',
    'num_missed_cleavages': 2,
    'min_length': 6,
    'max_length': 24
  });
  let regex = new RegExp("K", "g");

  t.equal(passedValues.enzyme, 'lysc', 'enzyme is lysc');
  t.equal(passedValues.num_missed_cleavages, 2, 'missed cleavages is 2');
  t.equal(passedValues.min_length, 6, 'min length is 6');
  t.equal(passedValues.max_length, 24, 'max length is 24');
  t.equal(passedValues.regex.toString(), regex.toString(), 'regex should be for lysc');

  t.end();
});

test('Setting invalid values', function(t) {
  let cutter = new peptideCutter({
    'enzyme': 'scooby doo',
    'num_missed_cleavages': -1,
    'min_length': 23,
    'max_length': 2
  });

  t.equal(cutter.enzyme, 'trypsin', 'Enzyme defaults to trypsin');
  t.equal(cutter.num_missed_cleavages, 0, 'Missed cleavages set to 0');
  t.equal(cutter.min_length, 8, 'Min length set to 8');
  t.equal(cutter.max_length, 30, 'Max length set to 30');
  t.end();
});

test('Enzymes cleaving correctly', function(t) {
  let peptides = testEnzyme('arg-c', 5, 'ARGININE');
  t.equal(peptides[0].sequence, 'GININE', 'arg-c works');

  peptides = testEnzyme('asp-n', 6, 'MYPEPTIDE');
  t.equal(peptides[0].sequence, 'MYPEPTI', 'asp-n works');

  peptides = testEnzyme('bnps-skatole', 8, 'VERYDIRTYWATER');
  t.equal(peptides[0].sequence, 'VERYDIRTYW', 'bnps-skatole works');

  peptides = testEnzyme('caspase 1', 8, interleukinBeta);
  t.equal(peptides.length, 1, 'correct number of peptides for caspase 1');
  t.equal(peptides[0].sequence, 'MAEVPELASEMMAYYSGNEDDLFFEAD', 'caspase 1 works');

  peptides = testEnzyme('caspase 2', 8, 'PEPTIDEDVADYTRRHL');
  t.equal(peptides[0].sequence, 'PEPTIDEDVAD', 'caspase 2 works');

  peptides = testEnzyme('caspase 3', 8, 'PEPTIDEDMQDYTRRHL');
  t.equal(peptides[0].sequence, 'PEPTIDEDMQD', 'caspase 3 works');

  peptides = testEnzyme('caspase 4', 8, 'PEPTIDELEHDAYTRRHL');
  t.equal(peptides[0].sequence, 'PEPTIDELEHD', 'caspase 4 works');

  peptides = testEnzyme('caspase 5', 8, 'PEPTIDELEHDAYTRRHL');
  t.equal(peptides[0].sequence, 'PEPTIDELEHD', 'caspase 5 works');

  peptides = testEnzyme('caspase 6', 8, 'PEPTIDEVEIDAYTRRHL');
  t.equal(peptides[0].sequence, 'PEPTIDEVEID', 'caspase 6 works');

  peptides = testEnzyme('caspase 7', 8, 'PEPTIDEDEVDAYTRRHL');
  t.equal(peptides[0].sequence, 'PEPTIDEDEVD', 'caspase 7 works');

  peptides = testEnzyme('caspase 8', 8, 'PEPTIDEIETDAYTRRHL');
  t.equal(peptides[0].sequence, 'PEPTIDEIETD', 'caspase 8 works');

  peptides = testEnzyme('caspase 9', 8, 'PEPTIDELEHDAYTRRHL');
  t.equal(peptides[0].sequence, 'PEPTIDELEHD', 'caspase 9 works');

  peptides = testEnzyme('caspase 10', 8, 'PEPTIDEIEADAYTRRHL');
  t.equal(peptides[0].sequence, 'PEPTIDEIEAD', 'caspase 10 works');

  peptides = testEnzyme('chymotrypsin high specificity', 8, 'PEPTIDEFAPEPTIDEMAPEPTIDEFPEPTIDE');
  t.equal(peptides.length, 2, 'chymotrypsin high specificity works');

  peptides = testEnzyme('chymotrypsin low specificity', 8, 'PEPTIDEFAPEPTIDEMAPEPTIDEFPEPTIDE');
  t.equal(peptides.length, 3, 'chymotrypsin low specificity works');

  peptides = testEnzyme('clostripain', 6, 'ARGININE');
  t.equal(peptides[0].sequence, 'GININE', 'clostripain works');

  peptides = testEnzyme('cnbr', 8, 'IREALLYLIKEMASSSPEC');
  t.equal(peptides[0].sequence, 'IREALLYLIKEM', 'cnbr works');

  peptides = testEnzyme('enterokinase', 8, 'PEPTIDEDDDKHI');
  t.equal(peptides[0].sequence, 'PEPTIDEDDDK', 'enterokinase works');

  peptides = testEnzyme('factor xa', 8, 'PEPTIDEIDGRHI');
  t.equal(peptides[0].sequence, 'PEPTIDEIDGR', 'factor xa works');

  peptides = testEnzyme('formic acid', 8, 'MASSSPECPEPTIDE');
  t.equal(peptides[0].sequence, 'MASSSPECPEPTID', 'formic acid works');

  peptides = testEnzyme('glutamyl endopeptidase', 8, 'VERYDIRTYWATER');
  t.equal(peptides[0].sequence, 'RYDIRTYWATE', 'glutamyl endopeptidase works');

  peptides = testEnzyme('granzyme b', 8, 'WATERIEPDPEPTIDE');
  t.equal(peptides[0].sequence, 'WATERIEPD', 'granzyme b works');

  peptides = testEnzyme('hydroxylamine', 8, 'WHYNOSLEEPINGINCLASS');
  t.equal(peptides[0].sequence, 'WHYNOSLEEPIN', 'hydroxylamine works');

  peptides = testEnzyme('iodosobenzoic acid', 8, 'MASSSPECWINS');
  t.equal(peptides[0].sequence, 'MASSSPECW', 'iodosobenzoic acid works');

  peptides = testEnzyme('lysc', 8, 'PLEASEDRINKWATER');
  t.equal(peptides[0].sequence, 'PLEASEDRINK', 'lysc works');

  peptides = testEnzyme('ntcb', 8, 'PLEASEDRINKCLEAN');
  t.equal(peptides[0].sequence, 'PLEASEDRINK', 'ntcb works');

  peptides = testEnzyme('pepsin ph1.3', 8, 'MAEVPELASEMMAYYSGNEDDLFFEADGPKQMKCSF');
  t.equal(peptides.length, 2, 'pepsin ph1.3 works');

  peptides = testEnzyme('pepsin ph2.0', 8, 'MAEVPELASEMMAYYSGNEDDLFFEADGPKQMKCSF');
  t.equal(peptides.length, 1, 'pepsin ph2.0 works');

  peptides = testEnzyme('proline endopeptidase', 8, 'WATERHPEPTIDEHPPEPTIDE');
  t.equal(peptides[0].sequence, 'EPTIDEHPPEPTIDE', 'proline endopeptidase works');

  peptides = testEnzyme('proteinase k', 4, 'ILIKEMASSSPEC');
  t.equal(peptides[0].sequence, 'SSSPE', 'proteinase k works');

  peptides = testEnzyme('staphylococcal peptidase i', 6, 'ILIKEMASSSPEC');
  t.equal(peptides[0].sequence, 'MASSSPE', 'staphylococcal peptidase i works');

  peptides = testEnzyme('thermolysin', 7, 'PLEASESTAYHERE');
  t.equal(peptides[0].sequence, 'LEASEST', 'thermolysin works');

  peptides = testEnzyme('thrombin', 8, 'PEPTIDEAAGRG');
  t.equal(peptides[0].sequence, 'PEPTIDEAAGR', 'thrombin works');

  peptides = testEnzyme('trypsin', 8, 'PEPTIDELIKEMEHARPISTPLAY');
  t.equal(peptides.length, 2, 'trypsin works');

  t.end();
});

test('Parameters', function(t) {
  let minLength = new peptideCutter({
    'enzyme': 'lysc',
    'min_length': 10
  });
  let peptides = minLength.cleave('AAAAAAAAAKAAAAAAAAA');
  t.equal(peptides.length, 1, 'Min length works');

  let maxLength = new peptideCutter({
    'enzyme': 'lysc',
    'max_length': 10
  });
  peptides = maxLength.cleave('AAAAAAAAKAAAAAAAAAKAAAAAAAAAAA');
  t.equal(peptides.length, 2, 'Max length works');

  let missed = new peptideCutter({
    'enzyme': 'lysc',
    'min_length': 2,
    'num_missed_cleavages': 2
  });
  peptides = missed.cleave('AKGKYK');
  t.equal(peptides.length, 6, 'Missed cleavages work');

  t.end();
});

function testEnzyme(enzyme, min_length, sequence) {
  let cutter = new peptideCutter({
    'enzyme': enzyme,
    'min_length': min_length
  });
  let peptides = cutter.cleave(sequence);
  return peptides;
}
/*  

describe('Parameters', function() {

  it('missed cleavages works', function() {
    missed = new peptideCutter({
      'enzyme': 'lysc',
      'min_length': 2,
      'num_missed_cleavages': 2
    });
    peptides = missed.cleave('AKGKYK');
    peptides.length.should.equal(6);
  });
});

*/