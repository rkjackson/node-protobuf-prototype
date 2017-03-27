/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var proto_meta_meta_pb = require('../../proto/meta/meta_pb.js');
goog.exportSymbol('proto.message.Example', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.message.Example = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.message.Example, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.message.Example.displayName = 'proto.message.Example';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.message.Example.prototype.toObject = function(opt_includeInstance) {
  return proto.message.Example.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.message.Example} msg The msg instance to transform.
 * @return {!Object}
 */
proto.message.Example.toObject = function(includeInstance, msg) {
  var f, obj = {
    meta: (f = msg.getMeta()) && proto_meta_meta_pb.MessageMeta.toObject(includeInstance, f),
    value: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.message.Example}
 */
proto.message.Example.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.message.Example;
  return proto.message.Example.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.message.Example} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.message.Example}
 */
proto.message.Example.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto_meta_meta_pb.MessageMeta;
      reader.readMessage(value,proto_meta_meta_pb.MessageMeta.deserializeBinaryFromReader);
      msg.setMeta(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.message.Example} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.message.Example.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.message.Example.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.message.Example.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getMeta();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto_meta_meta_pb.MessageMeta.serializeBinaryToWriter
    );
  }
  f = this.getValue();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional meta.MessageMeta meta = 1;
 * @return {?proto.meta.MessageMeta}
 */
proto.message.Example.prototype.getMeta = function() {
  return /** @type{?proto.meta.MessageMeta} */ (
    jspb.Message.getWrapperField(this, proto_meta_meta_pb.MessageMeta, 1));
};


/** @param {?proto.meta.MessageMeta|undefined} value */
proto.message.Example.prototype.setMeta = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.message.Example.prototype.clearMeta = function() {
  this.setMeta(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.message.Example.prototype.hasMeta = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string value = 2;
 * @return {string}
 */
proto.message.Example.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.message.Example.prototype.setValue = function(value) {
  jspb.Message.setField(this, 2, value);
};


goog.object.extend(exports, proto.message);