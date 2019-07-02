!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t,n){e.exports=n.p+"812c9cb96f208f92df24456f8ba739d4.jpg"},function(e,t,n){var r=n(2);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(5)(r,a);r.locals&&(e.exports=r.locals)},function(e,t,n){t=e.exports=n(3)(!1);var r=n(4)(n(0));t.push([e.i,'/* Styling for standard HTML tags. */\r\nbody {\r\n    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;\r\n    color: white;   /* Change default font color from black to white due to dark background. */\r\n}\r\n\r\np {\r\n    margin: 0;      /* Remove default margin around paragraphs which are used to display metadata for focused games. */    \r\n}\r\n\r\n/* Headline at top of screen */\r\nh4 {\r\n    position: relative;\r\n    top: 70px;\r\n    left: 60px;\r\n    font-size: 2.28rem;\r\n    font-weight: 400;\r\n    line-height: 110%;\r\n    margin: 1.52rem 0 .912rem 0;\r\n}\r\n\r\n/* Headline at top of modal dialog. */\r\nh5 {\r\n    font-size: 30px;\r\n    font-weight: 700;\r\n    margin-top: 0;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n/* Background image spanning entire screen. Assigned to root element. */\r\n.bgImage {\r\n    background-image: url('+r+");\r\n    background-position: 0 0;\r\n    background-repeat: no-repeat;\r\n    background-size: 1920px 1080px;\r\n    width: 100%;\r\n    height: 1080px;\r\n}\r\n\r\n/* Root element of the display module. Spans entire screen. */\r\n.gamesContainer {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n}\r\n\r\n.dateButtons {\r\n    position: relative;\r\n    top: 40px;\r\n    left: 60px;\r\n}\r\n\r\n#prevDate, #nextDate {\r\n    height: 54px;\r\n    line-height: 54px;\r\n    font-size: 15px;\r\n    padding: 0 28px;\r\n    text-decoration: none;\r\n    color: white;\r\n    background-color: #26a69a;\r\n    text-align: center;\r\n    letter-spacing: .5px;\r\n    cursor: pointer;\r\n    outline: 0;\r\n    border: none;\r\n    border-radius: 2px;\r\n    display: inline-block;\r\n    text-transform: uppercase;\r\n    vertical-align: middle;\r\n    font-weight: normal;\r\n}\r\n\r\n#nextDate {\r\n    margin-left: 30px;\r\n}\r\n\r\n/* Represents all of the game elements spanning multiple rows based on number of games. */\r\n.gamesRow {\r\n    position: relative;\r\n    top: 100px;\r\n    left: 60px;         /* Since we are not centering the game cells, provide spacing from left edge of screen. */\r\n    width: 1860px;      /* Remaining width after subtracting left distance (1920 - 60 = 1860px). We need this or else game cells \r\n                           mysteriously wrap to a second row when there are few games, despite room for up to 7 in first row. */\r\n}\r\n\r\n/* The metadata shown above and below the focused game image. */\r\n.gameCaptions {\r\n    margin-right: 2%;\r\n    margin-bottom: 2%;\r\n    display: inline-block;  /* Display game cells next to each other in horizontal rows, up to 7 per row, rather than vertically. \r\n                               This is preferable to 'float: left' which causes elements in rows 2 and 3 to jump after focused \r\n                               element in prior row. We would need to keep track of when game cells move to successive rows and\r\n                               clear the float for each new row. */\r\n    text-align: center;\r\n}\r\n\r\n/* The description metadata caption requires a strict width setting or else it won't word wrap and would spill out into next sibling div. */\r\np.desc {\r\n    width: 209px;\r\n}\r\n\r\n/* Hide the captions for unfocused game cells. */\r\n.hiddenCaption {\r\n    visibility: hidden;\r\n}\r\n\r\n/* Need a container around image so a gray rectangle placeholder can appear when there is no image available. */\r\n.gameImage {\r\n    width: 209px;\r\n    height: 118px;\r\n    background-color: darkgray;\r\n    margin-top: 10px;               /* Spacing between team names/scores and image. */\r\n    margin-bottom: 10px;            /* Spacing between image and headline. */\r\n    visibility: visible;            /* Ensure that image is always visible while we toggle visibility of outer gameCaptions div. */\r\n}\r\n\r\n/* Don't let image be its natural size. Limit image width and height to that of its container. */\r\n.gameImage img {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n/* === MODAL DIALOG === */\r\n/* Modal container stretching full screen and grayed out (background). */\r\n.modal {\r\n    display: none;                  /* Modal dialog is hidden by default. */\r\n    position: fixed;                /* Keep modal dialog in place. */\r\n    z-index: 1;                     /* Enable modal dialog to appear on top of screen when it is shown. */\r\n    padding-top: 190px;             /* Sets top location of the inner content box. */\r\n    left: 0;                        /* Modal dialog will occupy entire screen from top left corner. */\r\n    top: 0;\r\n    width: 100%;                    /* Full width. */\r\n    height: 100%;                   /* Full height. */\r\n    overflow: hidden;               /* Disable scroll if content does not fit. */\r\n    background-color: rgba(0,0,0,0.6); /* Black w/ opacity set to darkening setting. */\r\n}\r\n  \r\n  /* Modal content for the inner dialog that is not grayed out. */\r\n.modalContent {\r\n    color: black;\r\n    background-color: #fefefe;\r\n    margin: auto;\r\n    padding: 20px;\r\n    border: 1px solid #888;\r\n    width: 80%;\r\n    height: 480px;\r\n}\r\n\r\n#modalSubheading {\r\n    font-size: 20px;\r\n    font-weight: 700;\r\n}\r\n\r\n.modelImageSubheading {\r\n    float: left;\r\n    width: 700px;\r\n}\r\n\r\n#modalBlurb, #modalContributors {\r\n    margin-top: 20px;\r\n}\r\n\r\n.modalBlurbAuthors {\r\n    float: left;\r\n    width: 600px;\r\n    font-size: 24px;\r\n    margin-left: 50px;\r\n}\r\n\r\n.escapeTip {\r\n    position: relative;\r\n    bottom: -120px;\r\n    right: -560px;\r\n    font-size: 16px;\r\n    display: inline-block;          /* Shrinkwrap div around content. */\r\n    /* color: #7b1fa2; */\r\n    color: #26a69a;\r\n}\r\n\r\n.escapeKey {    /* Create what kind of resembles the Escape key. */\r\n    border: 2px solid black;\r\n    border-radius: 15%;\r\n    padding: 4px;\r\n    display: inline-block;          /* Shrinkwrap div around content. */\r\n    margin-left: 5px;\r\n    margin-right: 5px;\r\n    font-weight: 500;\r\n}\r\n",""])},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var a=(i=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),d="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(d," */")),o=r.sources.map(function(e){return"/*# sourceURL=".concat(r.sourceRoot).concat(e," */")});return[n].concat(o).concat([a]).join("\n")}var i,s,d;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2],"{").concat(n,"}"):n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},a=0;a<this.length;a++){var o=this[a][0];null!=o&&(r[o]=!0)}for(var i=0;i<e.length;i++){var s=e[i];null!=s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="(".concat(s[2],") and (").concat(n,")")),t.push(s))}},t}},function(e,t,n){"use strict";e.exports=function(e,t){return"string"!=typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),/["'() \t\n]/.test(e)||t?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},function(e,t,n){var r,a,o={},i=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===a&&(a=r.apply(this,arguments)),a}),s=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),d=null,c=0,l=[],u=n(6);function p(e,t){for(var n=0;n<e.length;n++){var r=e[n],a=o[r.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](r.parts[i]);for(;i<r.parts.length;i++)a.parts.push(y(r.parts[i],t))}else{var s=[];for(i=0;i<r.parts.length;i++)s.push(y(r.parts[i],t));o[r.id]={id:r.id,refs:1,parts:s}}}}function m(e,t){for(var n=[],r={},a=0;a<e.length;a++){var o=e[a],i=t.base?o[0]+t.base:o[0],s={css:o[1],media:o[2],sourceMap:o[3]};r[i]?r[i].parts.push(s):n.push(r[i]={id:i,parts:[s]})}return n}function h(e,t){var n=s(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=l[l.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),l.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var a=s(e.insertAt.before,n);n.insertBefore(t,a)}}function f(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=l.indexOf(e);t>=0&&l.splice(t,1)}function g(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return b(t,e.attrs),h(e,t),t}function b(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function y(e,t){var n,r,a,o;if(t.transform&&e.css){if(!(o="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=o}if(t.singleton){var i=c++;n=d||(d=g(t)),r=x.bind(null,n,i,!1),a=x.bind(null,n,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",b(t,e.attrs),h(e,t),t}(t),r=function(e,t,n){var r=n.css,a=n.sourceMap,o=void 0===t.convertToAbsoluteUrls&&a;(t.convertToAbsoluteUrls||o)&&(r=u(r));a&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var i=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}.bind(null,n,t),a=function(){f(n),n.href&&URL.revokeObjectURL(n.href)}):(n=g(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),a=function(){f(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else a()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=i()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=m(e,t);return p(n,t),function(e){for(var r=[],a=0;a<n.length;a++){var i=n[a];(s=o[i.id]).refs--,r.push(s)}e&&p(m(e,t),t);for(a=0;a<r.length;a++){var s;if(0===(s=r[a]).refs){for(var d=0;d<s.parts.length;d++)s.parts[d]();delete o[s.id]}}}};var v,w=(v=[],function(e,t){return v[e]=t,v.filter(Boolean).join("\n")});function x(e,t,n,r){var a=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=w(t,a);else{var o=document.createTextNode(a),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(o,i[t]):e.appendChild(o)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var a,o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?e:(a=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(a)+")")})}},function(e,t,n){"use strict";n.r(t);n(1),n(0);const r=(e=0,t=new Date)=>{let n=new Date(t.getTime());return Number.isInteger(e)&&0!==e&&n.setDate(n.getDate()+e),n},a=(e="")=>""===e?"":new Date(e.replace(/-/g,"/")).toDateString(),o=async(e=new Date)=>{const t=((e=new Date)=>{return e.getFullYear().toString()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+("0"+e.getDate()).slice(-2)})(e);try{const e=await fetch(`http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=${t}&sportId=1`);return await e.json()}catch(e){return console.log(`We're sorry, no data is available at this time for your requested date ${t}.`)}},i=12,s=6,d="209px",c="118px",l="320px",u="180px",p=7,m="No Score",h="gamesContainer",f="captions",g="image",b="prevDate",y="nextDate",v="prevDate",w="gameDetails",x="modalHeadline",D="modalImage",C="modalSubheading",I="modalBlurb",E="modalContributors";var M=class{constructor(e,t){this.controller=e,this.rootElement=t,this.currentDate=new Date,this.currentIndex=0,this.maxIndex=-1,this.gamesMetadata=[],this.isModalDisplayed=!1,this.data=null,this.gridHasFocus=!1,this.buttonIdHasFocus=""}onCreate(){this.controller.requestData(this,"receiveStatsData","getStats",this.currentDate)}receiveStatsData(e){console.log("In display mod receiveStatsData(), result is:",e),this.data=e,this.buildDisplayModule()}buildDisplayModule(){if(!this.data)return;const e=document.getElementById(h);null!==e&&(e.parentNode.removeChild(e),this.gamesMetadata.splice(0,this.gamesMetadata.length));const t=document.createElement("div");t.id=h,t.classList.add("gamesContainer"),t.appendChild(this.buildDateButtons()),t.appendChild(this.buildHeader()),t.appendChild(this.buildGrid()),t.appendChild(this.buildDetailsModalDialog()),this.rootElement.appendChild(t),""===this.buttonIdHasFocus?this.addGridFocus():this.addDateButtonsFocus()}buildDateButtons(){const e=document.createElement("div");e.classList.add("dateButtons");const t=document.createElement("a");t.id=b;const n=document.createTextNode("< Previous Date");t.appendChild(n);const r=document.createElement("a");r.id=y;const a=document.createTextNode("Next Date >");return r.appendChild(a),e.appendChild(t),e.appendChild(r),e}buildHeader(){if(!this.data)return null;const e=document.createElement("h4");let t=null;if(0===this.data.totalGames)t=document.createTextNode("We're sorry, there is no data available for the date you requested.");else{let e=0;this.data.dates[0].games.forEach(t=>{t.content&&t.content.editorial&&t.content.editorial.recap&&t.content.editorial.recap.mlb&&e++});let n="recaps";1===e&&(n="recap"),t=document.createTextNode(`Stats for ${a(this.data.dates[0].date)}: ${this.data.totalGames} total games, ${e} editorial ${n} available`)}return e.appendChild(t),e}buildGrid(){if(!this.data||0===this.data.totalGames)return null;const e=document.createElement("div");e.classList.add("gamesRow"),this.currentIndex=0,this.maxIndex=this.data.totalGames-1;let t=-1;return this.data.dates[0].games.forEach(n=>{this.storeMetadata(n),t++;let r=document.createElement("div");r.id=`${f}${t}`,r.classList.add("gameCaptions","hiddenCaption");let a=document.createElement("p"),o=document.createTextNode(`${this.gamesMetadata[t].homeTeam.name}: ${this.gamesMetadata[t].homeTeam.score}`);a.appendChild(o),r.appendChild(a);let s=document.createElement("p"),d=document.createTextNode(`${this.gamesMetadata[t].awayTeam.name}: ${this.gamesMetadata[t].awayTeam.score}`);s.appendChild(d),r.appendChild(s);let c=document.createElement("div");if(c.classList.add("gameImage"),c.id=`${g}${t}`,n.content&&n.content.editorial&&n.content.editorial.recap&&n.content.editorial.recap.mlb&&n.content.editorial.recap.mlb.image&&n.content.editorial.recap.mlb.image.cuts){let e=n.content.editorial.recap.mlb.image.cuts[i].src,t=document.createElement("img");t.src=e,c.appendChild(t)}r.appendChild(c);let l=document.createElement("p");l.classList.add("desc");let u=document.createTextNode(this.gamesMetadata[t].headline);l.appendChild(u),r.appendChild(l),e.appendChild(r)}),e}buildDetailsModalDialog(){const e=document.createElement("div");e.id=w,e.classList.add("modal");const t=document.createElement("div");t.classList.add("modalContent"),e.appendChild(t);const n=document.createElement("h5");n.id=x,t.appendChild(n);const r=document.createElement("img");r.id=D;const a=document.createElement("p");a.id=C;const o=document.createElement("div");o.classList.add("modelImageSubheading"),o.appendChild(r),o.appendChild(a),t.appendChild(o);const i=document.createElement("p");i.id=I;const s=document.createElement("p");s.id=E;const d=document.createElement("div");d.classList.add("modalBlurbAuthors"),d.appendChild(i),d.appendChild(s),t.appendChild(d);const c=document.createElement("div");c.classList.add("escapeTip");const l=document.createElement("div");l.classList.add("escapeKey");const u=document.createTextNode("Esc");l.appendChild(u);const p=document.createTextNode("Press"),m=document.createTextNode("key to close dialog");return c.appendChild(p),c.appendChild(l),c.appendChild(m),d.appendChild(c),e}launchDetailsModalDialog(){const e=document.getElementById(x),t=document.getElementById(D),n=document.getElementById(C),r=document.getElementById(I),a=document.getElementById(E);for(;e.firstChild;)e.removeChild(e.firstChild);for(t.src="";n.firstChild;)n.removeChild(n.firstChild);for(;r.firstChild;)r.removeChild(r.firstChild);for(;a.firstChild;)a.removeChild(a.firstChild);const o=document.createTextNode(this.gamesMetadata[this.currentIndex].headline);e.appendChild(o),t.src=this.gamesMetadata[this.currentIndex].modalDialogImageUrl;const i=`${this.gamesMetadata[this.currentIndex].homeTeam.name}: ${this.gamesMetadata[this.currentIndex].homeTeam.score}`,s=`${this.gamesMetadata[this.currentIndex].awayTeam.name}: ${this.gamesMetadata[this.currentIndex].awayTeam.score}`,d=document.createTextNode(`${i} / ${s}`);n.appendChild(d);const c=document.createTextNode(this.gamesMetadata[this.currentIndex].blurb);r.appendChild(c);const l=document.createTextNode(`-- ${this.gamesMetadata[this.currentIndex].contributors}`);a.appendChild(l),document.getElementById(w).style.display="block",this.isModalDisplayed=!0}storeMetadata(e){let t={homeTeam:{name:"",score:""},awayTeam:{name:"",score:""},headline:"",modalDialogImageUrl:"",blurb:"",contributors:""};if(e.teams&&e.teams.home&&e.teams.home.team&&e.teams.home.team.name&&(t.homeTeam.name=e.teams.home.team.name),e.teams&&e.teams.home&&(void 0!==e.teams.home.score?t.homeTeam.score=e.teams.home.score:t.homeTeam.score=m),e.teams&&e.teams.away&&e.teams.away.team&&e.teams.away.team.name&&(t.awayTeam.name=e.teams.away.team.name),e.teams&&e.teams.away&&void 0!==e.teams.away.score&&(t.awayTeam.score=e.teams.away.score),e.teams&&e.teams.away&&(void 0!==e.teams.away.score?t.awayTeam.score=e.teams.away.score:t.awayTeam.score=m),e.content&&e.content.editorial&&e.content.editorial.recap&&e.content.editorial.recap.mlb&&e.content.editorial.recap.mlb.headline&&(t.headline=e.content.editorial.recap.mlb.headline),e.content&&e.content.editorial&&e.content.editorial.recap&&e.content.editorial.recap.mlb&&e.content.editorial.recap.mlb.image&&e.content.editorial.recap.mlb.image.cuts&&(t.modalDialogImageUrl=e.content.editorial.recap.mlb.image.cuts[s].src),e.content&&e.content.editorial&&e.content.editorial.recap&&e.content.editorial.recap.mlb&&e.content.editorial.recap.mlb.blurb&&(t.blurb=`${e.content.editorial.recap.mlb.blurb}...`),e.content&&e.content.editorial&&e.content.editorial.recap&&e.content.editorial.recap.mlb&&e.content.editorial.recap.mlb.contributors){let n=e.content.editorial.recap.mlb.contributors.map(e=>e.name);t.contributors=n.join(", ")}this.gamesMetadata.push(t)}onKeyPress(e){if(this.isModalDisplayed&&"Escape"!==e)return!1;switch(e){case"ArrowLeft":if(this.gridHasFocus){if(0===this.currentIndex)return!1;this.updateGridFocus(e)}else{if(this.buttonIdHasFocus===b)return!1;this.updateDateButtonsFocus(e)}break;case"ArrowRight":if(this.gridHasFocus){if(this.currentIndex===this.maxIndex)return!1;this.updateGridFocus(e)}else{if(this.buttonIdHasFocus===y)return!1;this.updateDateButtonsFocus(e)}break;case"ArrowUp":if(!this.gridHasFocus)return!1;this.currentIndex-p>=0?this.updateGridFocus(e):(this.updateGridFocus(e,!0),this.updateDateButtonsFocus(e));break;case"ArrowDown":if(this.gridHasFocus){if(!(this.currentIndex+p<=this.maxIndex))return!1;this.updateGridFocus(e)}else this.updateDateButtonsFocus(e),this.updateGridFocus(e);break;case"Enter":if(this.gridHasFocus)this.launchDetailsModalDialog();else if(this.buttonIdHasFocus===b){const e=-1;this.currentDate=r(e,this.currentDate),this.controller.requestData(this,"receiveStatsData","getStats",this.currentDate)}else if(this.buttonIdHasFocus===y){const e=1;this.currentDate=r(e,this.currentDate),this.controller.requestData(this,"receiveStatsData","getStats",this.currentDate)}break;case"Escape":this.isModalDisplayed&&(document.getElementById(w).style.display="none",this.isModalDisplayed=!1);break;default:return!1}}updateGridFocus(e,t=!1){let n=null;switch(e){case"ArrowLeft":n=this.currentIndex-1;break;case"ArrowRight":n=this.currentIndex+1;break;case"ArrowUp":!1===t&&(n=this.currentIndex-p);break;case"ArrowDown":n=this.gridHasFocus?this.currentIndex+p:this.currentIndex;break;default:return!1}this.removeGridFocus(),null!==n&&(this.currentIndex=n,this.addGridFocus())}removeGridFocus(){if(!1===this.gridHasFocus)return;document.getElementById(`${f}${this.currentIndex}`).classList.add("hiddenCaption");let e=document.getElementById(`${g}${this.currentIndex}`);e.style.width=d,e.style.height=c,e.style.removeProperty("border"),e.nextSibling.style.width=d,this.gridHasFocus=!1}addGridFocus(){document.getElementById(`${f}${this.currentIndex}`).classList.remove("hiddenCaption");let e=document.getElementById(`${g}${this.currentIndex}`);e.style.width=l,e.style.height=u,e.style.border="solid 5px red",e.nextSibling.style.width=l,this.gridHasFocus=!0}updateDateButtonsFocus(e){let t=null;switch(e){case"ArrowLeft":t=b;break;case"ArrowRight":t=y;break;case"ArrowUp":t=v;break;case"ArrowDown":break;default:return!1}this.removeDateButtonsFocus(),null!==t&&(this.buttonIdHasFocus=t,this.addDateButtonsFocus())}removeDateButtonsFocus(){""!==this.buttonIdHasFocus&&(document.getElementById(this.buttonIdHasFocus).style.removeProperty("border"),this.buttonIdHasFocus="")}addDateButtonsFocus(){document.getElementById(this.buttonIdHasFocus).style.border="solid 5px red"}getIndexFromId(e){return new Number(e.replace(/\D/g,"")).valueOf()}};new class{constructor(){this.dataMods=new Map,this.loadDataMods(),this.launchDisplayMods()}establishRootElement(){const e=document.createElement("div");return e.id="root",e.classList.add("bgImage"),document.body.appendChild(e),e}loadDataMods(){this.dataMods.set("getStats",o)}requestData(e,t,n,...r){(async()=>{const a=await this.dataMods.get(n).apply(this,r);e[t](a)})().catch(e=>console.error(e))}launchDisplayMods(){const e=this.establishRootElement();let t=new M(this,e);t.onCreate(),this.passKeyPressesToDisplayMod(t)}passKeyPressesToDisplayMod(e){document.addEventListener("keydown",function(t){t.preventDefault(),e.onKeyPress(t.key)}),document.addEventListener("keypress",function(t){t.preventDefault(),e.onKeyPress(t.key)})}}}]);