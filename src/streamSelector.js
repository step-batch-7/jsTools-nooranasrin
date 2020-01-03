class StreamSelector{
  constructor(stdin, createReadStream) {
    this.stdin = stdin;
    this.createReadStream = createReadStream;
  }

  select(fileName) {
    return fileName ? this.createReadStream(fileName) : this.stdin;
  }
}

exports.StreamSelector = StreamSelector;
