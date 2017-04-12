var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getStreamList() {
  channels.forEach(getChannelInfo);
}

function getChannelInfo(channel) {
    $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + channel, function (channelInfo) {
      $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + channel, function (streamInfo) {
        appendStreamInfo(channelInfo, streamInfo);
      });
    });
  }



function appendStreamInfo(channel, stream) {
  if (!channel.display_name) return;

  var streamStatus = stream.stream ? (stream.stream.game+ "<br>" + stream.stream.channel.status):"Offline";
  var randomImage = "https://lorempixel.com/400/400/";

  $('#streams').append(`
      <div class="row">
        <div class="col-md-2"><img src="${channel.logo || randomImage}" width="100%">
        </div>
        <div class="col-md-10">
          <a href="${channel.url}" target="_blank"><p>${channel.display_name}</p></a>
          ${streamStatus}
        </div>
      </div>
  `);
}

$("#submit").on("click", function () {
  var newChannel = $("#newChannel").val();
  //console.log(newChannel);
  channels.push(newChannel);
  getChannelInfo(newChannel);
  $("#newChannel").val("");
});

$("#newChannel").keypress(function (e) {
  if (e.which == 13) $("#submit").click();
});

$(getStreamList);