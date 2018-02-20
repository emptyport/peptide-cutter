var expasy_rules = require('./expasy_rules.json');

module.exports = class PeptideCutter {
  constructor(options) {
    // These are the default values. They will
    // be overwritten by anything passed in 
    // through the options
    this.enzyme = 'trypsin';
    this.num_missed_cleavages = 0;
    this.min_length = 8;
    this.max_length = 30;

    if(options.enzyme !== undefined) {
      this.enzyme = options.enzyme;
      if(expasy_rules[this.enzyme] === undefined) {
        console.log("Invalid enzyme. Defaulting to trypsin");
        this.enzyme = 'trypsin';
      }
    }
    this.regex = new RegExp(expasy_rules[this.enzyme], "g");

    if(options.num_missed_cleavages !== undefined) {
      this.num_missed_cleavages = options.num_missed_cleavages;
      if(this.num_missed_cleavages < 0) {
        console.log("The number of missed cleavages can't be less than 0. Defaulting to 0");
        this.num_missed_cleavages = 0;
      }
    }

    if(options.min_length !== undefined) {
      this.min_length = options.min_length;
    }
    if(options.max_length !== undefined) {
      this.max_length = options.max_length;
    }
    if(this.min_length > this.max_length) {
      console.log("The min_length cannot be greater than the max_length. Defaulting to 8 and 30");
      this.min_length = 8;
      this.max_length = 30;
    }
  }

  cleave(sequence) {
    var num_missed = this.num_missed_cleavages;
    var indices = [];
    var m;
    do {
      m = this.regex.exec(sequence);
      if (m) {
        indices.push(m.index);
      }
    } while (m);

    // If there are only 3 cleavage sites there
    // is no reason to allow more than 3 missed
    // cleavages
    if(indices.length < num_missed) {
      num_missed = indices.length;
    }



  }

  

}