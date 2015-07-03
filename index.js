var Pili = require('pili');

// ======================== Configurations =========================
var ACCESS_KEY = 'QiniuAccessKey';
var SECRETE_KEY = 'QiniuSecretKey';

var HUB = 'hubName';

var RTMP_PUBLISH_HOST = "xxx.pub.z1.pili.qiniup.com";
var RTMP_PLAY_HOST    = "xxx.live1.z1.pili.qiniucdn.com";
var HLS_PLAY_HOST     = "xxx.hls1.z1.pili.qiniucdn.com";

// ========================== Client ============================

/**
 * Create a Pili client
 */
var client = new Pili.Client(ACCESS_KEY, SECRETE_KEY);

/**
 * Create a new streamPublishKey
 */
var hub = HUB;                   // required
var options = {
  title          : 'hello-world',        // optional
  publishSecrity : 'dynamic'     // optional
};

client.createStream(hub, options, function(err, stream) {
  // Log stream
  // {
  //    id: 'STREAM_ID',
  //    title: 'STREAM_TITLE'.
  //    hub: 'HUB_NAME',
  //    publishKey: 'PUBLISH_KEY',
  //    publishSecurity: 'PUBLISH_SECURITY',
  //    disabled: false
  // }
  if (err) {
    console.log('Create Error: ' + err + '.');
    return;
  }

  console.log('Create Success.');
  console.log(stream);

  client.getStream(stream.id, function(err, stream) {
    if (!err) {
      console.log('Get Stream: ');
      console.log(stream);

      var publishUrl = stream.rtmpPublishUrl(RTMP_PUBLISH_HOST);
      console.log('Publish URL: ' + publishUrl);

      var rtmpLiveUrl = stream.rtmpLiveUrl(RTMP_PLAY_HOST, {profile: '720p'});
      console.log('RTMP URL: ' + rtmpLiveUrl);

      var hlsLiveUrl = stream.hlsLiveUrl(HLS_PLAY_HOST, {profile: '720p'});
      console.log('HLS URL: ' + hlsLiveUrl);

      var hlsPlaybackUrl = stream.hlsPlaybackUrl(HLS_PLAY_HOST, 0, 233, {profile: '480p'});
      console.log('HLS Playback URL: ' + hlsPlaybackUrl);

      client.getStreamStatus(stream.id, function(err, data) {
        console.log(data);
      })

      client.getStreamSegments(stream.id, null, function(err, data) {
        console.log(data);
      });

      client.listStreams(hub, null, function(err,treams) {
        if (!err) {
          console.log(streams);
        }
      });

      client.deleteStream(stream.id, function(err, data) {
        if (err) {
          console.log('Delete Error: ' + err + '.');
        } else {
          console.log('Delete Success.');
        }
      });
    }
  });
});
