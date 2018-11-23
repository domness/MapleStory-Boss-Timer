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
    // end = (end * 10) + 60;
    if (nowMinutes <= 15) {
      end = end - 60
      console.log(a);
      if (nowMinutes <= end) {
        return true;
      }
    }
    // nowMinutes = nowMinutes + 60;
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
            + (isCurrent(boss) ? 'active' : 'inactive') + '">'
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
            + (isCurrent(boss) ? 'active' : 'inactive') + '">'
            + '<div class="col-sm-12 center"><h2>' + boss.name + '</h2></div>'
            + '<div class="col-sm-12 center"><img class="boss-icon-large" src="images/' + boss.image + '"/></div>'
            + '<div class="col-sm-12 center">' + boss.map + '</div>'
            + '<div class="col-sm-12 center"><sub>Started at XX:' + formattedMinutes(boss.minutes) + '</sub></div>'
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
  $('.current-time').remove();
  $("#now-timezone").append("<span class='current-time'>Current Time: " + getTime() + "</div>");
  $('.table-content').remove();
  $('.active-content').remove();

  var self = this;

  var bosses = [
    { name: 'Acreon', minutes: 5, map: 'Lavendar Island', open: 10, level: 50, image: 'acreon.png' },
    { name: 'Alpha Turtle', minutes: 40, map: 'Ellua Riverside', open: 10, level: 37, image: 'alpha-turtle.png' },
    { name: 'Amadon', minutes: 55, map: 'Ludari Arena', open: 10, level: 50, image: 'amadon.png' },
    { name: 'Devilin Warrior', minutes: 55, map: 'South Royal Road', open: 10, level: 21, image: 'devilin-warrior.png' },
    { name: 'Doondun', minutes: 5, map: 'Kerning Junkyard', open: 10, level: 15, image: 'doondun.png' },
    { name: 'Furious Baphomet', minutes: 5, map: 'Mirror Castle', open: 10, level: 40, image: 'furious-baphomet.png' },
    { name: 'Giant Turtle', minutes: 35, map: 'Beachway 111', open: 15, level: 18, image: 'giant-turtle.png' },
    { name: 'Griffin', minutes: 15, map: 'Frostheart', open: 10, level: 23, image: 'griffin.png' },
    { name: 'Griffina', minutes: 25, map: 'Trinian Crossing', open: 10, level: 30, image: 'griffina.png' },
    { name: 'Heartless Baphomet', minutes: 15, map: 'Frostpeak Mountain', open: 10, level: 50, image: 'heartless-baphomet.png' },
    { name: 'Ikar Morde', minutes: 5, map: 'Frozencrest', open: 10, level: 50, image: 'ikar-morde.png' },
    { name: 'Lernos', minutes: 45, map: 'Twilight Moon Castle', open: 10, level: 40, image: 'lernos.png' },
    { name: 'MK 52 Alpha Bot', minutes: 45, map: 'Neuron DNA Research Center', open: 10, level: 27, image: 'mk52.png' },
    { name: 'Pekanos', minutes: 55, map: 'Fractured Canyon', open: 10, level: 47, image: 'pekanos.png' },
    { name: 'Toh and Googoo', minutes: 25, map: 'Whistler Cliffs', open: 10, level: 43, image: 'toh-and-googoo.png' },
    { name: 'Ureus', minutes: 15, map: 'Nazkar Pyramid', open: 10, level: 50, image: 'ureus.png' },
    { name: 'Vayar Gatekeeper', minutes: 35, map: 'Precipice Fortress', open: 10, level: 35, image: 'vayar-gatekeeper.png' },
    { name: 'Lo and Moomoo', minutes: 5, map: 'Baum Tree', open: 10, level: 32, image: 'lo-and-moomoo.png' }
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

  refreshAll();

  setInterval(function() {
		var rn = new Date();
		var rs = rn.getSeconds();
		// auto refresh table at 0 second
		if (rs == 0) refreshAll();
	}, 1000);
});
