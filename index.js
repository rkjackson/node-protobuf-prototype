(function() {

    let _ = require('lodash');
    let fs = require('fs');
    let path = require('path');
    let randomString = require('randomstring').generate;
    let util = require('util');

    let testIters = 10000; // number of encodes/decodes to make
    let testStrLengths = [50, 500, 5000]; // length of random body string elem

    benchmarkNodeProtobuf();
    benchmarkProtobufJS();
    benchmarkGoogleProtobuf();

    // google-protobuf node extension ???? stars
    // not very fun to convert json->pb
    function benchmarkGoogleProtobuf() {
        let pb = require('./proto/message/example_pb.js').Example;
        let meta = require('./proto/meta/meta_pb.js');
        let timestamp = require('google-protobuf/google/protobuf/timestamp_pb.js').Timestamp;

        runBenchmark({
            lib: 'google-protobuf',
            serialize: function(obj) {
                let o = new pb();
                o.setValue(obj.value);

                let t = new timestamp();
                t.setSeconds(obj.meta.timestamp.seconds);
                t.setNanos(obj.meta.timestamp.nanos);

                let m = new meta.MessageMeta();
                m.setId(obj.meta.id);
                m.setType(obj.meta.type);
                m.setTimestamp(t);

                o.setMeta(m);

                return o.serializeBinary();
            },
            deserialize: function(buf) {
                let obj = pb.deserializeBinary(buf).toObject();

                obj.meta.timestamp.seconds = obj.meta.timestamp.seconds.toString();

                return obj;
            },
            enumVal: meta.MessageType.EXAMPLE
        })
    }


    // node-protobuf        150 stars
    // https://www.npmjs.com/package/node-protobuf
    // very primitive object wrapping/unwrapping
    // enums can be STR values or integers
    // loaded from descriptor (.desc) files
    //      must contain all imports
    function benchmarkNodeProtobuf() {
        let NodeProtobuf = require('node-protobuf');
        let descFile = fs.readFileSync('./proto/message/example.desc');

        let pb = new NodeProtobuf(descFile);

        runBenchmark({
            lib: 'node-protobuf',
            serialize: function(obj) {
                return pb.serialize(obj, 'message.Example');
            },
            deserialize: function(buf) {
                return pb.parse(buf, 'message.Example');
            },
            enumVal: 'EXAMPLE'
        });
    }

    // protobufjs       2.8k stars
    // https://www.npmjs.com/package/protobufjs
    // very popular + powerful
    // baked in enum values
    // have to write custom import resolver
    // object wrapping/unwrapping isn't too fun
    function benchmarkProtobufJS() {
        let protobufjs = require('protobufjs');

        let root = new protobufjs.Root();

        // proto/message/example.proto imports proto/meta/meta.proto
        // library tries to import:
        //      proto/message/proto/meta/meta.proto
        // this is a simple resolver to fix that, would need to be better though
        root.resolvePath = function(origin, target) {
            if (origin === 'proto/message/example.proto') {
                return target;
            }

            return protobufjs.util.path.resolve(origin, target);
        };

        root.load('./proto/message/example.proto', function(err, root) {
            let pb = root.lookup('message.Example');

            runBenchmark({
                lib: 'protobufjs',
                serialize: function(obj) {
                    return pb.encode(pb.create(obj)).finish();
                },
                deserialize: function(buf) {
                    return pb.decode(buf).toObject({
                        'longs': String
                    });
                },
                enumVal: root.nested.meta.MessageType.EXAMPLE
            })
        });
    }

    function runBenchmark(opts) {
        console.log('-'.repeat(120));

        for (var i = 0; i < testStrLengths.length; i++) {
            let strLength = testStrLengths[i];

            let start = process.hrtime();

            for (var j = 0; j < testIters; j++) {
                let obj = _generateObject(strLength, opts.enumVal);

                let serialized = opts.serialize(obj);
                let deserialized = opts.deserialize(serialized);

                if (!_.isEqual(obj, deserialized)) {
                    console.log(obj);
                    console.log(deserialized);
                    console.log(`${opts.lib} benchmark failed equality assertion'`);
                    return
                }
            }

            let diff = process.hrtime(start);

            console.log(`${opts.lib} (${testIters} iterations, string length ${strLength}) took ${(diff[0] * 1e9 + diff[1]) / 1000000} milliseconds`);

        }

        console.log('-'.repeat(120));
        console.log();
    }

    function _generateObject(strLen, type) {
        return {
            meta: {
                id: randomString(10),
                type: type,
                timestamp: {
                    seconds: Math.floor(Date.now() / 1000).toString(),
                    nanos: 123
                }
            },
            value: randomString(strLen)
        };
    }

})();