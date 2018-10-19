function getTime() {
  var now = new Date();
  var minutes = now.getMinutes();
  return "XX:" + formattedMinutes(minutes);
}

function sortByTime(a, b) {
  var now = new Date();
  var nowOffset = now.getMinutes();

  var x = a.minutes - nowOffset;
  var y = b.minutes - nowOffset;

  if (x < 0) x += 86400;
  if (y < 0) y += 86400;

  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function isCurrent(a) {
  var now = new Date();
  var nowMinutes = now.getMinutes();
  var start = a.minutes;
  var end = a.minutes + a.open;

  if (end > 60) {
    end = (end * 10) + 60;
    nowMinutes = nowMinutes + 60;
  }

  if (nowMinutes >= start && nowMinutes <= end) {
    return true;
  } else {
    return false;
  }
}

function isCloseToEnd(a) {
  var now = new Date();
  var nowMinutes = now.getMinutes();
  var start = a.minutes;
  var end = a.minutes + a.open - 5;

  if (end > 60) {
    end = (end * 10) + 60;
    nowMinutes = nowMinutes + 60;
  }

  if (nowMinutes >= start && nowMinutes <= end) {
    return true;
  } else {
    return false;
  }
}

function addBosses(bosses) {
  var k = bosses.length;
  for (i = 0; i<k; i++) {
    var boss = bosses[i];
    var tmp = '<div class="row table-content '
            + (isCurrent(boss) ? 'active' : 'inactive')
            + (isCloseToEnd(boss) ? ' alerted' : '') + '">'
            + '<div class="col-sm-1"><img class="boss-icon" src="images/boss-icon.png"/></div>'
            + '<div class="col-sm-4">' + boss.name + '</div>'
            + '<div class="col-sm-4">' + boss.map + '</div>'
            + '<div class="col-sm-1">XX:' + formattedMinutes(boss.minutes) + '</div>'
            + '<div class="col-sm-2">' + currentStr(boss) + '</div>'
            + '</div>';
    $('#boss-timer').append(tmp);
  }
}

function addDetailedBosses(bosses) {
  var count = bosses.length;
  for (i = 0; i<count; i++) {
    var boss = bosses[i];
    var tmp = '<div class="row active-content '
            + (isCurrent(boss) ? 'active' : 'inactive')
            + (isCloseToEnd(boss) ? ' alerted' : '')
            + '">'
            + '<div class="col-sm-12 center"><img class="boss-icon" src="images/boss-icon.png"/></div>'
            + '<div class="col-sm-12 center"><h2>' + boss.name + '</h2></div>'
            + '<div class="col-sm-12 center">' + boss.map + '</div>'
            + '<div class="col-sm-12 center"><sub>Started at XX:' + formattedMinutes(boss.minutes) + '</sub></div>'
            + '<div class="col-sm-12 center"><sub>Will leave the map within ' + formattedMinutes(boss.open) + ' minutes</sub></div>'
            + '</div>';
    $('#on-now').append(tmp);
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

function refreshAll() {
  $('.table-content').remove();
  $('.active-content').remove();

  var self = this;

  var bosses = [
    { name: 'Acreon', minutes: 5, map: 'Lavendar Island', open: 10 },
    { name: 'Alpha Turtle', minutes: 40, map: 'Ellua Riverside', open: 10 },
    { name: 'Amadon', minutes: 55, map: 'Ludari Arena', open: 10 },
    { name: 'Devilin Warrior', minutes: 55, map: 'South Royal Road', open: 10 },
    { name: 'Doondun', minutes: 55, map: 'Kerning Junkyard', open: 10 },
    { name: 'Furious Baphomet', minutes: 5, map: 'Mirror Castle', open: 10 },
    { name: 'Giant Turtle', minutes: 35, map: 'Beachway 111', open: 10 },
    { name: 'Griffin', minutes: 15, map: 'Frostheart', open: 10 },
    { name: 'Griffina', minutes: 25, map: 'Trinian Crossing', open: 10 },
    { name: 'Heartless Baphomet', minutes: 15, map: 'Frostpeak Mountain', open: 10 },
    { name: 'Ikar Morde', minutes: 5, map: 'Frozencrest', open: 10 },
    { name: 'Lernos', minutes: 45, map: 'Twilight Moon Castle', open: 10 },
    { name: 'MK 52 Alpha Bot', minutes: 45, map: 'Neuron DNA Research Center', open: 10 },
    { name: 'Pekanos', minutes: 55, map: 'Fractured Canyon', open: 10 },
    { name: 'Toh and Googoo', minutes: 25, map: 'Whistler Cliffs', open: 10 },
    { name: 'Ureus', minutes: 15, map: 'Nazkar Pyramid', open: 10 },
    { name: 'Vayar Gatekeeper', minutes: 35, map: 'Precipice Fortress', open: 10 },
  ];

  bosses.sort(sortByTime);

  var active = bosses.filter(x => isCurrent(x));
  var inactive = bosses.filter(x => !isCurrent(x));

  addDetailedBosses(active);
  addBosses(active);
  addBosses(inactive);
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
