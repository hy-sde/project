const fs = require('fs');
const assert = require('assert');
const { exec } = require('child_process');

describe('Integration Test for index.js', () => {
  it('should produce the expected output file', (done) => {
    const expectedFile = 'test/expected.tsv'; // Adjust the path to your expected file
    const outputFile = 'output/output.tsv';

    // Run the Node.js program
    exec('node src/index.js', (error) => {
      if (error) {
        done(error);
        return;
      }

      // Read both files and compare their contents
      const expectedContent = fs.readFileSync(expectedFile, 'utf8');
      const outputContent = fs.readFileSync(outputFile, 'utf8');

      assert.strictEqual(outputContent, expectedContent);
      done();
    });
  });
})[3];
