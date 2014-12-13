(function(i, s, o, g, r, a, m)
{
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function()
  {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-31618809-2', 'auto');
ga('send', 'pageview');


var game = {
  Bread:0,
  Wealth:50,
  Beer:0,
  Wheat:0,
  Barley:0,
  Cider:0,
  Wood:100,
  Wine:0,
  Coal:0,
  Copper_Ore:0,
  Copper_Bar:0,
  Tin_Ore:0,
  Tin_Bar:0,
  Iron_Ore:0,
  Iron_Bar:0,
  Stone:100,
  Meat:0,
  Fish:0,
  Skills: {
    Construction:0,
    Fishing:0,
    Farming:0,
    Mining:0,
    Smelting:0,
    Woodcutting:0,
    Hunting:0
  }
};

var buildings_master = [];
var text = "THE VOID IS FORMLESS@THE VOID IS DARK@THE VOID IS...LONELY@#";
var hearttext = "WHERE AM I?1AM I ALIVE?2WHY CANT I SEE?3WHAT AM I?4";
var canask = 1;
var map = [];
var constructions = [];
var Granary_list = [];
var Farm_list = [];
var Woodcutters_Hut_list = [];
var Hunters_Hut_list = [];
var Fishermans_Hut_list = [];
var Watchtower_list = [];
var Walls_list = [];
var Mine_list = [];
var Smelter_list = [];
var Quarry_list = [];
var mouselayer;
var connections = [];
mouselayer = new Kinetic.Layer();
var buildinglayer;
buildinglayer = new Kinetic.Layer();
var stage;
var layer;
var minerallayer;
var colour_cache_layer;
var image;
var elevation_cache_layer;
var elevation_cache_img;
var temp_cache_layer;
var temp_cache_img;
var rain_cache_layer;
var rain_cache_img;
var colour_cache_img;
var copper_cache_layer;
var copper_cache_img;
var tin_cache_img;
var tin_cache_layer;
var iron_cache_img;
var iron_cache_layer;
var produce_choices = [];
var map_features = [];
var Farm_upgrades = [];
var Woodcutters_Hut_upgrades = [];
var Watchtower_upgrades = [];
var Walls_upgrades = [];
var Fishermans_Hut_upgrades = [];
var Hunters_Hut_upgrades = [];
var Granary_upgrades = [];
var Mine_upgrades = [];
var Smelter_upgrades = [];
var Quarry_upgrades = [];
var feature_names = ['Ruined_Building','Strange_Hole','Longbarrow','Stone_Circle','Decayed_Tower'];

function Upgrade(name,efficiency_mod,cost,skill_requirements,description){
  this.name=name;
  this.efficiency_mod=efficiency_mod;
  this.cost = cost;
  this.skill_requirements=skill_requirements;
  this.description=description;
}

var new_upgrade = new Upgrade('Irrigation',0.20, [{name:'Wood',amount:25},{name:'Stone',amount:25}],[], '');
Farm_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Seed_Bank',0.30, [{name:'Wood',amount:75},{name:'Wealth',amount:40}],[], '');
Farm_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Crop_Rotation',0.40, [{name:'Wood',amount:150},{name:'Stone',amount:100},{name:'Wealth',amount:100}],[], '');
Farm_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Fertilizer',0.50, [{name:'Wood',amount:350},{name:'Stone',amount:300},{name:'Wealth',amount:200}],[], '');
Farm_upgrades.push(new_upgrade);

new_upgrade = new Upgrade('Clearcut_Harvesting',0.20, [{name:'Wood',amount:25},{name:'Stone',amount:25}],[], '');
Woodcutters_Hut_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Shelterwood_Harvesting',0.30, [{name:'Wood',amount:30},{name:'Stone',amount:100}],[], '');
Woodcutters_Hut_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Seed_Tree_Harvesting',0.40, [{name:'Wood',amount:100},{name:'Stone',amount:100},{name:'Wealth',amount:100}],[], '');
Woodcutters_Hut_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Single_Tree_Selection_Harvesting',0.50, [{name:'Wood',amount:350},{name:'Stone',amount:300},{name:'Wealth',amount:200}],[], '');
Woodcutters_Hut_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Pit_Sawing',0.60, [{name:'Wood',amount:500},{name:'Stone',amount:400},{name:'Wealth',amount:500},{name:'Iron_Bar',amount:50}],[], '');
Woodcutters_Hut_upgrades.push(new_upgrade);

new_upgrade = new Upgrade('Stone_Ovens',0.20, [{name:'Wood',amount:50},{name:'Stone',amount:100}],[], '');
Granary_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Stone_Ground_Milling',0.30, [{name:'Wood',amount:250},{name:'Stone',amount:250}],[], '');
Granary_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Various_Flour_Types',0.40, [{name:'Wood',amount:250},{name:'Stone',amount:250},{name:'Wealth',amount:500}],[], '');
Granary_upgrades.push(new_upgrade);

new_upgrade = new Upgrade('Hydraulic_Mining',0.20, [{name:'Wood',amount:250},{name:'Stone',amount:250},{name:'Tin_Bar',amount:250}],[], '');
Mine_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Open_Pit_Mining',0.30, [{name:'Wood',amount:250},{name:'Stone',amount:250},{name:'Copper_Bar',amount:250}],[], '');
Mine_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Pumps',0.40, [{name:'Wood',amount:250},{name:'Stone',amount:250},{name:'Iron_Bar',amount:250}],[], '');
Mine_upgrades.push(new_upgrade);

new_upgrade = new Upgrade('Hydraulic_Mining',0.20, [{name:'Wood',amount:250},{name:'Stone',amount:250},{name:'Tin_Bar',amount:250}],[], '');
Quarry_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Open_Pit_Mining',0.30, [{name:'Wood',amount:250},{name:'Stone',amount:250},{name:'Copper_Bar',amount:250}],[], '');
Quarry_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Pumps',0.40, [{name:'Wood',amount:250},{name:'Stone',amount:250},{name:'Iron_Bar',amount:250}],[], '');
Quarry_upgrades.push(new_upgrade);

new_upgrade = new Upgrade('Fish_Spears',0.20, [{name:'Wood',amount:100},{name:'Stone',amount:100}],[], '');
Fishermans_Hut_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Fish_Traps',0.30, [{name:'Wood',amount:100},{name:'Stone',amount:250}],[], '');
Fishermans_Hut_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Weirs',0.40, [{name:'Wood',amount:250},{name:'Stone',amount:250},{name:'Iron_Bar',amount:250}],[], '');
Fishermans_Hut_upgrades.push(new_upgrade);

new_upgrade = new Upgrade('Kiln',0.20, [{name:'Stone',amount:100},{name:'Iron_Bar',amount:50}],[], '');
Smelter_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Bloomery',0.30, [{name:'Stone',amount:200},{name:'Iron_Bar',amount:100}],[], '');
Smelter_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Blast_Furnace',0.40, [{name:'Stone',amount:300},{name:'Iron_Bar',amount:250}],[], '');
Smelter_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Finery_Forge',0.50, [{name:'Stone',amount:400},{name:'Iron_Bar',amount:500}],[], '');
Smelter_upgrades.push(new_upgrade);

new_upgrade = new Upgrade('Atlatl',0.20, [{name:'Wood',amount:100},{name:'Stone',amount:100}],[], '');
Hunters_Hut_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Bows',0.30, [{name:'Wood',amount:200},{name:'Stone',amount:200}],[], '');
Hunters_Hut_upgrades.push(new_upgrade);
new_upgrade = new Upgrade('Snares',0.40, [{name:'Wood',amount:400},{name:'Stone',amount:400}],[], '');
Hunters_Hut_upgrades.push(new_upgrade);

function feature(name,location,contains){
	this.name=name;
	this.location=location;
	this.contains=contains;
}
function Produce(name, restrictions, amount, can_be_made_by, from_tile, recipe)
{
  this.name = name;
  this.restrictions = restrictions;
  this.amount = amount;
  this.buildings_produce_possible = can_be_made_by;
  this.from_tile = from_tile;
  this.recipe = recipe;
}
function building_produce(name, amount, from_tile, recipe) {
  this.name = name;
  this.amount = amount;
  this.from_tile = from_tile;
  this.recipe = recipe;
}
var temp = new Produce('Wheat', [], 0, ['Farm'], [], []);
produce_choices.push(temp);
temp = new Produce('Barley', [], 0, ['Farm'], [], []);
produce_choices.push(temp);
temp = new Produce('Bread', [], 0, ['Granary'], [], [{name:'Wheat',amount:1}]);
produce_choices.push(temp);
temp = new Produce('Wood', [], 0, ['Woodcutters_Hut'], ['Trees'],[]);
produce_choices.push(temp);
temp = new Produce('Stone', [], 0, ['Quarry'], [],[]);
produce_choices.push(temp);
temp = new Produce('Meat', [], 0, ['Hunters_Hut'], [], []);
produce_choices.push(temp);
temp = new Produce('Fish', [], 0, ['Fishermans_Hut'], [], []);
produce_choices.push(temp);
temp = new Produce('Copper_Ore', [], 0, ['Mine'], ['Copper'],[]);
produce_choices.push(temp);
temp = new Produce('Copper_Bar', [], 0, ['Smelter'], [], [{name:'Copper_Ore',amount:1},{name:'Coal',amount:1}]);
produce_choices.push(temp);
temp = new Produce('Iron_Bar', [], 0, ['Smelter'], [], [{name:'Iron_Ore',amount:1},{name:'Coal',amount:1}]);
produce_choices.push(temp);
temp = new Produce('Tin_Bar', [], 0, ['Smelter'], [], [{name:'Tin_Ore',amount:1},{name:'Coal',amount:1}]);
produce_choices.push(temp);
temp = new Produce('Iron_Ore', [], 0, ['Mine'], ['Iron'],[]);
produce_choices.push(temp);
temp = new Produce('Tin_Ore', [], 0, ['Mine'], ['Tin'],[]);
produce_choices.push(temp);
temp = new Produce('Coal', [], 0, ['Mine'], ['Coal'],[]);
produce_choices.push(temp);

layer = new Kinetic.Layer();
// the game's canvas element
var canvas = null;
// the canvas 2d context
var ctx = null;
// an image containing all sprites
var spritesheet = null;
// true when the spritesheet has been downloaded
var spritesheetLoaded = false;
// the world grid: a 2d array of tiles
var world = [
  []
];

// size in the world in sprite tiles
var worldWidth = 60;
var worldHeight = 60;

// size of a tile in pixels
var tileWidth = 10;
var tileHeight = 10;

// start and end of path
var pathStart = [worldWidth, worldHeight];
var pathEnd = [0, 0];
var currentPath = [];

// ensure that concole.log doesn't cause errors
if (typeof console == "undefined") var console = {
  log: function() {}
};

// the html page is ready
function onload()
{
  console.log('Page loaded.');
  canvas = document.getElementById('canvas');
  canvas.addEventListener("click", canvasClick, false);
  spritesheet = new Image();
  // spritesheet.src = 'spritesheet.png';
  // the image above has been turned into a data url
  // so that no external files are required for
  // this web page - useful for included in a
  // "gist" or "jsfiddle" page
  spritesheet.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAgCAYAAACVf3P1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAIN0lEQVR42mJMWaLzn4FEoCrxC86+/YINRQzER2aj68GmnhDgOx6EV/6T5Tqy7S9zvsnIMAoGDAAEEGPnHrX/6IkAFDm4EgZy4kNPhMSaQUgdTAyW8Oz1pMC0sAw7irq3T36C6YOXnqEkRlLsnx19eTQBDiAACCAWWImBHFnEJD7kkgYbICbykc1Btx+U+NATnqKhBpruG2AySEYRniAPAvWBEiGx9sNzYiQj3prg//L/jLQ0b72zN171gXu3kmQ/qebZiEv9/8fwn+E/UNdfIPEXyPsHpMEYKH/53RuS7CfWPIAA7JXhCoBACIPn9Crq/d83VncghEf0O0GQ4eafD2T1qmbgjf0xVyDOAK1glSfDN+oJ361lXaDKJ7/67f2/gCMadg+s7licaCRoBlN/zLsyI7Apkw63npn2TgHEQqhahEUivioNW7uL2CoQHbxcH4GS+NCrXWRw//wNDDGQelCJCC4NgWbxoVXNhACpJR2p5hAqGUkt6Ug1B1fJyM3KyvDn3z+GTY/uUcX+nU8fYjXHWETs/z8kPkAAsWBrvBPqfOBLiKRWwej2v8SS8LCVftgSH6q6GxhVMykJcaQBHmBJ9evfP5rbAyoF//7/C+cDBBALsaUeMYmP0o4HrPTD1eZDTnTIcjDxM5svgvUiV80gOZRSEZgQxQNXkFU6D2cAShgMDPRIgKhVMEAAseArydBLNPQSktjOC6HqnRgAS2S42oIweVAie/vkIrwURU+I9gxS4KqZAWnoZhQwMPz4+weI/9J+2AWc+hBJECCAmEjtscISDjmRh6wH21giPoDe4cCWOLG1F9ETLkzNaOJDBT+B1S8oEdIaMKF1aQACiAm5tMOVQEgZiiGlR4zRo75/H2V8j1gAS5wgbOKrj7NdiJ6AR6thBPj+5w/DdzokQHQAEEAsuEo4QpGDa/CZmMRHbFsRVHrhKvVwqYVVtbiqa1zup1bvl9zeMbV6v+T2jrc/eUAX+4+8fIZiD0AAMWFLIPgSB7ocKe05UmZXYKUgKEFh6/EiJzyYPHJ1S2zCHQUDCwACiAm5x0ssIGYYBlcbD1vvF109qARDb8+hJ0JsCZNQwsOXkEfBwACAAGIhp2ok1HNGb0sit/UIlbD4hmCQq2RSSzjkxAdqa4pb4lTqAMT5QCwAxI1ArADE8UjyF4C4EMpeD8QTgfgAlL8fSh+A6k3Ao5dYUADE/kD8AaoXRPdD3QWyewNUHcgufSTzDaB4wWBOgAABxIStQ0CNXiJyQiTGrCN95gyqiop4OxrklmIk6qkH4kQgdgTiB9AIdITKOSJFcAA0QcWj6XeEJg4HPHqJBf1IehOREt9CqFg8NJExQBOpANRuBihbnqapJ9T5PxhTAAACiAk94SGXWsTOjBDSi88sZPvR538pBeilJnLb8uHG3/i0wkrAB3jU+ENLIAMkMQFowlMgoJdYADJ7AlJpBhODlbgToe6A2XcQmjFoD5ATHgWJECCAmHAlKmJLQFxjgrg6K5QAUjoX+AauCQBQyfIQiOdDqzVsAFbSfIAmhgAk8Xyo2AMqRrcBtGQ2gNqJLcNshFbH8UOpDQgQQEy4SjRsJSOpHRRizSBQGmEkKljJhq1qRRbHVW2DqnqOr2b47F0ArfJwRWYANLHthyYKf6g4KNEFIslTK/EtQCr1GJDM9oeWeg7QBLoerRqmHVi9lxErm0QAEEAs+Hqx2PjI4qTM/xIDQAtLYQsI0KtO9KEWQu07CoZh9iOxG/FUv4FIpdx5NPmJ0FKpkcIgKYSWxLBSbyNUDJbQDkDlLkAzDKwzAmufJkATJwNSW5Q2iZBMABBAjLiW5GNLgPiqVGwJlFjwcpkhvAOCvBiB2GoZW2LEVfqBFyRAV1CDesObti4aXRE9gAAggJiwtf3IGRskpB5XhwVWDSJ3QPBNxcHk8LUH8SU+WnR2RgH5ACCAmHD1VPENNhMq4YiZH8Ymhi9hQFa5/ERZ4ULFoZdRMEAAIICY8HUkiF0LiCyPa6YDVzUO6gzgG/9DBrCqGV/iQl+aRUypCm6LRDL+J7RamRoAlz2glcqE9nFQA+CyR19I5L8uENPafnR7AAKIhZg1faQuTCCmDYisBrndhy2hYBPDNcwCEsemHt18kJ2w1TejgAG8V+P///90twcggFiQOxCkdh4IdThw7R9GZr9ESmTY5oBJqWrREx6ubZywHvcoQE0Y/wbAHoAAYsG3rIrYxIUvYRKzegaUGLC1/0hdF4gr8WEzB1T6sYueGE15UIC+V4Ne9gAEEAs1Eh+uZfbEVN3iUecZbi+DClzC3ylBTkj4SjdCiQ9W+gm4so+mPHjCIG/7JaX2AAQQyathCPVwYb1pUk5XQE6EyOOB6AkG21ANriob26kJmKXfaAKEAdBe4L//mWhuD/qeEIAAYsHXeSB2TR+lnRZYIgSNCd6+j0gkyAkSX1WNXvXiSnwwM39wn2IQx1H64eoJU/tkBHy9VGzi1D4ZAR1wMbOCaUsxyf/UOBkhSEHlPzsTEwMHMwvYrC9//jB8/f0bY08IQACxkNrGo8a0G67SUd4fFAiQhMjP9Q+aaJD0ETFcg574kHu6oIQHAjCzRwECcLKwgA7SACaPvwx/gAnmDzCIfv8DHa4BzExk9I4hpyEwMbAwARPcPyac1TtAAOGdikOuUolJfLgSFq5pPWLamXtmMsITzM/XFvCEiH56AmyKDX1oBZToQPo/fkNULy7p/+H2jx5ONLAAIIBwno6Fq0rGt3EJ37Fo6ImZmKofmzgoQYIGr3EBUNsOObHBEq9pLCNW+0ePZxtYABBgAEdytom0/RTgAAAAAElFTkSuQmCC';
  spritesheet.onload = loaded;
}

// the spritesheet is ready
function loaded()
{
  console.log('Spritesheet loaded.');
  spritesheetLoaded = true;
  createWorld();
}

// fill the world with walls
function createWorld()
{
  console.log('Creating world...');

  // create emptiness
  for (var x = 0; x < worldWidth; x++)
  {
    world[x] = [];

    for (var y = 0; y < worldHeight; y++)
    {
      var i = y * 60 + x;
      if (i <= 2399)
      {
        world[x][y] = map[i].t;
      }
      else
      {
        world[x][y] = 'Sea';
      }
    }
  }

  // scatter some walls
  /*  for (var x=0; x < worldWidth; x++)
    {
      for (var y=0; y < worldHeight; y++)
      {
        if (Math.random() > 0.75)
        world[x][y] = 1;
      }
    }*/

  // calculate initial possible path
  // note: unlikely but possible to never find one...
  currentPath = [];
  while (currentPath.length == 0)
  {
    pathStart = [Math.floor(Math.random() * worldWidth), Math.floor(Math.random() * worldHeight)];
    pathEnd = [Math.floor(Math.random() * worldWidth), Math.floor(Math.random() * worldHeight)];
    if (world[pathStart[0]][pathStart[1]] !== 'Sea')
      currentPath = findPath(world, pathStart, pathEnd);
  }

}

function redraw(store, colour)
{
  if (!spritesheetLoaded) return;

  console.log('redrawing...');
  if (store !== 0)
  {
    var spriteNum = 0;


    // draw the path
    console.log('Current path length: ' + currentPath.length);
    for (rp = 0; rp < currentPath.length; rp++)
    {
      switch (rp)
      {
        case 0:

          var rect = new Kinetic.Circle(
          {
            radius: 20,
            x: currentPath[rp][0] * tileWidth + 5,
            y: currentPath[rp][1] * tileHeight + 5,
            stroke: 'red',
            strokeWidth: 4
          });
          mouselayer.add(rect); // start
          break;
        case currentPath.length - 1:

          var rect = new Kinetic.Circle(
          {
            radius: 20,
            x: currentPath[rp][0] * tileWidth + 5,
            y: currentPath[rp][1] * tileHeight + 5,
            stroke: 'green',
            strokeWidth: 4
          });
          mouselayer.add(rect);
          break;
        default:
          var rect = new Kinetic.Rect(
          {
            fill: colour,
            x: currentPath[rp][0] * tileWidth + 2.5,
            y: currentPath[rp][1] * tileHeight + 2.5,
            width: 5,
            height: 5,
            stroke: 0.5
          });

          mouselayer.add(rect);
          break;
      }

    }
    /*ctx.drawImage(spritesheet,
    spriteNum*tileWidth, 0,
    tileWidth, tileHeight,
    currentPath[rp][0]*tileWidth,
    currentPath[rp][1]*tileHeight,
    tileWidth, tileHeight);*/
  }

  if (store == 0)
  {
    stage.add(mouselayer);
  }
}

// handle click events on the canvas
function canvasClick(e)
{
  var x;
  var y;

  // grab html page coords
  if (e.pageX != undefined && e.pageY != undefined)
  {
    x = e.pageX;
    y = e.pageY;
  }
  else
  {
    x = e.clientX + document.body.scrollLeft +
      document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop +
      document.documentElement.scrollTop;
  }

  // make them relative to the canvas only
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  // return tile x,y that we clicked
  var cell = [
    Math.floor(x / tileWidth),
    Math.floor(y / tileHeight)
  ];

  // now we know while tile we clicked
  console.log('we clicked tile ' + cell[0] + ',' + cell[1]);

  pathStart = pathEnd;
  pathEnd = cell;

  // calculate path
  currentPath = findPath(world, pathStart, pathEnd);
  mouselayer.removeChildren();
  redraw(1, 'white');
  redraw(0, 'white');
}

// world is a 2d array of integers (eg world[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
function findPath(world, pathStart, pathEnd)
  {
    // shortcuts for speed
    var abs = Math.abs;
    var max = Math.max;
    var pow = Math.pow;
    var sqrt = Math.sqrt;

    // the world data are integers:
    // anything higher than this number is considered blocked
    // this is handy is you use numbered sprites, more than one
    // of which is walkable road, grass, mud, etc
    var maxWalkableTileNum = 0;

    // keep track of the world dimensions
    // Note that this A-star implementation expects the world array to be square: 
    // it must have equal height and width. If your game world is rectangular, 
    // just fill the array with dummy values to pad the empty space.
    var worldWidth = world[0].length;
    var worldHeight = world.length;
    var worldSize = worldWidth * worldHeight;

    // which heuristic should we use?
    // default: no diagonals (Manhattan)
    /*  var distanceFunction = ManhattanDistance;
      var findNeighbours = function(){}; 
      var distanceFunction = DiagonalDistance;
      var findNeighbours = DiagonalNeighboursFree;*/
    var distanceFunction = EuclideanDistance;
    var findNeighbours = DiagonalNeighboursFree;

    /*

  // alternate heuristics, depending on your game:

  // diagonals allowed but no sqeezing through cracks:
  var distanceFunction = DiagonalDistance;
  var findNeighbours = DiagonalNeighbours;

  // diagonals and squeezing through cracks allowed:


  // euclidean but no squeezing through cracks:
  var distanceFunction = EuclideanDistance;
  var findNeighbours = DiagonalNeighbours;

  // euclidean and squeezing through cracks allowed:
  var distanceFunction = EuclideanDistance;
  var findNeighbours = DiagonalNeighboursFree;

  */

    // distanceFunction functions
    // these return how far away a point is to another

    function ManhattanDistance(Point, Goal)
    { // linear movement - no diagonals - just cardinal directions (NSEW)
      return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
    }

    function DiagonalDistance(Point, Goal)
    { // diagonal movement - assumes diag dist is 1, same as cardinals
      return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
    }

    function EuclideanDistance(Point, Goal)
    { // diagonals are considered a little farther than cardinal directions
      // diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
      // where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
      return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
    }

    // Neighbours functions, used by findNeighbours function
    // to locate adjacent available cells that aren't blocked

    // Returns every available North, South, East or West
    // cell that is empty. No diagonals,
    // unless distanceFunction function is not Manhattan
    function Neighbours(x, y)
    {
      var N = y - 1,
        S = y + 1,
        E = x + 1,
        W = x - 1,
        myN = N > -1 && canWalkHere(x, N),
        myS = S < worldHeight && canWalkHere(x, S),
        myE = E < worldWidth && canWalkHere(E, y),
        myW = W > -1 && canWalkHere(W, y),
        result = [];
      if (myN)
        result.push(
        {
          x: x,
          y: N
        });
      if (myE)
        result.push(
        {
          x: E,
          y: y
        });
      if (myS)
        result.push(
        {
          x: x,
          y: S
        });
      if (myW)
        result.push(
        {
          x: W,
          y: y
        });
      findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
      return result;
    }

    // returns every available North East, South East,
    // South West or North West cell - no squeezing through
    // "cracks" between two diagonals
    function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result)
    {
      if (myN)
      {
        if (myE && canWalkHere(E, N))
          result.push(
          {
            x: E,
            y: N
          });
        if (myW && canWalkHere(W, N))
          result.push(
          {
            x: W,
            y: N
          });
      }
      if (myS)
      {
        if (myE && canWalkHere(E, S))
          result.push(
          {
            x: E,
            y: S
          });
        if (myW && canWalkHere(W, S))
          result.push(
          {
            x: W,
            y: S
          });
      }
    }

    // returns every available North East, South East,
    // South West or North West cell including the times that
    // you would be squeezing through a "crack"
    function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result)
    {
      myN = N > -1;
      myS = S < worldHeight;
      myE = E < worldWidth;
      myW = W > -1;
      if (myE)
      {
        if (myN && canWalkHere(E, N))
          result.push(
          {
            x: E,
            y: N
          });
        if (myS && canWalkHere(E, S))
          result.push(
          {
            x: E,
            y: S
          });
      }
      if (myW)
      {
        if (myN && canWalkHere(W, N))
          result.push(
          {
            x: W,
            y: N
          });
        if (myS && canWalkHere(W, S))
          result.push(
          {
            x: W,
            y: S
          });
      }
    }

    // returns boolean value (world cell is available and open)
    function canWalkHere(x, y)
    {
      return ((world[x] != null) &&
        (world[x][y] != null) &&
        (world[x][y] !== 'Sea') &&
        (world[x][y] !== 'Mountain'));
    };

    // Node function, returns a new object with Node properties
    // Used in the calculatePath function to store route costs, etc.
    function Node(Parent, Point)
    {
      var newNode = {
        // pointer to another Node object
        Parent: Parent,
        // array index of this Node in the world linear array
        value: Point.x + (Point.y * worldWidth),
        // the location coordinates of this Node
        x: Point.x,
        y: Point.y,
        // the heuristic estimated cost
        // of an entire path using this node
        f: 0,
        // the distanceFunction cost to get
        // from the starting point to this node
        g: 0
      };

      return newNode;
    }

    // Path function, executes AStar algorithm operations
    function calculatePath()
    {
      // create Nodes from the Start and End x,y coordinates
      var mypathStart = Node(null,
      {
        x: pathStart[0],
        y: pathStart[1]
      });
      var mypathEnd = Node(null,
      {
        x: pathEnd[0],
        y: pathEnd[1]
      });
      // create an array that will contain all world cells
      var AStar = new Array(worldSize);
      // list of currently open Nodes
      var Open = [mypathStart];
      // list of closed Nodes
      var Closed = [];
      // list of the final output array
      var result = [];
      // reference to a Node (that is nearby)
      var myNeighbours;
      // reference to a Node (that we are considering now)
      var myNode;
      // reference to a Node (that starts a path in question)
      var myPath;
      // temp integer variables used in the calculations
      var length, max, min, i, j;
      // iterate through the open list until none are left
      while (length = Open.length)
      {
        max = worldSize;
        min = -1;
        for (i = 0; i < length; i++)
        {
          if (Open[i].f < max)
          {
            max = Open[i].f;
            min = i;
          }
        }
        // grab the next node and remove it from Open array
        myNode = Open.splice(min, 1)[0];
        // is it the destination node?
        if (myNode.value === mypathEnd.value)
        {
          myPath = Closed[Closed.push(myNode) - 1];
          do {
            result.push([myPath.x, myPath.y]);
          }
          while (myPath = myPath.Parent);
          // clear the working arrays
          AStar = Closed = Open = [];
          // we want to return start to finish
          result.reverse();
        }
        else // not the destination
        {
          // find which nearby nodes are walkable
          myNeighbours = Neighbours(myNode.x, myNode.y);
          // test each one that hasn't been tried already
          for (i = 0, j = myNeighbours.length; i < j; i++)
          {
            myPath = Node(myNode, myNeighbours[i]);
            if (!AStar[myPath.value])
            {
              // estimated cost of this particular route so far
              myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
              // estimated cost of entire guessed route to the destination
              myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
              // remember this new path for testing above
              Open.push(myPath);
              // mark this node in the world graph as visited
              AStar[myPath.value] = true;
            }
          }
          // remember this route as having no more untested options
          Closed.push(myNode);
        }
      } // keep iterating until the Open list is empty
      return result;
    }

    // actually calculate the a-star path!
    // this returns an array of coordinates
    // that is empty if no path is possible
    return calculatePath();

  } // end of findPath() function

// start running immediately


// This is a port of Ken Perlin's Java code. The
// original Java code is at http://cs.nyu.edu/%7Eperlin/noise/.
// Note that in this version, a number from 0 to 1 is returned.
PerlinNoise = new function()
{

  this.noise = function(x, y, z)
  {

    var p = new Array(512)
    var permutation = [151, 160, 137, 91, 90, 15,
      131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
      190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
      88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
      77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
      102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
      135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
      5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
      223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
      129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
      251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
      49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
      138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
    ];
    for (var i = 0; i < 256; i++)
      p[256 + i] = p[i] = permutation[i];

    var X = Math.floor(x) & 255, // FIND UNIT CUBE THAT
      Y = Math.floor(y) & 255, // CONTAINS POINT.
      Z = Math.floor(z) & 255;
    x -= Math.floor(x); // FIND RELATIVE X,Y,Z
    y -= Math.floor(y); // OF POINT IN CUBE.
    z -= Math.floor(z);
    var u = fade(x), // COMPUTE FADE CURVES
      v = fade(y), // FOR EACH OF X,Y,Z.
      w = fade(z);
    var A = p[X] + Y,
      AA = p[A] + Z,
      AB = p[A + 1] + Z, // HASH COORDINATES OF
      B = p[X + 1] + Y,
      BA = p[B] + Z,
      BB = p[B + 1] + Z; // THE 8 CUBE CORNERS,

    return scale(lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), // AND ADD
          grad(p[BA], x - 1, y, z)), // BLENDED
        lerp(u, grad(p[AB], x, y - 1, z), // RESULTS
          grad(p[BB], x - 1, y - 1, z))), // FROM  8
      lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), // CORNERS
          grad(p[BA + 1], x - 1, y, z - 1)), // OF CUBE
        lerp(u, grad(p[AB + 1], x, y - 1, z - 1),
          grad(p[BB + 1], x - 1, y - 1, z - 1)))));
  }

  function fade(t)
  {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(t, a, b)
  {
    return a + t * (b - a);
  }

  function grad(hash, x, y, z)
  {
    var h = hash & 15; // CONVERT LO 4 BITS OF HASH CODE
    var u = h < 8 ? x : y, // INTO 12 GRADIENT DIRECTIONS.
      v = h < 4 ? y : h == 12 || h == 14 ? x : z;
    return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
  }

  function scale(n)
  {
    return (1 + n) / 2;
  }
}

function Construction(name, location, description, health, maxhealth, terrain_restrictions, building_requirements, size, size_used, producing, cost, efficiency, upgrades, terrain_requirements)
{
  this.name = name;
  this.location = location;
  this.description = description;
  this.health = health;
  this.maxhealth = maxhealth;
  this.restrictions = terrain_restrictions;
  this.building_requirements = building_requirements;
  this.size = size;
  this.size_used = size_used;
  this.producing = producing;
  this.cost = cost;
  this.efficiency = efficiency;
  this.upgrades=upgrades;
  this.terrain_requirements=terrain_requirements;
}


var con = new Construction('Woodcutters_Hut', 0, 'Cuts down trees to produce Wood', 800, 800, ['Sea','Mountain'], [], 1, 0, [], [{name:'Wood',amount:25},{name:'Stone',amount:25}], 1, [], []);
constructions.push(con);
con = new Construction('Quarry', 0, 'The Quarry mines stone.', 800, 800, ['Sea','Mountain'], [], 1, 0, [], [{name:'Wood',amount:25},{name:'Stone',amount:25}], 1, [], []);
constructions.push(con);


function update_constructions() {
  var con = new Construction('Watchtower', 0, 'The Watchtower informs you of hostile forces mobilizing in its radius. A well placed network of towers can provide a valuable early warning system.', 500, 500, ['Sea', 'Mountain'], [], 1, 0, [], [{name:'Wood',amount:100},{name:'Stone',amount:25}], 1, [], []);
  constructions.push(con);
  con = new Construction('Walls', 0, 'A basic defence. Sizeable increase in the defence of the tile it is built on.', 5000, 5000, ['Sea', 'Mountain'], [], 1, 0, [], [{name:'Wood',amount:200},{name:'Stone',amount:100}], 1, [], []);
  constructions.push(con);
  con = new Construction('Granary', 0, 'The Granary processes food from your farms, position close to farms and ensure it is protected', 1000, 1000, ['Sea', 'Mountain'], [], 1, 0, [], [{name:'Wood',amount:50},{name:'Stone',amount:50}], 1, [], []);
  constructions.push(con);
  con = new Construction('Farm', 0, 'The Farm produces raw unprocessed food.', 250, 250, ['Sea', 'Mountain'], [], 1, 0, [], [{name:'Wood',amount:50},{name:'Stone',amount:50}], 1, [], []);
  constructions.push(con);
  con = new Construction('Hunters_Hut', 0, 'Produces meat, delicious yummy meat', 800, 800, ['Sea','Mountain'], [], 1, 0, [], [{name:'Wood',amount:125},{name:'Stone',amount:25}], 1, [], []);
  constructions.push(con);
  con = new Construction('Fishermans_Hut', 0, 'Murders fish, yummy, yummy fish.', 800, 800, ['Sea','Mountain'], [], 1, 0, [], [{name:'Wood',amount:80},{name:'Stone',amount:20}], 1, [], ['Sea']);
  constructions.push(con);
  con = new Construction('Mine', 0, 'The Mine mines minerals', 1000, 1000, ['Sea'], [], 1, 0, [], [{name:'Wood',amount:50},{name:'Stone',amount:150}], 1, [], []);
  constructions.push(con);
  con = new Construction('Smelter', 0, 'The Smelty does smelty things', 1000, 1000, ['Sea','Mountain'], [], 1, 0, [], [{name:'Wood',amount:120},{name:'Stone',amount:60}], 1, [], []);
  constructions.push(con);
}

function map_tile(index, xcord, ycord, terrain, height, temperature, rain, resources, land, free_land, red, green, blue)
{
  this.index = index;
  this.x = xcord;
  this.y = ycord;
  this.t = terrain;
  this.h = height;
  this.te = temperature;
  this.rain = rain;
  this.resources = resources;
  this.land = land;
  this.free_land = free_land;
  this.red = red;
  this.green = green;
  this.blue = blue;
}


function resource(type, amount, exact)
{
  this.type = type;
  this.amount = amount;
  this.exact = exact;
}

function capital(location, restrictions)
{
  this.location = location;
  this.restrictions = restrictions
}

var capital = new capital(0, ['Mountain', 'Sea']);

function make_map() {
  $('#loading').append("...CREATING MAP INFORMATION ");
  var x2 = Math.floor(Math.random() * 10000);
  var y2 = Math.floor(Math.random() * 10000);
  var x3 = Math.floor(Math.random() * 10000);
  var y3 = Math.floor(Math.random() * 10000);
  var x4 = Math.floor(Math.random() * 10000);
  var y4 = Math.floor(Math.random() * 10000);

  for (var y = y2; y < (y2 + 40); y++)
  {
    for (var x = x2; x < (x2 + 60); x++)
    {
      var height = PerlinNoise.noise(x / 15, y / 15, 0.5);
      var temp = PerlinNoise.noise((x3 + x) / 15, (y3 + y) / 15, 0.5);
      var rain = PerlinNoise.noise((x4 + x) / 20, (y4 + y) / 20, 0.5);
      var red = 0;
      var green = 0;
      var blue = 0;
      var i = ((y - y2) * 60 + (x - x2));
      if (height < 0.44)
      {
        var terrain = 'Sea';
        red = Math.floor(130 * height);
        green = Math.floor(170 * height);
        blue = 255;
      }
      else if (height < 0.7)
      {
        terrain = 'Land';
        red = Math.floor(80 - (height * 100));

        green = Math.floor(200 - (height * 150));
        blue = Math.floor(110 - (height * 120));
      }
      else
      {
        terrain = 'Mountain';
        red = Math.floor(150 - (height * 100));
        green = Math.floor(150 - (height * 100));
        blue = Math.floor(150 - (height * 100))
      }

      if (temp > 0.65 && temp < 1 && rain > 0 && rain < 0.45 && height < 0.7 && height > 0.44) //desert
      {
        red = Math.floor(250 - height * 100);
        green = Math.floor(140 - height * 100);
        blue = Math.floor(90 - height * 80);
        terrain = 'Desert'
      }
      else
      if (temp > 0.65 && temp < 1 && rain > 0.45 && rain < 0.6 && height < 0.7 && height > 0.44) //savanna
      {
        red = Math.floor(200 - height * 100);
        green = Math.floor(190 - height * 100);
        blue = Math.floor(60 - height * 50);
        terrain = 'Savanna'
      }
      else
      if (temp > 0.65 && temp < 1 && rain > 0.6 && rain < 0.74 && height < 0.7 && height > 0.44) //seasonal forest
      {
        red = Math.floor(110 - height * 50);
        green = Math.floor(150 - height * 50);
        blue = Math.floor(30 - height * 30);
        terrain = 'Seasonal Forest'
      }
      else
      if (temp > 0.65 && temp < 1 && rain > 0.74 && rain < 1 && height < 0.7 && height > 0.44) // rain forest
      {
        red = Math.floor(50 - height * 30);
        green = Math.floor(130 - height * 100);
        blue = Math.floor(30 - height * 30);
        terrain = 'Rain Forest'
      }
      else
      if (temp > 0.5 && temp < 0.65 && rain > 0.4 && rain < 0.53 && height < 0.7 && height > 0.44) //woods
      {
        red = Math.floor(90 - height * 90);
        green = Math.floor(190 - height * 100);
        blue = Math.floor(60 - height * 80);
        terrain = 'Woods'
      }
      else
      if (temp > 0.5 && temp < 0.65 && rain > 0.53 && rain < 0.6 && height < 0.7 && height > 0.44) //forest
      {
        red = Math.floor(80 - (height * 100));
        green = Math.floor(200 - (height * 150));
        blue = Math.floor(110 - (height * 120));
        terrain = 'Forest'
      }
      else
      if (temp > 0.5 && temp < 0.65 && rain > 0.6 && rain < 1 && height < 0.7 && height > 0.44) //swamp
      {
        red = Math.floor(0);
        green = Math.floor(140 - (height * 60));
        blue = Math.floor(70 - (height * 40));
        terrain = 'Swamp'
      }
      else
      if (temp > 0.4 && temp < 0.5 && rain > 0 && rain < 0.45 && height < 0.7 && height > 0.44) //grass desert
      {
        red = Math.floor(160 - (height * 60));
        green = Math.floor(225 - (height * 60));
        blue = Math.floor(50 - (height * 60));
        terrain = 'Grass Desert'
      }
      else
      if (temp > 0.4 && temp < 0.5 && rain > 0.45 && rain < 0.75 && height < 0.7 && height > 0.44) //taiga
      {
        red = Math.floor(190 - (height * 80));
        green = Math.floor(130 - (height * 80));
        blue = Math.floor(222 - (height * 80));
        terrain = 'Taiga'
      }
      else
      if (temp > 0 && temp < 0.4 && rain > 0.0 && rain < 0.45 && height < 0.7 && height > 0.44) //tundra
      {
        red = Math.floor(150 - (height * 60));
        green = Math.floor(222 - (height * 80));
        blue = Math.floor(222 - (height * 80));
        terrain = 'Tundra'
      }
      var m = new map_tile(i, x - x2, y - y2, terrain, height, temp, rain, [], 100, 0, red, green, blue);
      map.push(m);
    }
  }
  set_resource('Copper', 1000, 1, 7, []);
  set_resource('Tin', 1000, 1, 7, []);
  set_resource('Iron', 1000, 1, 7, []);
  set_resource('Trees', 6000, 0, 7, ['Mountain', 'Sea']);
  set_resource('Coal', 2000, 1, 7, []);

  stage = new Kinetic.Stage(
      {
        width: 600,
        height: 400,
        container: 'canvas'
      });
  setTimeout(function() {generate_map_colour_cache()}, 0);
}


$(window).load(function()
{
  $('#loading').append(" ...CACHING IMAGES <span id='img_number'></span>");
  preload(['Atlatl.png','Blast_Furnace.png','Bloomery.png','Bows.png','Clearcut_Harvesting.png','Crop_Rotation.png','Farm.png','Fertilizer.png','Finery_Forge.png','Fish_Spears.png','Fish_Traps.png','Fishermans_Hut.png','Granary.png','Hunters_Hut.png','Hydraulic_Mining.png','Irrigation.png','Kiln.png','Log_Driving.png','Mine.png','Open_Pit_Mining.png','Pit_Sawing.png','Pumps.png','Quarry.png','Sawmill.png','Seed_Bank.png','Seed_Tree_Harvesting.png','Shelterwood_Harvesting.png','Single_Tree_Selection_Harvesting.png','Smelter.png','Snares.png','Stone_Ground_Milling.png','Stone_Ovens.png','Various_Flour_Types.png','Walls.png','Watchtower.png','Water_Power.png','Weirs.png','Woodcutters_Hut.png']);
});

function img_number(length) {
  imgnumber += 1;
  $('#img_number').text("" + imgnumber + "/" + length + "");
}

function preload(arrayOfImages) {
    $('<img />').attr('src','background_' + arrayOfImages[0]).appendTo('#imgstore');
  img_number(38);
  if (arrayOfImages.length > 1) {
    setTimeout(function () {
      arrayOfImages.shift();
      preload(arrayOfImages)
    }, 50);
  } else {
    setTimeout(function() {make_map();}, 0);
  }
}
var imgnumber = 0;

function add_features() {
	for (var x = 0; x < 40; x++)
    {
		var tile = map[Math.floor(Math.random()*map.length)];
		if (tile.t == 'Sea') {} else {
			var name = feature_names[Math.floor(Math.random()*feature_names.length)];
			var thing = new feature(name,tile.index,[]);
			map_features.push(thing)
		}
	}
}
var prepare_land = {cost:[{name:'Wood',amount:50},{name:'Stone',amount:50}]};
var expand = {cost:[{name:'Wood',amount:25},{name:'Stone',amount:25}]};

function update_cursor(change)
{
  $('#aToolTip').remove();
  var i = cursor.index;
  var ii = i + change;
  if (ii >= 0 && ii < 2400)
  {
    cursor.index = ii;
    var rect = new Kinetic.Rect(
    {
      fill: 'white',
      x: map[ii].x * 10,
      y: map[ii].y * 10,
      width: 10,
      height: 10
    });
    locationlayer.remove();
    mouselayer.removeChildren();
    mouselayer.remove();
    mouselayer.add(rect);
    stage.add(mouselayer);
    if (capital.location !== 0)
    {
      $('#information').empty();
      $('#building_information_tab').empty();
      $('#tab_building_information').empty();
      $('#tab_building_upgrades').empty();
      $('#information').append("<table><tr><td><span style='color: orange;'>Location: </span>" + map[ii].t + "." + "<br><span style='color: orange;'>Height:</span> " + map[ii].h.toFixed(2) + "<br><span style='color: orange;'>Temperature:</span> " + map[ii].te.toFixed(2) + "." + "<br><span style='color: orange;'>Rainfall:</span> " + map[ii].rain.toFixed(2) + "." + " <br><span style='color: orange;'>Land: </span>" + map[ii].free_land + " available out of " + map[ii].land + "<br><span class='resources' style='color: orange;'>Resources: </span></td><td><button class='prepare_land' index=" + ii + ">PREPARE LAND</button></td></tr></table>");
      var string = '';
      $.each(prepare_land.cost, function(m, k) {
        string += '<span id=tooltip_' + k.name + '>' + k.name + ': ' + k.amount + '. </span>'
      });
      $('.prepare_land').aToolTip({
        // no need to change/override
        closeTipBtn: 'aToolTipCloseBtn',
        toolTipId: 'aToolTip',
        // ok to override
        fixed: true,                   // Set true to activate fixed position
        clickIt: false,                 // set to true for click activated tooltip
        inSpeed: 0,                   // Speed tooltip fades in
        outSpeed: 0,                  // Speed tooltip fades out
        tipContent: 'PREPARE LAND.<br>Prepare land for new buildings or building expansions.<br>' + string + '',       // Pass in content or it will use objects 'title' attribute
        toolTipClass: 'defaultTheme',   // Set class name for custom theme/styles
        xOffset: 5,                     // x position
        yOffset: 5,                     // y position
        onShow: function() {
          $.each(prepare_land.cost, function(m, k) {
            if (game[k.name] >= k.amount){
              $('#tooltip_' + k.name + '').css('color','lightgreen')
            } else {
              $('#tooltip_' + k.name + '').css('color','red')}
          });
        },                   // callback function that fires after atooltip has shown
        onHide: null                 // callback function that fires after atooltip has faded out
      });
      var feature_array = $.grep(map_features, function(grepItem) {
        return ii == grepItem.location;
      });
      $.each(feature_array, function(i, v) {
        $('#building_information_tab').append("<button style='background:url(background_" + v.name + ".png)' class='feature'></button>");
      });

      $('#building_information_tab').append("<table class='tablestuff' style='width:400px'><tr><th style='width:200px'><h3 style='margin:10px auto;'><span style='color: orange;margin:0 auto;'>POSSIBLE CONSTRUCTIONS</span></h3></th><th style='width:200px'><h3 style='margin:10px auto;'><span style='color:orange;orange;margin:0 auto;'>CURRENT CONSTRUCTIONS</span></h3></th></tr><tr><td><span id='possible_constructions'></span></td><td><span id='current_constructions'></span></td></tr></table><div id='building_view'></div><div id='connections_view'></div>");
      $.each(map[ii].resources, function(i, v)
      {
        $('.resources').append("<span style='color:lightblue;'>" + v.amount + " " + v.type + ".</span>  ");
      });

     $.each(buildings_master, function(i, v)
    {
      if (v.location == ii){
      $('#current_constructions').append("<button style='background:url(background_" + v.name + ".png)' data-name=" + v.name + " class='constructed_building_button' id="+ v.name+" data-tile=" + ii + "></button>");
        $('#'+ v.name+'').aToolTip({
          // no need to change/override
          closeTipBtn: 'aToolTipCloseBtn',
          toolTipId: 'aToolTip',
          // ok to override
          fixed: true,                   // Set true to activate fixed position
          clickIt: false,                 // set to true for click activated tooltip
          inSpeed: 0,                   // Speed tooltip fades in
          outSpeed: 0,                  // Speed tooltip fades out
          tipContent: ''+ v.name+'.<br>'+ v.description+'',                 // Pass in content or it will use objects 'title' attribute
          toolTipClass: 'defaultTheme',   // Set class name for custom theme/styles
          xOffset: 5,                     // x position
          yOffset: 5,                     // y position
          onShow: function() {
            $.each(v.cost, function(m, k) {
              if (game[k.name] >= k.amount){
                $('#tooltip_' + k.name + '').css('color','lightgreen')
              } else {
                $('#tooltip_' + k.name + '').css('color','red')}
            });
          },                   // callback function that fires after atooltip has shown
          onHide: null                 // callback function that fires after atooltip has faded out
        });
      }
    });

      var possible_buildings = [];
      var arr2 = $.grep(buildings_master, function(grepItem) {
        return ii == grepItem.location;
      });

      possible_buildings = $.grep(constructions, function(grepItem)
      {
        return $.grep(arr2, function(bI)
            {
              return bI.name === grepItem.name
            }).length == 0;
      });
var map_surrounding_terrain = [ii-61,ii-60,ii-59,ii-1,ii,ii+1,ii+59,ii+60,ii+61];
      var map_surround_t = [];
      $.each(map_surrounding_terrain, function(idx, v)
      {
        if (v >= 0 && v <= 2399) {
          if (map[v].x >= map[ii].x - 1 && map[v].x <= map[ii].x+1){
          map_surround_t.push(map[v].t)}
        }
      });
	  var arr3 = arr2.map(function(val) { return val.name; });
      $.each(possible_buildings, function(idx, v)
      {
		  var isSuperset = v.building_requirements.every(function (val) {
        return arr3.indexOf(val) >= 0;});
        var isSuperset2 = v.terrain_requirements.every(function (val) {
          return map_surround_t.indexOf(val) >= 0;});
        if ($.inArray(map[ii].t, v.restrictions) == -1 && isSuperset == true && isSuperset2 == true)
        {
          $('#possible_constructions').append("<button style='background:url(background_" + v.name + ".png)' name=" + v.name + " class='build' id="+ v.name+" index=" + ii + "></button>");
          var string = '';
          $.each(v.cost, function(m, k) {
            string += '<span id=tooltip_' + k.name + '>' + k.name + ': ' + k.amount + '. </span>'
          });
          $('#'+ v.name+'').aToolTip({
            // no need to change/override
            closeTipBtn: 'aToolTipCloseBtn',
            toolTipId: 'aToolTip',
            // ok to override
            fixed: true,                   // Set true to activate fixed position
            clickIt: false,                 // set to true for click activated tooltip
            inSpeed: 0,                   // Speed tooltip fades in
            outSpeed: 0,                  // Speed tooltip fades out
            tipContent: ''+ v.name+'.<br>'+ v.description+'<br>' + string + '',                 // Pass in content or it will use objects 'title' attribute
            toolTipClass: 'defaultTheme',   // Set class name for custom theme/styles
            xOffset: 5,                     // x position
            yOffset: 5,                     // y position
            onShow: function() {
              $.each(v.cost, function(m, k) {
                if (game[k.name] >= k.amount){
                  $('#tooltip_' + k.name + '').css('color','lightgreen')
                } else {
                  $('#tooltip_' + k.name + '').css('color','red')}
              });
            },                   // callback function that fires after atooltip has shown
            onHide: null                 // callback function that fires after atooltip has faded out
          });
        }
      });
    }
    else
    {

      $('#information').empty();
      $('#building_information_tab').empty();

      $('#information').append("<span style='color: orange;'>Location: </span>" + map[ii].t + "." + "<br><span style='color: orange;'>Height:</span> " + map[ii].h.toFixed(2) + "<br><span style='color: orange;'>Temperature:</span> " + map[ii].te.toFixed(2) + "." + "<br><span style='color: orange;'>Rainfall:</span> " + map[ii].rain.toFixed(2) + "." + " <br><span style='color: orange;'>Free Land: </span>" + map[ii].land + "<br><span class='resources' style='color: orange;'>Resources: </span>");
      $.each(map[ii].resources, function(i, v)
      {
        $('.resources').append("<span style='color:lightblue;'>" + v.amount + " " + v.type + ".</span>  ");
      })
      if ($.inArray(map[ii].t, capital.restrictions) == -1)
      {
        $('#building_information_tab').append("<br><button class='build_capital' index=" + ii + ">SETTLE</button>");
      }
    }
  }
}


function damage_buildings()
{
  $.each(map[1].buildings, function(idx, item)
  {
    map[1].buildings[idx].health -= 50
  })
}


$(document).delegate("[class='prepare_land']", "click", function()
{
  var i = $(this).attr('index');
  if (map[i].free_land < map[i].land && game.Wood >= 50 && game.Stone >= 50 && buildings_master.length >= 2)
  {
    map[i].free_land += 1;
    game.Wood -= 50;
    game.Stone -= 50;
    update_cursor(0);
  }
  else
  {
    $('#tab_building_information').append("Cannot prepare land! Requires 1 Land, 50 wood and 50 stone!")
  }
});


$(document).delegate("[class='build']", "click", function()
{
  $('#aToolTip').remove();
  var i = $(this).attr('index');
  var b = $(this).attr('name');
  var index = constructions.map(function(el)
  {
    return el.name
  }).indexOf(b);

  var building = constructions[index];
  var number = 0;
  $.each(building.cost, function(j, v) {
    if (game[v.name] >= v.amount) {number += 1}
  });

  if (map[i].free_land >= constructions[index].size && building.cost.length == number)
  {
    $.each(building.cost, function(j, v) {
      game[v.name] -= v.amount;
    });
    map[i].free_land -= constructions[index].size;
    map[i].land -= constructions[index].size;
    $(this).remove();
    var newObject = $.extend(true, {}, constructions[index]);
    newObject.location = i;
    buildings_master.push(newObject);
    window[b + '_list'].push(newObject);
    if (Woodcutters_Hut_list.length !== 0 && Quarry_list.length !== 0 && constructions.length == 2) {
      update_constructions();
      }

    if (newObject.name == 'Farm')
    {
      var rect = new Kinetic.Rect(
      {
        fill: 'green',
        stroke: 'black',
        x: map[i].x * 10,
        y: map[i].y * 10,
        width: 5,
        height: 5
      });
      buildinglayer.add(rect);
      stage.add(buildinglayer);
    }
    else
    if (newObject.name == 'Granary')
    {
      rect = new Kinetic.Rect(
      {
        fill: 'red',
        stroke: 'black',
        x: map[i].x * 10 + 5,
        y: map[i].y * 10 + 5,
        width: 5,
        height: 5
      });
      buildinglayer.add(rect);
      stage.add(buildinglayer);
    }
    else if (newObject.name == 'Walls')
    {
      rect = new Kinetic.Rect(
      {
        fill: 'grey',
        stroke: 'black',
        x: map[i].x * 10 + 5,
        y: map[i].y * 10,
        width: 5,
        height: 5
      });
      buildinglayer.add(rect);
      stage.add(buildinglayer)
    }
   else if (newObject.name == 'Woodcutters_Hut')
    {
      rect = new Kinetic.Rect(
      {
        fill: 'white',
        stroke: 'black',
        x: map[i].x * 10 + 5,
        y: map[i].y * 10,
        width: 5,
        height: 5
      });
      buildinglayer.add(rect);
      stage.add(buildinglayer);
    }
    else if (newObject.name == 'Quarry')
    {
      rect = new Kinetic.Rect(
          {
            fill: 'green',
            stroke: 'black',
            x: map[i].x * 10,
            y: map[i].y * 10,
            width: 5,
            height: 5
          });
      buildinglayer.add(rect);
      stage.add(buildinglayer);
    }
   else if (newObject.name == 'Fishermans_Hut')
    {
      rect = new Kinetic.Rect(
      {
        fill: 'white',
        stroke: 'black',
        x: map[i].x * 10 + 5,
        y: map[i].y * 10,
        width: 5,
        height: 5
      });
      buildinglayer.add(rect);
      stage.add(buildinglayer);
    }
   else if (newObject.name == 'Hunters_Hut')
    {
      rect = new Kinetic.Rect(
      {
        fill: 'yellow',
        stroke: 'black',
        x: map[i].x * 10,
        y: map[i].y * 10,
        width: 5,
        height: 5
      });
      buildinglayer.add(rect);
      stage.add(buildinglayer);
    }
   else if (newObject.name == 'Sawmill')
    {
      rect = new Kinetic.Rect(
      {
        fill: 'brown',
        stroke: 'black',
        x: map[i].x * 10,
        y: map[i].y * 10,
        width: 5,
        height: 5
      });
      buildinglayer.add(rect);
      stage.add(buildinglayer);
    }
    else if (newObject.name == 'Watchtower')
    {
     rect = new Kinetic.Rect(
      {
        fill: 'blue',
        stroke: 'black',
        x: map[i].x * 10,
        y: map[i].y * 10 + 5,
        width: 5,
        height: 5
      });
      buildinglayer.add(rect);
      stage.add(buildinglayer);
    }
    update_cursor(0);
  }
  else
  {
    if (map[i].free_land < constructions[index].size)
    {
      $('#tab_building_information').append("Not enough prepared land to build on!")
    }
  }
});

$(document).delegate("[class='build_capital']", "click", function()
{
  var i = $(this).attr('index');
  capital.location = i;
  var rect = new Kinetic.Rect(
  {
    fill: 'black',
    x: map[i].x * 10 + 1,
    y: map[i].y * 10 + 1,
    width: 8,
    height: 8
  });
  map[i].free_land += 25;
  buildinglayer.add(rect);
  stage.add(buildinglayer);
  $('#tabs_building-container').show();
  update_cursor(0);
});

$(document).delegate("[class='constructed_building_button']", "click", function()
{
  $('#tab_building_information').empty();
  $('#tab_building_upgrades').empty();
  $('#connections_view').empty();
  var tile = $(this).attr('data-tile');
  var b = $(this).attr('data-name');
  for (var i = 0; i < buildings_master.length; i++) {
    var el = buildings_master[i];
    if (el.name == b && el.location == tile)
      break;
  }
  building_view(i);
});


var locationlayer = new Kinetic.Layer();

$(document).delegate("[class='building_tile_location_show']", "click", function()
{
  locationlayer.removeChildren();
  var i = $(this).attr('index');
  var index = $(this).attr('index2');
  var circle = new Kinetic.Circle(
  {
    radius: 30,
    x: map[i].x * 10 + 5,
    y: map[i].y * 10 + 5,
    stroke: 'black',
    strokeWidth: 4
  });
  locationlayer.add(circle);
  stage.add(locationlayer);

});

function building_view(i)
{

  $('#tab_building_information').empty();
  $('#tab_building_upgrades').empty();
  var building = buildings_master[i];
  var free = building.size - building.size_used;
  $('#tab_building_information').append("<h2 style='margin:0'>" + building.name + "</h2><button class='building_tile_location_show' data-tile=" + building.location + " >" +
  "" + building.location + "</button><progress value='" + building.health + "' max='" + building.maxhealth + "'>" +
  "" + "</progress><button class='farm_upgrade' data-building-index=" + i + ">EXPAND</button> <br>" +
  "Free : " + free + ". In use: " + building.size_used + " out of " + building.size + ".");

  var string = '';
  $.each(expand.cost, function(m, k) {
    string += '<span id=tooltip_' + k.name + '>' + k.name + ': ' + k.amount + '. </span>'
  });
  $('.farm_upgrade').aToolTip({
    // no need to change/override
    closeTipBtn: 'aToolTipCloseBtn',
    toolTipId: 'aToolTip',
    // ok to override
    fixed: true,                   // Set true to activate fixed position
    clickIt: false,                 // set to true for click activated tooltip
    inSpeed: 0,                   // Speed tooltip fades in
    outSpeed: 0,                  // Speed tooltip fades out
    tipContent: 'EXPAND.<br>Expand the building to allow more production.<br>' + string + '',       // Pass in content or it will use objects 'title' attribute
    toolTipClass: 'defaultTheme',   // Set class name for custom theme/styles
    xOffset: 5,                     // x position
    yOffset: 5,                     // y position
    onShow: function() {
      $.each(prepare_land.cost, function(m, k) {
        if (game[k.name] >= k.amount){
          $('#tooltip_' + k.name + '').css('color','lightgreen')
        } else {
          $('#tooltip_' + k.name + '').css('color','red')}
      });
    },                   // callback function that fires after atooltip has shown
    onHide: null                 // callback function that fires after atooltip has faded out
  });

  var produce_choices_possible = $.grep(produce_choices, function(n, j) {
    return ($.inArray(building.name, n.buildings_produce_possible) == !-1) });
  $.each(produce_choices_possible, function(j, v)
  {
    var check = building.producing.map(function(el)
    {
      return el.name
    }).indexOf(v.name);
    if (check == -1)
    {
      amount = 0
    }
    else
    {
      amount = building.producing[check].amount;
    }
        $('#tab_building_information').append("<br> <button class='increase_production' data-type=" + v.name + " data-tile=" + building.location + " data-building-index=" + i + ">+</button><button " +
        "class='decrease_production' data-type=" + v.name + " data-tile=" + building.location + " " +
        "data-building-index=" + i + ">-</button> Producing " + amount + " " + v.name + " <span style='color:lightgreen'> --  Efficiency: " + (building.efficiency*100).toFixed(0) + "%</span>");

  });
  $('#tab_building_upgrades').append("<br>Possible Upgrades:<br><span id='upgrades_possible'></span><br><br>Constructed Upgrades:<br><span id='upgrades_current'></span>");
  $.each(window[building.name+'_upgrades'], function(j, v) {
    if ($.inArray(v.name, building.upgrades) == -1) {
      $('#upgrades_possible').append("<button class='upgrade' id=" + v.name + " style='background:url(background_" + v.name + ".png)' data-upgrade-index=" + j + " data-upgrade-array=" + building.name+'_upgrades' + " data-building-index=" + i + "></button>")
    } else {$('#upgrades_current').append("<button class='upgrade_built' id=" + v.name + " data-upgrade-index=" + j + " style='background:url(background_" + v.name + ".png)' data-upgrade-array=" + building.name+'_upgrades' + " data-building-index=" + i + "></button>")}
    var string = '';
    $.each(v.cost, function(m, k) {
      string += '<span id=tooltip_' + k.name + '>' + k.name + ': ' + k.amount + '. </span>'
    });
    $('#'+ v.name+'').aToolTip({
      // no need to change/override
      closeTipBtn: 'aToolTipCloseBtn',
      toolTipId: 'aToolTip',
      // ok to override
      fixed: true,                   // Set true to activate fixed position
      clickIt: false,                 // set to true for click activated tooltip
      inSpeed: 0,                   // Speed tooltip fades in
      outSpeed: 0,                  // Speed tooltip fades out
      tipContent: ''+ v.name+'. <span style="color:lightgreen">+' + v.efficiency_mod*100 + '%</span>.<br>'+ v.description+'<br>' + string + '',                 // Pass in content or it will use objects 'title' attribute
      toolTipClass: 'defaultTheme',   // Set class name for custom theme/styles
      xOffset: 5,                     // x position
      yOffset: 5,                     // y position
      onShow: function() {
        $.each(v.cost, function(m, k) {
          if (game[k.name] >= k.amount){
            $('#tooltip_' + k.name + '').css('color','lightgreen')
          } else {
            $('#tooltip_' + k.name + '').css('color','red')}
        });
      },                   // callback function that fires after atooltip has shown
      onHide: null                 // callback function that fires after atooltip has faded out
    });

  })

}
$(document).ready(function() {
  $(".tabs-menu a").click(function(event) {
    event.preventDefault();
    $(this).parent().addClass("current");
    $(this).parent().siblings().removeClass("current");
    var tab = $(this).attr("href");
    $(".tab-content").not(tab).css("display", "none");
    $(tab).fadeIn();
  });
});

$(document).ready(function() {
  $(".tabs_main-menu a").click(function(event) {
    event.preventDefault();
    $(this).parent().addClass("current");
    $(this).parent().siblings().removeClass("current");
    var tab = $(this).attr("href");
    $(".tab_main-content").not(tab).css("display", "none");
    $(tab).fadeIn();
  });
});

$(document).ready(function() {
  $(".tabs_building-menu a").click(function(event) {
    event.preventDefault();
    $(this).parent().addClass("current");
    $(this).parent().siblings().removeClass("current");
    var tab = $(this).attr("href");
    $(".tab_building-content").not(tab).css("display", "none");
    $(tab).fadeIn();
  });
});

$(document).delegate("[class='upgrade']", "click", function()
{
  var index = $(this).attr('data-building-index');
  var upgrade_array = $(this).attr('data-upgrade-array');
  var upgrade_index = $(this).attr('data-upgrade-index');
  var upgrade = window[upgrade_array][upgrade_index];
  var building = buildings_master[index];
  var number = 0;
  $.each(upgrade.cost, function(j, v) {
    if (game[v.name] >= v.amount) {number += 1}
  });
  if (upgrade.cost.length == number) {
    $.each(upgrade.cost, function(j, v) {
      game[v.name] -= v.amount;
    });
    building.upgrades.push(upgrade.name);
    building.efficiency += upgrade.efficiency_mod;
    $('#aToolTip').remove();
    $(this).remove();
    building_view(index);
  }
});

$(document).delegate("[class='increase_production']", "click", function()
{
  var tile = $(this).attr('data-tile');
  var index = $(this).attr('data-building-index');
  var type = $(this).attr('data-type');
  var building = buildings_master[index];
  var check = building.producing.map(function(el)
  {
    return el.name
  }).indexOf(type);
  if (check == -1 && (building.size - building.size_used) >= 1)
  {
    building.size_used += 1;
    for (var i = 0; i < produce_choices.length; i++) {
      var el = produce_choices[i];
      if (el.name == type)
        break;
    }
    var object = new building_produce(type, 1, produce_choices[i].from_tile, produce_choices[i].recipe);
    building.producing.push(object);
    $('#tab_building_information').empty();
    $('#connections_view').empty();
    building_view(index);
  }
  else if (check !== -1 && (building.size - building.size_used) >= 1)
  {
    check = building.producing.map(function(el)
    {
      return el.name
    }).indexOf(type);
    building.producing[check].amount += 1;
    building.size_used += 1;
    $('#tab_building_information').empty();
    $('#connections_view').empty();
    building_view(index);
  }

});

$(document).delegate("[class='decrease_production']", "click", function()
{
  var tile = $(this).attr('data-tile');
  var index = $(this).attr('data-building-index');
  var type = $(this).attr('data-type');
  var building = buildings_master[index];
  var resource_in_use = 0;
  var check = building.producing.map(function(el)
  {
    return el.name
  }).indexOf(type);
  var new_arr = $.grep(connections, function(n, j)
  {
    return (n.from_tile == i && n.from_index == index && n.resources == type);
  });
  $.each(new_arr, function(j, v)
  {
    resource_in_use += Number(v.amount)
  });
  if (check !== -1 && building.producing[check].amount > 0 && resource_in_use < building.producing[check].amount)
  {
    check = building.producing.map(function(el)
    {
      return el.name
    }).indexOf(type);
    building.producing[check].amount -= 1;
    building.size_used -= 1;
    $('#tab_building_information').empty();
    $('#connections_view').empty();
    building_view(index);
  }
});

setInterval(function () {
  $.each(buildings_master, function(j, v) {
    if (v.producing.length !== 0) {
      $.each(v.producing, function (m, k) {
        if (k.from_tile.length == 0 && k.recipe.length == 0) {
          game[k.name] += k.amount * v.efficiency;
          game.Wealth += (k.amount * v.efficiency)/5
        } else if (k.from_tile.length > 0) {
          var location = v.location;
          for (var i = 0; i < map[location].resources.length; i++) {
            var el = map[location].resources[i];
            if (el.type == k.from_tile[0])
              break;
          }
          if (map[location].resources[i].amount >= k.amount * v.efficiency) {
            map[location].resources[i].amount -= k.amount * v.efficiency;
            game[k.name] += k.amount * v.efficiency;
            game.Wealth += (k.amount * v.efficiency)/5
          }
        } else if (k.recipe.length > 0) {
          var number = 0;
          $.each(k.recipe, function (r, t) {
            if (game[t.name] >= t.amount * k.amount) {
              number += 1;
            }
          });
          if (number == k.recipe.length) {
            $.each(k.recipe, function (r, t) {
              game[t.name] -= t.amount * k.amount;
            });
            game[k.name] += k.amount * v.efficiency;
            game.Wealth += (k.amount * v.efficiency)/5
          }
        }
      })
    }
  });
  $.each(game, function(j, v) {
    if (v > $('#' + j).text().match(/\d+/)) {$('#' + j).text('+' + Number(v).toFixed(0) + '+').css('color','lightgreen')} else
    if (v < $('#' + j).text().match(/\d+/)) {$('#' + j).text('-' + Number(v).toFixed(0) + '-').css('color','red')} else {$('#' + j).text('' + Number(v).toFixed(0) + '').css('color','white')}
  })
  if ($('#aToolTip').is(':visible')) {
    $("[id^='tooltip_']").each(function() {
      var value = $(this).attr('id').split("_").pop();
      var string = $(this).text();
      var numbers = string.match(/\d+/);
      if (Number(numbers) <= game[value]) {$(this).css('color','lightgreen')} else {$(this).css('color','red')}
    });
  }
}, 1000);

$(document).delegate("[class='farm_upgrade']", "click", function()
{
  var index = $(this).attr('data-building-index');
  var building = buildings_master[index];
  var tile = building.location;
  if (map[tile].free_land > 0 && game.Wood >= 25 && game.Stone >= 25 && Woodcutters_Hut_list.length !== 0 && Quarry_list.length !== 0)
  {
    building.size += 1;
    map[tile].free_land -= 1;
    map[tile].land -= 1;
    game.Stone -= 25;
    game.Wood -= 25;
    update_cursor(0);
    building_view(index);
    $('#tab_building_information').append("<br><br>UPGRADE SUCCESSFUL.");
  }
  else
  {
    if (map[tile].free_land < 1)
    {
      $('#connections_view').append("<br><br>NEED FREE LAND (1)!");
    }
  }
})


var cursor = new cursor(1250);

function cursor(index)
{
  this.index = index;
}

$(document).ready(function()
{
  $(document).bind('keydown', 'w', function()
  {
    update_cursor(-60)
  });
  $(document).bind('keydown', 'a', function()
  {
    update_cursor(-1)
  });
  $(document).bind('keydown', 's', function()
  {
    update_cursor(60)
  });
  $(document).bind('keydown', 'd', function()
  {
    update_cursor(1)
  });
  $(document).bind('keydown', 'shift+w', function()
  {
    update_cursor(-600)
  });
  $(document).bind('keydown', 'shift+a', function()
  {
    update_cursor(-10)
  });
  $(document).bind('keydown', 'shift+s', function()
  {
    update_cursor(600)
  });
  $(document).bind('keydown', 'shift+d', function()
  {
    update_cursor(10)
  });
});

function generate_map_colour_cache()
{
  $('#loading').append(" ...CACHING COLOUR MAP ");
  for (var y = 0; y < (40); y++)
  {
    for (var x = 0; x < (60); x++)
    {
      var i = (y * 60 + x)

      var rect = new Kinetic.Rect(
      {
        fill: 'rgb(' + map[i].red + ',' + map[i].green + ',' + map[i].blue + ')',
        x: x * 10,
        y: y * 10,
        width: 10,
        height: 10
      });
      layer.add(rect);
    }
  }
  stage.add(layer);
  image = layer.toImage(
  {
    callback: function(img)
    {
      colour_cache_img = new Kinetic.Image(
      {
        image: img,
        x: 0,
        y: 0,
        width: 600,
        height: 400
      });
      colour_cache_layer = new Kinetic.Layer()
      colour_cache_layer.add(colour_cache_img)
    }
  })
  setTimeout(function()
  {
    generate_map_copper_cache();
  }, 0);
}

function generate_map_copper_cache()
{
  $('#loading').append(" ...CACHING COPPER MAP ");
  minerallayer = new Kinetic.Layer();
  for (var y = 0; y < (40); y++)
  {
    for (var x = 0; x < (60); x++)
    {
      var i = (y * 60 + x)
      var temp = map[i].resources[0].exact;
      var rect = new Kinetic.Rect(
      {
        fill: 'rgb(' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ')',
        x: x * 10,
        y: y * 10,
        width: 10,
        height: 10
      })
      minerallayer.add(rect);
    }
  }
  stage.add(minerallayer);
  image = minerallayer.toImage(
  {
    callback: function(img)
    {
      copper_cache_img = new Kinetic.Image(
      {
        image: img,
        x: 0,
        y: 0,
        width: 600,
        height: 400
      });
      copper_cache_layer = new Kinetic.Layer();
      copper_cache_layer.add(copper_cache_img)
    }
  });
  setTimeout(function()
  {
    generate_map_tin_cache();
  }, 0);
}

function generate_map_tin_cache()
{
  $('#loading').append(" ...CACHING TIN MAP ");
  minerallayer = new Kinetic.Layer();
  for (var y = 0; y < (40); y++)
  {
    for (var x = 0; x < (60); x++)
    {
      var i = (y * 60 + x);
      var temp = map[i].resources[1].exact;
      var rect = new Kinetic.Rect(
      {
        fill: 'rgb(' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ')',
        x: x * 10,
        y: y * 10,
        width: 10,
        height: 10
      });
      minerallayer.add(rect);
    }
  }
  stage.add(minerallayer);
  image = minerallayer.toImage(
  {
    callback: function(img)
    {
      tin_cache_img = new Kinetic.Image(
      {
        image: img,
        x: 0,
        y: 0,
        width: 600,
        height: 400
      });
      tin_cache_layer = new Kinetic.Layer();
      tin_cache_layer.add(tin_cache_img)
    }
  });
  setTimeout(function()
  {
    generate_map_iron_cache();
  }, 0);
}

function generate_map_iron_cache()
{
  $('#loading').append(" ...CACHING IRON MAP ");
  minerallayer = new Kinetic.Layer();
  for (var y = 0; y < (40); y++)
  {
    for (var x = 0; x < (60); x++)
    {
      var i = (y * 60 + x)
      var temp = map[i].resources[2].exact;
      var rect = new Kinetic.Rect(
      {
        fill: 'rgb(' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ')',
        x: x * 10,
        y: y * 10,
        width: 10,
        height: 10
      })
      minerallayer.add(rect);
    }
  }
  stage.add(minerallayer);
  image = minerallayer.toImage(
  {
    callback: function(img)
    {
      iron_cache_img = new Kinetic.Image(
      {
        image: img,
        x: 0,
        y: 0,
        width: 600,
        height: 400
      });
      iron_cache_layer = new Kinetic.Layer()
      iron_cache_layer.add(iron_cache_img)
    }
  })
  setTimeout(function()
  {
    generate_map_elevation_cache();
  }, 0);
}

function generate_map_elevation_cache()
{
  $('#loading').append(" ...CACHING ELEVATION MAP ");
  minerallayer = new Kinetic.Layer();
  for (var y = 0; y < (40); y++)
  {
    for (var x = 0; x < (60); x++)
    {
      var i = (y * 60 + x)
      var temp = map[i].h;
      var rect = new Kinetic.Rect(
      {
        fill: 'rgb(' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ')',
        x: x * 10,
        y: y * 10,
        width: 10,
        height: 10
      })
      minerallayer.add(rect);
    }
  }
  stage.add(minerallayer);
  image = minerallayer.toImage(
  {
    callback: function(img)
    {
      elevation_cache_img = new Kinetic.Image(
      {
        image: img,
        x: 0,
        y: 0,
        width: 600,
        height: 400
      });
      elevation_cache_layer = new Kinetic.Layer()
      elevation_cache_layer.add(elevation_cache_img)
    }
  })
  setTimeout(function()
  {
    generate_map_rain_cache();
  }, 0);
}

function generate_map_rain_cache()
{
  $('#loading').append(" ...CACHING RAIN MAP ");
  minerallayer = new Kinetic.Layer();
  for (var y = 0; y < (40); y++)
  {
    for (var x = 0; x < (60); x++)
    {
      var i = (y * 60 + x)
      var temp = map[i].rain;
      var rect = new Kinetic.Rect(
      {
        fill: 'rgb(' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ')',
        x: x * 10,
        y: y * 10,
        width: 10,
        height: 10
      })
      minerallayer.add(rect);
    }
  }
  stage.add(minerallayer);
  image = minerallayer.toImage(
  {
    callback: function(img)
    {
      rain_cache_img = new Kinetic.Image(
      {
        image: img,
        x: 0,
        y: 0,
        width: 600,
        height: 400
      });
      rain_cache_layer = new Kinetic.Layer()
      rain_cache_layer.add(rain_cache_img)
    }
  })
  setTimeout(function()
  {
    generate_map_temp_cache();
  }, 0);
}

function generate_map_temp_cache()
{
  $('#loading').append(" ...CACHING TEMP MAP ");
  minerallayer = new Kinetic.Layer();
  for (var y = 0; y < (40); y++)
  {
    for (var x = 0; x < (60); x++)
    {
      var i = (y * 60 + x)
      var temp = map[i].te;
      var rect = new Kinetic.Rect(
      {
        fill: 'rgb(' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ',' + Math.floor(255 - temp * 255) + ')',
        x: x * 10,
        y: y * 10,
        width: 10,
        height: 10
      })
      minerallayer.add(rect);
    }
  }
  stage.add(minerallayer);
  image = minerallayer.toImage(
  {
    callback: function(img)
    {
      temp_cache_img = new Kinetic.Image(
      {
        image: img,
        x: 0,
        y: 0,
        width: 600,
        height: 400
      });
      temp_cache_layer = new Kinetic.Layer()
      temp_cache_layer.add(temp_cache_img)
    }
  })
    setTimeout(function()
  {
    onload();
  }, 0);
  stage.add(colour_cache_layer);
  $('#wrapper').fadeIn(2000);
  $('#loading').hide();
  $('#imgstore').hide();
}

function draw_colour_map()
{
  stage.add(colour_cache_layer);
  stage.add(buildinglayer);
  stage.add(mouselayer);
}

function draw_copper_map()
{
  stage.add(copper_cache_layer);
  stage.add(mouselayer);
}

function draw_tin_map()
{
  stage.add(tin_cache_layer);
  stage.add(mouselayer);
}

function draw_iron_map()
{
  stage.add(iron_cache_layer);
  stage.add(mouselayer);
}

function draw_elevation_map()
{
  stage.add(elevation_cache_layer);
  stage.add(mouselayer);
}

function draw_temp_map()
{
  stage.add(temp_cache_layer);
  stage.add(mouselayer);
}

function draw_rain_map()
{
  stage.add(rain_cache_layer);
  stage.add(mouselayer);
}

function set_resource(resource_type, mod, use_perlin, perlinmod, terrain_restrictions)
{
  var x2 = Math.floor(Math.random() * 10000)
  var y2 = Math.floor(Math.random() * 10000)
  for (var y = y2; y < (y2 + 40); y++)
  {
    for (var x = x2; x < (x2 + 60); x++)
    {
      var i = ((y - y2) * 60 + (x - x2))

      if (use_perlin == 1)
      {
        var exact = PerlinNoise.noise(x / perlinmod, y / perlinmod, 0.5)
        var amount = Math.floor(exact * mod);
        if ($.inArray(map[i].t, terrain_restrictions) !== -1)
        {
          exact = 0;
          amount = 0;
        }
        var new_resource = new resource(resource_type, amount, exact)
        map[i].resources.push(new_resource);
      }
      else
      {
        var amount = Math.floor(mod * map[i].rain);
        if ($.inArray(map[i].t, terrain_restrictions) !== -1)
        {
          exact = 0;
          amount = 0;
        }
        var new_resource = new resource(resource_type, amount, 0)
        map[i].resources.push(new_resource);
      }

    }
  }
};

$(document).ready(function()
{
  $('#damage_buildings').click(function()
  {
    damage_buildings()
  });

  $('#plug').click(function()
  {
    window.open('http://www.reddit.com/r/rebuildtheworld', 'rebuildtheworld', '');
    return false;
  });
  $('#info_button').click(function()
  {
    $(".skills").hide();
    $("#information").show();
  });
  $('#skills_button').click(function()
  {
    $("#information").hide();
    $(".skills").show();
  });
  $('#mapb').click(function()
  {
    draw_colour_map()
  });
  $('#tempb').click(function()
  {
    draw_temp_map()
  });
  $('#rainb').click(function()
  {
    draw_rain_map()
  });
  $('#elevation').click(function()
  {
    draw_elevation_map()
  });
  $('#mineral_maps_button').click(function()
  {
    $("#mineral_buttons").toggle(400)
  });
  $('#copper').click(function()
  {
    draw_copper_map()
  });
  $('#tin').click(function()
  {
    draw_tin_map()
  });
  $('#iron').click(function()
  {
    draw_iron_map()
  });
  $('#save').click(function()
  {
    save()
  });
  $('#load').click(function()
  {
    load()
  });
});


$(document).ready(function()
{
  ion.sound(
  {
    sounds: [
      {
        name: "bellsound"
      },
      {
        name: "ambience"
      },
      {
        name: "heartbeat",
        volume: 1.0
      },
      {
        name: "footsteps",
        volume: 1.0
      }

    ],
    volume: 0.5,
    path: "",
    preload: true
  });
});

function askNPC(question)
{
  switch (question)
  {
    case 'WHO ARE YOU?':
      $("#answer").empty();
      display_text('Just a traveller... and an old friend.', 80, ['WHERE AM I?', 'WHAT DO I DO?'], show_mira);
      break;
    case 'WHERE AM I?':
      $("#answer").empty();
      display_text('I do not know the name of this place, I\'m truly sorry.', 80, [], 'no');
      break;
    case 'WHAT DO I DO?':
      $("#answer").empty();
      display_text('Extraordinary, you\'ve even lost your instrincts?', 80, ['INSTINCTS?'], 'no');
      break;
    case 'INSTINCTS?':
      $("#answer").empty();
      display_text('Hmmm... Yes... I\'m afraid you\'re going to expire soon considering the condition that body of yours is in. I guess I should help you out... consider it an... investment.', 80, [], show_mira);
      break;
  }
}

function show_mira()
{
  $("#rightcolumn").append("<div id='mira'></div>");
  $("#mira").fadeIn(5000);
  whispers.play();
}
var mira = 0;

function display_text(string, speed, new_questions, function_to_execute)
{
  canask = 0;
  var text = string;
  var textlength = string.length
  var i = 0

  function next()
  {
    if (i == textlength)
    {
      canask = 1;

      if (function_to_execute !== 'no')
      {
        console.log('hello');
        function_to_execute()
      }
      for (x = 0; x < new_questions.length; x++)
      {

        $("#convo").append("<div class='question'>" + new_questions[x] + "</div>")
      }
    }
    if (i++ < textlength)
    {
      if (text.charAt(0) == ' ')
      {
        $("#answer").append(text.charAt(0));
        text = text.slice(1);
      }
      $("#answer").append(text.charAt(0));
      text = text.slice(1);

      setTimeout(next, speed);
    }
  }
  next();
}

$(document).delegate("[class^='question']", "click", function()
{
  var question = $(this).text();
  if (canask == 1)
  {
    $(this).remove();
    askNPC(question);
  }
});

/*$(document).ready(function(){
ion.sound.play("ambience", {
    loop: true
});});*/
var athena_bell_count = -1;
athena_bell_count_array = ['once', 'twice', 'thrice'];

$(document).ready(function()
{
  $("#bell").click(function()
  {
    if (text.charAt(0) == "@" && bell.style.webkitAnimationName == '')
    {
      ion.sound.play("bellsound");
      athena_bell_count++;

      $("#eventlog").append('<li>Athena\'s bell rung ' + athena_bell_count_array[athena_bell_count] + '.</li>');
      $("#eventlog li:last").fadeIn(2000);
      $("#text").fadeOut(3000)
      bell.style.webkitAnimationName = 'spaceboots';
      bell.style.webkitAnimationDuration = '1s';
      bell.style.webkitAnimationIterationCount = '2';
      setTimeout(function()
      {
        $("#text").empty();
        bell.style.webkitAnimationName = '';
      }, 3000);
      text = text.slice(1);
      if (text.charAt(0) == "#")
      {
        text = "";
        $("#bell").fadeOut(3800)
        setTimeout(function()
        {
          $("#heart").fadeIn(4000)
        }, 4000);
      }
    }
    else if (text.charAt(0) == " ")
    {
      $("#text").append(text.charAt(0));
      text = text.slice(1);
      $("#text").append(text.charAt(0));
      text = text.slice(1);
    }
    else if (bell.style.webkitAnimationName == '')
    {
      $("#text").show();
      $("#text").append(text.charAt(0));
      text = text.slice(1);
    }
  });
});

var constant_beat = 0;
var beat_amount = 0;
var beat_temp = 1250

var footsteps = new Audio('footsteps.mp3');
var breathing = new Audio('breathing.mp3');

var whispers = new Audio('whispers.ogg');
footsteps.addEventListener("ended", function()
{
  breathing.play();

  $("#centercolumn").prepend("<div id='man1'></div>")
  $("#man1").fadeIn(300);
  $("#convo").append("<div class='question'>WHO ARE YOU?</div>")
});

$(document).ready(function()
{
  $("#heart").click(function()
  {
    if (heart.style.webkitAnimationName == '' && constant_beat == 0)
    {
      if (hearttext == "")
      {
        constant_beat = 1;

        function next2()
        {
          if (beat_amount < 15)
          {
            beat_amount++;
            ion.sound.play("heartbeat");
            heart.style.webkitAnimationName = 'thumb';
            heart.style.webkitAnimationDuration = '550ms';
            heart.style.webkitAnimationIterationCount = '1';
            heart.style.webkitAnimationOrigin = '50% 50%';
            setTimeout(function()
            {
              heart.style.webkitAnimationName = '';
            }, 700);
            setTimeout(next2, beat_temp);
          }
          if (beat_amount == 4)
          {
            $.when($("#heart").fadeOut(3000)).done(
              function()
              {
                footsteps.play()
              });
          }
        }


        next2()

      }
      else
      {

        ion.sound.play("heartbeat");
        heart.style.webkitAnimationName = 'thumb';
        heart.style.webkitAnimationDuration = '550ms';
        heart.style.webkitAnimationIterationCount = '1';
        heart.style.webkitAnimationOrigin = '50% 50%';
        $("#text").show();
        $("#text").empty();
        var temp_string = hearttext.slice(0, hearttext.indexOf('?') + 1)
        var temp_number = hearttext.indexOf('?') + 1;
        fontSize = (hearttext.charAt(temp_number)) * 15 + "px";
        $("#text").css(
        {
          'font-size': fontSize
        });
        $("#text").append(temp_string);
        hearttext = hearttext.slice(hearttext.indexOf('?') + 2)
        $("#text").fadeOut(1000);
        setTimeout(function()
        {
          heart.style.webkitAnimationName = '';
        }, 1500);
      }
    }
  });
});

$(document).ready(function()
{
  $('.skills li').each(function()
  {
    if ($(this).children('ul').length > 0)
    {
      $(this).addClass('parent');
    }
  });

  $('.skills li.parent > a').click(function()
  {
    $(this).parent().toggleClass('active');
    $(this).parent().children('ul').slideToggle('fast');
  });

  $('#all').click(function()
  {

    $('.skills li').each(function()
    {
      $(this).toggleClass('active');
      $(this).children('ul').slideToggle('fast');
    });
  });

});

function save()
{
  localStorage.setItem("map_information", JSON.stringify(map));
}

function load()
{
  var temp2 = localStorage.getItem("map_information");
  map = JSON.parse(temp2);
  draw_map();
}

