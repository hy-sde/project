const assert = require('assert');
const { formatFixedWidth } = require('../src/utils/formatUtils'); 

describe('formatFixedWidth test suites', () => {
  it('should format data with fixed column widths', () => {
    const data = [
      { Name: 'Alice', Age: 25 },
      { Name: 'Bob', Age: 30 }
    ];
    const columnWidths = [10, 5];
    const expectedOutput = `Name      Age  \nAlice     25   \nBob       30   `;

    const result = formatFixedWidth(data, columnWidths);
    assert.strictEqual(result, expectedOutput);
  });

  it('should handle empty data array', () => {
    const data = [];
    const columnWidths = [10, 5];
    const expectedOutput = '';

    const result = formatFixedWidth(data, columnWidths);
    assert.strictEqual(result, expectedOutput);
  });

  it('should handle varying column widths', () => {
    const data = [
      { Name: 'Alice', Age: 25 },
      { Name: 'Bob', Age: 30 }
    ];
    const columnWidths = [5, 10];
    const expectedOutput = `Name Age       \nAlice25        \nBob  30        `;

    const result = formatFixedWidth(data, columnWidths);
    assert.strictEqual(result, expectedOutput);
  });
})[2];
