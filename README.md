## Steps to run

1. install nvm, [reference](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
2. clone this project
   - git clone [repository-url]
   - cd [project-directory]
3. use node version configed from this repo:
   - `nvm install`
   - `nvm use`
4. check the version
   - `npm --version`
5. install dependencies
   - `npm -i`
6. done
   - for testing, run `npm test`
     - example log
       ```
       shell% npm test
        
        > your-project@1.0.0 test
        > mocha test/*.js
        
        
        
          formatFixedWidth test suites
            ✔ should format data with fixed column widths
            ✔ should handle empty data array
            ✔ should handle varying column widths
        
          Integration Test for index.js
            ✔ should produce the expected output file
        
        
          4 passing (40ms)
        ```
   - for index.js, run `npm run start`, should see output in `output/output.tsv`


  ## Assumptions
  Folder struct:
  ```
📦proj
 ┣ 📂input
 ┃ ┗ 📜input.csv
 ┣ 📂output
 ┃ ┗ 📜output.tsv
 ┣ 📂src
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜formatUtils.js
 ┃ ┗ 📜index.js
 ┣ 📂test
 ┃ ┣ 📜expected.tsv
 ┃ ┣ 📜formatUtilsTest.js
 ┃ ┗ 📜indexTest.js
 ┣ 📜README.md
 ┗ 📜package.json
  ```

  1. Input file exists, for row header, each word can have space around, value can have space around
     - input file must be valid csv file, can end with comma for missing tag col (count as `Untaagged`)
     - protocol col will always be lowercase
     - unknown port/protocol defaults to 'Unknown'
      
  2. Output is TSV(tab spearated) file, tag is in original case not always lowercase, with fixed-width for nicer formatting
     - not sorted by count
  4. Testing
     - unit test is testing formatUtils.js
     - integration test is testing the ouput/output.tsv file against user-defined test/expected.tsv file
## Example Input
```
dstport,protocol,tag  
25,tcp,sv_P1  
68,udp,sv_P2   
23,tcp,sv_P1
31,udp,SV_P3 
443,tcp,sv_P2
443,tcp,
31,udp,
```

## Example Output
```
Tag Counts: 
Tag            Count     
sv_P1          2         
sv_P2          2         
SV_P3          1         
Untagged       2         

Port/Protocol Combination Counts: 
Port      Protocol  Count     
25        tcp       1         
68        udp       1         
23        tcp       1         
31        udp       2         
443       tcp       2         
```