(this["webpackJsonpreact-frontend"]=this["webpackJsonpreact-frontend"]||[]).push([[0],{70:function(t,e,n){t.exports=n(78)},75:function(t,e,n){},77:function(t,e,n){},78:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(47),c=n.n(o),i=(n(75),n(5)),l=n.n(i),s=n(48),u=n(2),f=n(15),m=(n(77),n(1)),d=200,h=20,p=40,v=100,y=!0,g=!0;function E(t,e){var n=m.i(".tooltip"),a=m.f().domain(m.d(t,(function(t){return t.day}))).range([0,400]),r=function(t){return a(t.day)},o=m.f().domain(m.d(t,(function(t){return y?t.totalCost:t.Cost}))).range([400,0]),c=function(t){return o(y?t.totalCost:t.Cost)},i=m.d(t,(function(t){return t.day})),l=Object(u.a)(i,2),s=l[0],f=l[1],d=m.d(t,(function(t){return t.Cost})),h=Object(u.a)(d,2),p=h[0],v=h[1],g=m.f().domain(m.d(t,(function(t){return t.Cost}))).range([4,10]),E=function(t){return g(t.Cost)},b=m.g(m.h),x=function(t){return t&&t.Personal?"77":"cc"},C=function(t){return"Sarah Bottari"===t.Who?"#0a304d"+x(t):"Saahil Claypool"===t.Who?"#c94818"+x(t):b(t.Who)+x(t)};C("Saahil Claypool"),C("Sarah Bottari");var w=m.i(e.current).select("g"),S=(w.selectAll("#xAxis").transition(500).call(m.a(a)),w.selectAll("#yAxis").transition(500).call(m.b(o)),w.selectAll("circle").data(t));console.log("drawing ".concat(t.length," points")),S.exit().transition().duration(500).attr("fill","#00000000").remove(),S.enter().append("circle").attr("fill",C).attr("cx",(function(){return a(m.e(s-f,2*f)())})).attr("cy",(function(){return o(m.e(p-v,2*v)())})).attr("r",1).attr("fill","#000000").on("mouseover",(function(t){n.transition().duration(200).style("opacity",.9),n.html("                <strong>".concat(t.Who,"</strong><span>").concat(t.Personal?"  (Personal)":"","</span>                <hr/>\n                <p>").concat(t.What?t.What:"Misc","</p>\n                ")).style("left",m.c.pageX+10+"px").style("top",m.c.pageY-65+"px")})).on("mouseout",(function(t){n.transition().duration(500).style("opacity",0)})).transition().duration(500).attr("cx",r).attr("cy",c).attr("r",E).attr("fill",C),S.transition().duration(500).attr("cx",r).attr("cy",c).attr("r",E).attr("fill",C)}function b(t){var e=t.filter((function(t){return!t.Personal||g}));if(y&&e){e.sort((function(t,e){return t.day>e.day}));var n={};e.forEach((function(t,a){t.Who in n||(n[t.Who]=0),n[t.Who]+=t.Cost,t.totalCost=n[t.Who],e[a]=t}))}return e}var x=function(t){var e=Object(a.useRef)(null);return y=t.isCummulative,g=t.isPersonal,Object(a.useEffect)((function(){!function(t,e){var n=m.f().domain(m.d(t,(function(t){return t.day}))).range([0,400]),a=m.f().domain(m.d(t,(function(t){return t.Cost}))).range([0,400]);if(m.i("body").append("div").attr("class","tooltip").style("opacity",0),t&&e.current){var r=m.i(e.current).append("g").attr("transform","translate(".concat(d,", ").concat(p,")"));r.selectAll("circle").data(t),r.append("g").attr("transform","translate(0,".concat(410,")")).attr("id","xAxis").call(m.a(n));r.append("text").attr("x",200).attr("y",450).style("text-anchor","middle").text("Day of Month");r.append("g").attr("transform","translate(-10,0)").attr("id","yAxis").call(m.b(a));r.append("text").attr("transform","rotate(-90)").attr("y",-80).attr("x",-200).attr("dy","1em").style("text-anchor","middle").text("Cost (USD)"),E(t,e)}}(b(t.data,t.month),e)}),[]),Object(a.useEffect)((function(){E(b(t.data,t.month),e)})),r.a.createElement("div",{className:"GraphView"},r.a.createElement("div",{id:"D3View"},r.a.createElement("svg",{id:"d3SVG",ref:e,width:400+d+h,height:400+v+p})),r.a.createElement("p",null,t.currentMonth))};function C(t){return"$".concat(t.toFixed(2))}var w={"Saahil Claypool":.6,"Sarah Bottari":.4};function S(t,e,n,a){return r.a.createElement("div",{className:"Message",key:t},r.a.createElement("strong",null,t)," has spent ",C(e),".",r.a.createElement("br",null),a>0?r.a.createElement("p",null,"They owe ",C(a)):r.a.createElement("span",null))}var k=function(t){var e=function(t){return t.reduce((function(t,e){return e.Who in t||(t[e.Who]=0),t[e.Who]+=e.Cost,t}),{})}(t.data.filter((function(t){return!t.Personal}))),n=[],a=0;for(var o in e){a+=e[o]}for(var c in e){var i=e[c],l=a*(c in w?w[c]:.5),s=l-i;n.push(S(c,i,0,s))}return r.a.createElement("div",{className:"InfoView"},n)},W=["January","February","March","April","May","June","July","August","September","October","November","December"];function j(t){return O.apply(this,arguments)}function O(){return(O=Object(f.a)(l.a.mark((function t(e){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"",t.next=3,fetch(e+"",{method:"GET",mode:"cors",headers:{"Access-Control-Allow-Origin":"*"}});case 3:return n=t.sent,console.log(n),t.next=7,n.json();case 7:return a=t.sent,t.abrupt("return",a);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function A(){for(var t=["Saahil Claypool","Sarah Bottari"],e=["apples","cars","phones","groceries","computers","desk","chair"],n=[0,2e3],a=[1,12],r=[1,31],o=[],c=a[0];c<a[1];c++)for(var i=function(){var a="".concat(c,"/").concat(l,"/").concat(2020);t.forEach((function(t){if(Math.random()>.5){var r=(l=e)[Math.floor(Math.random()*l.length)],c=Math.random()>.5,i={Date:a,Cost:parseFloat((n[0]+Math.random()*(n[1]-n[0])).toFixed(2)),What:r,Who:t,Personal:c,Description:"".concat(t," bought ").concat(r," and it was ").concat(c?"personal":"shared")};o.push(i)}var l}))},l=r[0];l<r[1];l++)i();return o}function M(t,e){return t.filter((function(t){return parseInt(t.Date.split("/")[0])===e+1}))}var N=function(){var t=r.a.useState((new Date).getMonth()),e=Object(u.a)(t,2),n=e[0],o=e[1],c=r.a.useState([]),i=Object(u.a)(c,2),m=i[0],d=i[1],h=r.a.useState(!0),p=Object(u.a)(h,2),v=p[0],y=p[1],g=r.a.useState(!0),E=Object(u.a)(g,2),b=E[0],C=E[1],w=r.a.useState(!1),S=Object(u.a)(w,2),O=S[0],N=S[1],P=function(t){o((n+t+12)%12)},D=function(){var t=Object(f.a)(l.a.mark((function t(){var e,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!b){t.next=4;break}t.t0=A(),t.next=7;break;case 4:return t.next=6,j("https://jierr542m7.execute-api.us-east-2.amazonaws.com/dev/");case 6:t.t0=t.sent;case 7:e=t.t0,(n=e.map((function(t){var e=t.Date.split("/");return Object(s.a)({},t,{month:parseInt(e[0]),day:parseInt(e[1]),year:parseInt(e[2])})}))).sort((function(t,e){var n=function(t){return t.day+100*t.month+1e3*t.year};return n(t)-n(e)})),d(n);case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(a.useEffect)((function(){D()}),[b]),r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Cost Savings"),r.a.createElement("div",{className:"Controls"},r.a.createElement("button",{className:"ToggleRandom",onClick:function(){return C(!b)}},"random data: ",b?"True":"False"),r.a.createElement("button",{className:"ToggleCummulative",onClick:function(){return y(!v)}},v?"Cummulative":"Single Purchases"),r.a.createElement("button",{className:"TogglePersonal",onClick:function(){return N(!O)}},"personal data: ",O?"True":"False"),r.a.createElement("div",{className:"Content"},r.a.createElement("div",{className:"Picker"},r.a.createElement("ul",{className:"MonthPicker"},r.a.createElement("li",null,r.a.createElement("button",{onClick:function(){return P(-1)}},"\u2190")),r.a.createElement("li",null,r.a.createElement("button",null,"\u2193")),r.a.createElement("li",null,r.a.createElement("button",{onClick:function(){return P(1)}},"\u2192")))),r.a.createElement("h2",null,W[n]),r.a.createElement(x,{month:n,data:M(m,n),isCummulative:v,isPersonal:O}),r.a.createElement(k,{data:M(m,n)}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[70,1,2]]]);
//# sourceMappingURL=main.4311c5bb.chunk.js.map