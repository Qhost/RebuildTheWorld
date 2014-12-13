<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>sssgerrrrttttrfww4f43ftrhtrsg</title>
  <link rel="stylesheet" type="text/css" href="style2.css">
  <link rel="stylesheet" type="text/css" href="tipped.css">
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    
<script src="ion.sound.js"></script>
<script src="hotkeys.js"></script>
<script src="kinetic.js"></script>
<script type="text/javascript" src="jquery.atooltip.min.js"></script>
<script src="script2.js"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-31618809-2', 'auto');
  ga('send', 'pageview');

</script>
</head>

<body>
<div id='band'><div id='header'></div></div>
<div id='loading'><h2>Loading...</h2></div><div id='imgstore'><br><br></div>
<div id="wrapper">
<div id="mapwrapper">
<div id="information_bar">
<div id="tabs-container">
    <ul class="tabs-menu">
        <li class="current"><a href="#tab-1">Tile</a></li>
        <li><a href="#tab-2">Map</a></li>
        <li><a href="#tab-3">Tab 3</a></li>
        <li><a href="#tab-4">Tab 4</a></li>
    </ul>
    <div class="tab">
        <div id="tab-1" class="tab-content">
<div id="information">Use your WASD keys to navigate the map.<br>SHIFT + WASD to move 10 tiles at once.<br>Your capital starts with 25 free land.<br>You start with the resources to build a Woodcutters Hut and a Quarry</div>
        </div>
        <div id="tab-2" class="tab-content">
<button id="mapb" class="myButton">Colour</button>
            <button id="elevation" class="myButton">Elevation</button>
            <button id="tempb" class="myButton">Temperature</button>
            <button id="rainb" class="myButton">Rainfall</button>
            <button id="mineral_maps_button" class="myButton">Minerals</button><br>
            <span id='mineral_buttons'>
            <button id="copper" class="mineral_button">Copper</button>
            <button id="tin" class="mineral_button">Tin</button>
            <button id="iron" class="mineral_button">Iron</button>
            </span>
        </div>
        <div id="tab-3" class="tab-content">
            <p>Nothing to see here.</p>
        </div>
        <div id="tab-4" class="tab-content">
            <p>Nothing to see here.</p>
        </div>
    </div>
</div>
</div>
<div id='canvas' width="600" height="400"></div>
</div>

<div id='rightcolumn'>


<div id="tabs_main-container">
    <ul class="tabs_main-menu">
        <li class="current"><a href="#tab_main-1">Tile</a></li>
        <li><a href="#tab_main-2">Resources</a></li>
        <li><a href="#tab_main-3">Help!</a></li>
        <li><a href="#tab_main-4">Kappa</a></li>
    </ul>
    <div class="tab_main">
        <div id="tab_main-1" class="tab_main-content">
           <div id="building_information_tab"></div>
           <div id="tabs_building-container">
               <ul class="tabs_building-menu">
                   <li class="current"><a href="#tab_building-1">Building</a></li>
                   <li><a href="#tab_building-2">Upgrades</a></li>
                   <li><a href="#tab_building-3">Statistics</a></li>
                   <li><a href="#tab_building-4">???</a></li>
               </ul>
               <div class="tab_building">
                   <div id="tab_building-1" class="tab_building-content">
                   <div id="tab_building_information"></div>
                   </div>
                   <div id="tab_building-2" class="tab_building-content">
                   <div id="tab_building_upgrades"></div>
                   </div>
                   <div id="tab_building-3" class="tab_building-content">
                       <p>Stats might go here. Maybe.</p>
                   </div>
                   <div id="tab_building-4" class="tab_building-content">
Top Secret tab that has no content. YEAH DEVELOPMENT BUILD WILDCARD!
                   </div>
               </div>
           </div>
        </div>
        <div id="tab_main-2" class="tab_main-content">
        
        <table align="center" id="cssTable">
        <tr>
        <td><b>Wood</b><br><span id='Wood'></span></td>
        <td><b>Stone</b><br><span id='Stone'></span></td>
        <td><b>Wealth</b><br><span id='Wealth'></span></td>
        <td><b>Wheat</b><br><span id='Wheat'></span></td>
        </tr>
        <tr>
        <td><b>Bread</b><br><span id='Bread'></span></td>
        <td><b>Barley</b><br><span id='Barley'></span></td>
        <td><b>Meat</b><br><span id='Meat'></span></td>
        <td><b>Fish</b><br><span id='Fish'></span></td>
        </tr>
        <tr>
        <td><b>Coal</b><br><span id='Coal'></span></td>
        <td><b>Copper Ore</b><br><span id='Copper_Ore'></span></td>
        <td><b>Copper Bar</b><br><span id='Copper_Bar'></span></td>
        <td><b></td>
        </tr>
        <tr>
        <td><b>Iron Ore</b><br><span id='Iron_Ore'></span></td>
        <td><b>Iron Bar</b><br><span id='Iron_Bar'></span></td>
        <td><b>Tin Ore</b><br><span id='Tin_Ore'></span></td>
        <td><b>Tin Bar</b><br><span id='Tin_Bar'></span></td>
        </tr>
        </table>
        </div>
        <div id="tab_main-3" class="tab_main-content">
            <p>Use your WASD keys to navigate the map.<br>SHIFT + WASD to move 10 tiles at once.<br>Your capital starts with 25 free land.<br>You start with the resources to build a Woodcutters Hut and a Quarry<br>Remember this build is somewhere inbetween a prototype and alpha.<br> Making a metal bar requires 1 ore and 1 coal.
                       </p>
        </div>
        <div id="tab_main-4" class="tab_main-content">
            <p>
            <a href='http://tehurn.com/frankerz' target='_blank'><img src='a1.png'></img></a>
            <a href='http://tehurn.com/not' target='_blank'><img src='a2.png'></img></a>
            <a href='http://tehurn.com/gayweed' target='_blank'><img src='a3.png'></img></a>
            <a href='http://tehurn.com/' target='_blank'><img src='a4.png'></img></a>
            <a href='https://www.youtube.com/watch?v=S5akI0G7Otg' target='_blank'><img src='a5.png'></img></a>
            <a href='https://www.youtube.com/watch?v=5MJwgceMflI' target='_blank'><img src='a6.png'></img></a>
            </p>
        </div>
    </div>
</div>


</div>
</div>
</div>


</body>
</html>