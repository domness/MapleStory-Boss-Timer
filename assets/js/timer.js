function getTime() {

  var now = new Date();
  var minutes = now.getMinutes();
  return "XX:" + formattedMinutes(minutes);
}

function sortByTime(a, b) {
  var now = new Date();
  var nowOffset = now.getMinutes();
  // console.log(nowOffset);

  var x = a.minutes - nowOffset;
  // console.log(x);
  var y = b.minutes - nowOffset;
  // console.log(y);
  if (x < 0) x += 86400;
  if (y < 0) y += 86400;
  if (isCurrent(b)) {
    return 1;
  }
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function isCurrent(a) {
  var now = new Date();
  var nowMinutes = now.getMinutes();
  var start = a.minutes;
  var end = a.minutes + a.open;

  if (end > 60) {
    end = (end - 60) + 60;
    nowMinutes = nowMinutes + 60;
  }

  if (nowMinutes >= start && nowMinutes <= end) {
    return true;
  } else {
    return false;
  }
}

function refreshAll() {
  console.log('test');

  $('.table-content').remove();

  var self = this;

  self.bosses = [
    // "Acreon": { minutes: 0, map: "", open: 15 },
    { name: 'Alpha Turtle', minutes: 40, map: 'A map', open: 15 },
    // "Amadon": { minutes: 0, map: "", open: 15 },
    // "Bajar": { minutes: 0, map: "", open: 15 },
    // "Cold-Blooded Baphomet": { minutes: 0, map: "", open: 15 },
    // "Devilin Warrior": { minutes: 0, map: "", open: 15 },
    // "Dun Dun": { minutes: 0, map: "", open: 15 },
    { name: 'Furious Baphomet', minutes: 5, map: 'A map', open: 15 },
    // "Giant Turtle": { minutes: 0, map: "", open: 15 },
    // "Griffin": { minutes: 0, map: "", open: 15 },
    // "Griffina": { minutes: 0, map: "", open: 15 },
    // "Heartless Baphomet": { minutes: 0, map: "", open: 15 },
    // "Ica Le Madrid": { minutes: 0, map: "", open: 15 },
    // "Ikar Morde": { minutes: 0, map: "", open: 15 },
    { name: 'Lernos', minutes: 45, map: 'A map', open: 15 },
    // "Lulu and Momos": { minutes: 0, map: "", open: 15 },
    // "Mark 52 Alpha Bot": { minutes: 0, map: "", open: 15 },
    { name: 'Pekanos', minutes: 55, map: 'A map', open: 15 },
    { name: 'Toh and Googoo', minutes: 25, map: 'A map', open: 15 },
    // "Toto and Waggus": { minutes: 0, map: "", open: 15 },
    // "Ureus": { minutes: 0, map: "", open: 15 },
    { name: 'Vayar Gatekeeper', minutes: 35, map: 'A map', open: 15 },
  ];

  self.bosses.sort(sortByTime);

  var k = self.bosses.length;
  for (i = 0; i<k; i++) {
    var boss = self.bosses[i];
    var tmp = '<div class="row table-content ' + (isCurrent(boss) ? 'active' : 'inactive') + '">'
            + '<div class="col-sm-1"><img class="boss-icon" src="images/boss-icon.png"/></div>'
            + '<div class="col-sm-3">' + boss.name + '</div>'
            + '<div class="col-sm-3">' + boss.map + '</div>'
            + '<div class="col-sm-1">XX:' + formattedMinutes(boss.minutes) + '</div>'
            + '<div class="col-sm-2">' + currentStr(boss) + '</div>'
            + '</div>';
    $('#boss-timer').append(tmp);
  }
}

function currentStr(boss) {
  return isCurrent(boss) ? 'Active' : 'Inactive';
}

function formattedMinutes(a) {
  if (a < 10) {
    return '0' + a;
  } else {
    return a;
  }
}

$(document).ready(function() {
  console.log('MapleStory 2 World Boss Timer: Started');

  $("#now-timezone").append("Current Time: " + getTime());

  refreshAll();

  setInterval(function() {
		var rn = new Date();
		var rs = rn.getSeconds();
		// auto refresh table at 0 second
		if (rs == 0) refreshAll();
	}, 1000);
});
