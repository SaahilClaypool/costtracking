(this["webpackJsonpreact-frontend"]=this["webpackJsonpreact-frontend"]||[]).push([[0],{70:function(t,e,n){t.exports=n(78)},75:function(t,e,n){},77:function(t,e,n){},78:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(46),c=n.n(o),i=(n(75),n(14)),l=n.n(i),s=n(48),u=n(47),f=n(3),m=(n(77),n(1)),d=200,p=20,h=40,v=100,y=!0;function g(t,e){return t.filter((function(t){return parseInt(t.Date.split("/")[0])===e+1}))}function E(t,e){var n=m.i(".tooltip"),a=m.f().domain(m.d(t,(function(t){return t.day}))).range([0,400]),r=function(t){return a(t.day)},o=m.f().domain(m.d(t,(function(t){return y?t.totalCost:t.Cost}))).range([400,0]),c=function(t){return o(y?t.totalCost:t.Cost)},i=m.d(t,(function(t){return t.day})),l=Object(f.a)(i,2),s=l[0],u=l[1],d=m.d(t,(function(t){return t.Cost})),p=Object(f.a)(d,2),h=p[0],v=p[1],g=m.f().domain(m.d(t,(function(t){return t.Cost}))).range([4,10]),E=function(t){return g(t.Cost)},b=m.g(m.h),x=function(t){return b(t.Who)+"aa"},C=m.i(e.current).select("g"),w=(C.selectAll("#xAxis").transition(500).call(m.a(a)),C.selectAll("#yAxis").transition(500).call(m.b(o)),C.selectAll("circle").data(t));console.log("drawing ".concat(t.length," points")),w.exit().transition().duration(500).attr("fill","#00000000").remove(),w.enter().append("circle").attr("fill",x).attr("cx",(function(){return a(m.e(s-u,2*u)())})).attr("cy",(function(){return o(m.e(h-v,2*v)())})).attr("r",1).attr("fill","#000000").on("mouseover",(function(t){n.transition().duration(200).style("opacity",.9),n.html("                <strong>".concat(t.Who,"</strong>                <hr/>\n                <p>").concat(t.Description,"</p>\n                ")).style("left",m.c.pageX+10+"px").style("top",m.c.pageY-65+"px")})).on("mouseout",(function(t){n.transition().duration(500).style("opacity",0)})).transition().duration(500).attr("cx",r).attr("cy",c).attr("r",E).attr("fill",x),w.transition().duration(500).attr("cx",r).attr("cy",c).attr("r",E).attr("fill",x)}function b(t){if(y&&t){t.sort((function(t,e){return t.day>e.day}));var e={};t.forEach((function(n,a){n.Who in e||(e[n.Who]=0),e[n.Who]+=n.Cost,n.totalCost=e[n.Who],t[a]=n}))}return t}var x=function(t){var e=Object(a.useRef)(null);return y=t.isCummulative,Object(a.useEffect)((function(){!function(t,e){var n=m.f().domain(m.d(t,(function(t){return t.day}))).range([0,400]),a=m.f().domain(m.d(t,(function(t){return t.Cost}))).range([0,400]);if(m.i("body").append("div").attr("class","tooltip").style("opacity",0),t&&e.current){var r=m.i(e.current).append("g").attr("transform","translate(".concat(d,", ").concat(h,")"));r.selectAll("circle").data(t),r.append("g").attr("transform","translate(0,".concat(410,")")).attr("id","xAxis").call(m.a(n));r.append("text").attr("x",200).attr("y",450).style("text-anchor","middle").text("Day of Month");r.append("g").attr("transform","translate(-10,0)").attr("id","yAxis").call(m.b(a));r.append("text").attr("transform","rotate(-90)").attr("y",-80).attr("x",-200).attr("dy","1em").style("text-anchor","middle").text("Cost (USD)"),E(t,e)}}(b(g(t.data,t.month)),e)}),[]),Object(a.useEffect)((function(){E(b(g(t.data,t.month)),e)})),r.a.createElement("div",{className:"GraphView"},r.a.createElement("div",{id:"D3View"},r.a.createElement("svg",{id:"d3SVG",ref:e,width:400+d+p,height:400+v+h})),r.a.createElement("p",null,t.currentMonth))};function C(t){return"$".concat(t.toFixed(2))}var w={saahil:.6,sarah:.4};function O(t,e,n,a){return r.a.createElement("div",{className:"Message",key:t},r.a.createElement("strong",null,t)," has spent ",C(e),".",r.a.createElement("br",null),a>0?r.a.createElement("p",null,"They owe ",C(a)):r.a.createElement("span",null))}var A=function(t){var e=t.data.reduce((function(t,e){return!e.Who in t&&(t[e.Who]=0),t[e.Who]=e.Cost,t}),{}),n=[],a=0;for(var o in e){a+=e[o]}for(var c in e){var i=e[c],l=a*(c in w?w[c]:.5),s=l-i;n.push(O(c,i,0,s))}return r.a.createElement("div",{className:"InfoView"},n)},j=["January","February","March","April","May","June","July","August","September","October","November","December"];var k=function(){var t=r.a.useState((new Date).getMonth()),e=Object(f.a)(t,2),n=e[0],o=e[1],c=r.a.useState([]),i=Object(f.a)(c,2),m=i[0],d=i[1],p=r.a.useState(!0),h=Object(f.a)(p,2),v=h[0],y=h[1],g=function(t){o((n+t+12)%12)};return Object(a.useEffect)((function(){(function(){var t=Object(u.a)(l.a.mark((function t(){var e,n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(""),t.next=3,fetch("/data",{mode:"cors",headers:{"Access-Control-Allow-Origin":"*"}});case 3:return e=t.sent,t.next=6,e.json();case 6:n=t.sent,a=JSON.parse(n).map((function(t){var e=t.Date.split("/");return Object(s.a)({},t,{month:parseInt(e[0]),day:parseInt(e[1]),year:parseInt(e[2])})})),console.log(a),d(a);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]),r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Cost Savings"),r.a.createElement("h2",null,j[n]),r.a.createElement("div",{className:"Controls"},r.a.createElement("button",{className:"ToggleCummulative",onClick:function(){return y(!v)}},v?"Cummulative":"Single Purchases"),r.a.createElement("div",{className:"Content"},r.a.createElement("div",{className:"Picker"},r.a.createElement("ul",{className:"MonthPicker"},r.a.createElement("li",null,r.a.createElement("button",{onClick:function(){return g(-1)}},"\u2190")),r.a.createElement("li",null,r.a.createElement("button",null,"\u2193")),r.a.createElement("li",null,r.a.createElement("button",{onClick:function(){return g(1)}},"\u2192"))),r.a.createElement(x,{month:n,data:m,isCummulative:v}),r.a.createElement(A,{data:m})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[70,1,2]]]);
//# sourceMappingURL=main.92493730.chunk.js.map