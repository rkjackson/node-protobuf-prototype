# node-protobuf-prototype


To generate `.js` compile protobuf files:
1. Install Protobuf (https://github.com/google/protobuf/releases)
2. Run the following
    ```
    protoc proto/meta/meta.proto --js_out=import_style=commonjs,binary:.
    protoc proto/message/example.proto --js_out=import_style=commonjs,binary:.
    
    protoc proto/meta/meta.proto --include_imports -o proto/meta/meta.desc
    protoc proto/message/example.proto --include_imports -o proto/message/example.desc
    ```
    
To run prototype evaluation:
1. `npm install`
2. `node index.js`

Sample Output:
```
------------------------------------------------------------------------------------------------------------------------
node-protobuf (10000 iterations, string length 50) took 546.336102 milliseconds
node-protobuf (10000 iterations, string length 500) took 994.490744 milliseconds
node-protobuf (10000 iterations, string length 5000) took 3851.4139 milliseconds
------------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------------------------
google-protobuf (10000 iterations, string length 50) took 556.045545 milliseconds
google-protobuf (10000 iterations, string length 500) took 742.293973 milliseconds
google-protobuf (10000 iterations, string length 5000) took 4048.569707 milliseconds
------------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------------------------
protobufjs (10000 iterations, string length 50) took 396.628621 milliseconds
protobufjs (10000 iterations, string length 500) took 630.724493 milliseconds
protobufjs (10000 iterations, string length 5000) took 3621.812993 milliseconds
------------------------------------------------------------------------------------------------------------------------
```