const fs = require('fs');
const { parse } = require('csv-parse');

const inputFile = 'input/input.csv';
const outputFile = 'output/output.tsv';

const tagCounts = {};
const originalTags = {};
const UNTAGGED = 'Untagged';

const portProtocolCounts = {};

const { formatFixedWidth } = require('./utils/formatUtils');

fs.createReadStream(inputFile)
  .pipe(parse({
    delimiter: ',',
    columns: true,
    trim: true
  }))
  .on('data', (row) => {
    let tag = row.tag ? row.tag.trim() : UNTAGGED;
    if (tag === '') {
      tag = UNTAGGED;
    }
    // count tag
    const lowercaseTag = tag.toLowerCase();
    tagCounts[lowercaseTag] = (tagCounts[lowercaseTag] || 0) + 1;
    originalTags[lowercaseTag] = tag;

    // count port/protocol
    const port = row.dstport ? row.dstport.trim() : 'Unknown';
    const protocol = row.protocol ? row.protocol.trim() : 'Unknown';
    const portProtocolKey = `${port}/${protocol}`;
    portProtocolCounts[portProtocolKey] = (portProtocolCounts[portProtocolKey] || 0) + 1;
  })
  .on('end', () => {
    const mappedTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ Tag: originalTags[tag], Count: count }));


    const writableStream = fs.createWriteStream(outputFile);

    const mappedPortProtocolCounts = Object.entries(portProtocolCounts)
      .map(([key, count]) => {
        const [port, protocol] = key.split('/');
        return { Port: port, Protocol: protocol, Count: count };
      });
    
    const tagColumnWidths = [15, 10]; // Adjust as needed
    const portProtocolColumnWidths = [10, 10, 10]; // Adjust as needed

    const formattedTagCounts = formatFixedWidth(mappedTags, tagColumnWidths);
    const formattedPortProtocolCounts = formatFixedWidth(mappedPortProtocolCounts, portProtocolColumnWidths);
    writableStream.write('Tag Counts: \n'); // Write the custom line before the header
    writableStream.write(formattedTagCounts);
    writableStream.write('\n\nPort/Protocol Combination Counts: \n');  // Write the custom line before the header
    writableStream.write(formattedPortProtocolCounts);
    
    writableStream.end(() => {
      console.log('TSV file has been written successfully with fixed-width columns');
    });
      
  });
