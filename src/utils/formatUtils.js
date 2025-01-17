// Util function to make output nicer
function formatFixedWidth(data, columnWidths) {
    if (data.length === 0) { // in case empty array
        return '';
    }
    const formatRow = (row) => {
      return Object.keys(row).map((key, index) => {
        return String(row[key]).padEnd(columnWidths[index]);
      }).join('');
    };
    const header = formatRow(Object.keys(data[0]).reduce((obj, key, _) => {
      obj[key] = key;
      return obj;
    }, {}));
  
    const rows = data.map(formatRow);
  
    return [header, ...rows].join('\n');
  }
  module.exports = { formatFixedWidth };
