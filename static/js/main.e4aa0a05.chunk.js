(this.webpackJsonpcountdown=this.webpackJsonpcountdown||[]).push([[0],{107:function(e,t,n){e.exports=n(118)},112:function(e,t,n){},118:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),i=n.n(o),c=(n(112),n(29)),l=n(21),s=n(35),u=n(18),f=n(152),m=n(162),d=n(163),p=n(151),b=n(120),O=n(24),v=n(169),g=n(158),h=n(165),w=n(69),j=n(145),y=n(146),E=Object(s.a)({root:{textAlign:"center"}});var k=function(e){var t=Object(w.a)({},e),n=E(e);return r.a.createElement(j.a,Object.assign({className:n.root},t),r.a.createElement(O.a,{color:"textSecondary",variant:"caption",component:"div"},"Made with \u2764\ufe0f by ",r.a.createElement(y.a,{color:"textSecondary",href:"https://github.com/OkThought"},"Ivan")),r.a.createElement(O.a,{color:"textSecondary",variant:"caption",component:"div"},"Icons made by ",r.a.createElement(y.a,{color:"textSecondary",href:"https://www.flaticon.com/authors/freepik",title:"Freepik"},"Freepik")," from ",r.a.createElement(y.a,{color:"textSecondary",href:"https://www.flaticon.com/",title:"Flaticon"},"flaticon.com")))},P=n(49),S=n(48),x={newCountdown:"/new",countdown:"/"},N=1e3,C=60*N,D=60*C,M=24*D;function I(e){var t=e.to,n=e.from,a=e.title,r=t?t instanceof Date?t:new Date(t):void 0,o=[r?["to",r.toISOString()]:void 0,n?["from",n.toString()]:void 0,a?["title",a]:void 0].filter((function(e){return void 0!==e}));return"".concat(x.countdown,"?").concat(new URLSearchParams(o))}var L=n(166),U=n(150),W=n(15),R=n(148),T=n(170),A=n(96);function B(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function F(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?B(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):B(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var G=Object(s.a)((function(e){return{root:{display:"flex",flexDirection:"column",alignItems:"stretch",justifyContent:"center"},title:{margin:e.spacing(.5)},datetimeContainer:{display:"flex",alignItems:"stretch",alignContent:"stretch",flexWrap:"wrap"},date:{margin:e.spacing(.5),flexGrow:1},time:{margin:e.spacing(.5),flexGrow:1},submit:{margin:e.spacing(.5)}}}));var H=function(e){var t=e.titleProps,n=e.dateProps,a=e.timeProps,o=e.submitProps,i=void 0===o?{}:o,c=e.submit,l=G(e);return r.a.createElement("div",{className:l.root},r.a.createElement(L.a,F({className:l.title,variant:"outlined",label:"Title"},t)),r.a.createElement("div",{className:l.datetimeContainer},r.a.createElement(W.a,{utils:A.a},r.a.createElement(R.a,F({className:l.date,inputVariant:"outlined",variant:"dialog",label:"Date",format:"yyyy MMMM do",InputLabelProps:{shrink:!0}},n)),r.a.createElement(T.a,F({className:l.time,inputVariant:"outlined",variant:"dialog",label:"Time",InputLabelProps:{shrink:!0}},a)))),c||r.a.createElement(U.a,F({className:l.submit},i),"Start"))};var V=function(e){var t=Object(w.a)({},e),n=Object(S.g)(),o=Object(S.f)(),i=Object(a.useState)(""),l=Object(c.a)(i,2),s=l[0],u=l[1],f=Object(a.useState)(NaN),m=Object(c.a)(f,2),d=m[0],p=m[1],b=Object(a.useMemo)((function(){return isNaN(d)?null:new Date(d)}),[d]),O=Object(a.useMemo)((function(){return null===b?void 0:I({to:b,title:s})}),[b,s]),v=Object(a.useCallback)((function(e,t){var a=new URLSearchParams(n.search);t?a.set(e,t):a.delete(e),o.location.search=a.toString(),o.replace(o.location)}),[o,n]),g=Object(a.useCallback)((function(e){var t=e.target.value;u(t),v("title",t)}),[v]),h=Object(a.useCallback)((function(e){var t=e?e.getTime():NaN;p(t),v("tots",isNaN(t)?"":t.toString())}),[v]);return Object(a.useEffect)((function(){document.title=s||"New Countdown"}),[s]),Object(a.useEffect)((function(){var e=NaN,t="";new URLSearchParams(n.search).forEach((function(n,a){"tots"===a?e=parseInt(n,10)||e:"title"===a&&(t=n)})),u(t),p(e)}),[n.search]),r.a.createElement(H,Object.assign({titleProps:{value:s,onChange:g},dateProps:{value:b,onChange:h},timeProps:{value:b,onChange:h},submit:void 0===O?r.a.createElement(U.a,{disabled:!0},"Start"):r.a.createElement(U.a,{component:P.b,to:O},"Start")},t))},Y=n(74),z=n(153),J=n(154),_=n(155),X=n(156),$=100,q=1,K=Object(s.a)((function(e){return{root:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},title:{padding:e.spacing(.5)},unitsContainer:{justifyContent:"center"},unitContainer:{padding:e.spacing(q)},unit:{minWidth:$},unitHeader:{padding:e.spacing(0)},unitValue:{},unitTitle:{}}}));function Q(e){var t=e.countdown,n=e.title,o=e.includeMilliseconds,i=void 0!==o&&o,c=Object(u.a)(),l=Object(a.useMemo)((function(){return $+c.spacing(q)}),[c]),s=[Object(f.a)(c.breakpoints.up(l)),Object(f.a)(c.breakpoints.up(2*l)),Object(f.a)(c.breakpoints.up(3*l)),Object(f.a)(c.breakpoints.up(4*l)),Object(f.a)(c.breakpoints.up(5*l))].lastIndexOf(!0)+1,m=Object(a.useMemo)((function(){return t%N}),[t]),d=Object(a.useMemo)((function(){return Math.floor(t%C/N)}),[t]),p=Object(a.useMemo)((function(){return Math.floor(t%D/C)}),[t]),b=Object(a.useMemo)((function(){return Math.floor(t%M/D)}),[t]),v=Object(a.useMemo)((function(){return Math.floor(t/M)}),[t]),g=Object(a.useMemo)((function(){var e=[{key:"days",title:"days",value:v},{key:"hours",title:"hours",value:b},{key:"minutes",title:"minutes",value:p},{key:"seconds",title:"seconds",value:d}];i&&e.push({key:"milliseconds",title:"milliseconds",value:m,cols:5===s?1:3===s?2:s});var t=e.findIndex((function(e){return 0!==e.value}));return-1===t?[]:e.slice(t)}),[v,b,i,s,m,p,d]),h=Object(a.useMemo)((function(){return 3===s?2:Math.min(s,g.length)}),[s,g.length]),w=K(e);return r.a.createElement("div",{className:w.root},n&&r.a.createElement(O.a,{className:w.title,variant:"h5",component:"div"},n),r.a.createElement(z.a,{className:w.unitsContainer,cellHeight:"auto",spacing:0,cols:h,style:{width:$*h}},g.map((function(e){var t=e.value,n=e.title,a=e.key,o=Object(Y.a)(e,["value","title","key"]);return r.a.createElement(J.a,Object.assign({key:a,className:w.unitContainer},o),r.a.createElement(_.a,{className:w.unit,elevation:0},r.a.createElement(X.a,{title:t,subheader:n,classes:{root:w.unitHeader,title:w.unitValue,subheader:w.unitTitle}})))}))))}var Z=10*N,ee=N/20,te=N/2;function ne(e){var t=e.updateInterval,n=Object(S.g)(),o=Object(a.useState)(""),i=Object(c.a)(o,2),l=i[0],s=i[1],u=Object(a.useState)([]),f=Object(c.a)(u,2),m=f[0],d=f[1],p=Object(a.useState)(-1),b=Object(c.a)(p,2),O=b[0],v=b[1],g=Object(a.useState)(!1),h=Object(c.a)(g,2),w=h[0],j=h[1],y=Object(a.useState)(0),E=Object(c.a)(y,2),k=E[0],P=E[1],x=Object(a.useMemo)((function(){return void 0!==t?t:k>Z?te:ee}),[t,k]),N=Object(a.useMemo)((function(){return x===ee}),[x]),C=Object(a.useMemo)((function(){return O>0}),[O]);return Object(a.useEffect)((function(){var e=Date.now(),t="",a=[function(){return j(!0)},function(){return P(0)}];new URLSearchParams(n.search).forEach((function(n,r){if("to"===r)e=Date.parse(n);else if("from"===r){var o=parseInt(n,10);isNaN(o)||(e=Date.now()+o)}else"title"===r?t=n:"finish_title"===r?a.push((function(){return s(n)})):"finish_redirect"===r&&a.push((function(){window.location.href=n}))})),v(e),s(t),d(a),j(!1)}),[n.search]),Object(a.useEffect)((function(){if(C&&!w){var e=setInterval((function(){var e=O-Date.now();if(e<=0){var t=!0,n=!1,a=void 0;try{for(var r,o=m[Symbol.iterator]();!(t=(r=o.next()).done);t=!0){(0,r.value)()}}catch(i){n=!0,a=i}finally{try{t||null==o.return||o.return()}finally{if(n)throw a}}}else P(e)}),x);return function(){return clearInterval(e)}}}),[P,x,w,O,m,k,C]),Object(a.useEffect)((function(){document.title=l||"Countdown"}),[l]),C?r.a.createElement(Q,{title:l,countdown:k,includeMilliseconds:N}):null}ne.defaultProps={variant:"subtitle1",component:"div"};var ae=ne,re=n(147),oe=n(159),ie=n(160),ce=n(161),le=n(157);function se(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function ue(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?se(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):se(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var fe=Object(s.a)((function(e){return{root:{display:"flex"},toolbar:ue({},e.mixins.toolbar,{display:"flex",justifyContent:"center",alignItems:"center"}),navItem:{color:"inherit",margin:e.spacing(.5)}}}));function me(e){var t=e.LinkProps,n=void 0===t?{}:t,o=Object(Y.a)(e,["LinkProps"]),i=Object(a.useMemo)((function(){return[{label:"New",icon:r.a.createElement(le.a,null),getUrl:function(){return x.newCountdown}},{label:"New Year",icon:r.a.createElement("span",{role:"img","aria-label":"new year"},"\ud83c\udf84"),getUrl:function(){return I({to:new Date((new Date).getFullYear()+1,0,1,0,0,0,0),title:"New Year \ud83c\udf84"})}},{label:"Midnight",icon:r.a.createElement("span",{role:"img","aria-label":"midnight"},"\ud83c\udf19"),getUrl:function(){var e=new Date;return e.setDate(e.getDate()+1),I({to:new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0,0),title:"Midnight \ud83c\udf19"})}},{label:"5 minutes",icon:r.a.createElement("span",{role:"img","aria-label":"5 minutes"},"5\ufe0f\u20e3"),getUrl:function(){return I({from:5*C,title:"5 minutes"})}}]}),[]),c=fe(e);return r.a.createElement("div",Object.assign({className:c.root},o),r.a.createElement("div",{className:c.toolbar}),r.a.createElement(g.a,null),r.a.createElement(re.a,null,i.map((function(e){var t=e.label,a=e.key,o=void 0===a?t:a,i=e.icon,c=e.getUrl;return r.a.createElement(oe.a,Object.assign({button:!0,key:o,component:P.b,to:c},n),r.a.createElement(ie.a,null,i),r.a.createElement(ce.a,null,t))}))))}me.defaultProps={position:"sticky"};var de=me,pe=n(164),be=n(2);function Oe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function ve(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Oe(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Oe(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ge=Object(s.a)((function(e){return{root:{display:"flex",flexDirection:"column",minHeight:"100vh"},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},toolbar:ve({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:e.spacing(0,1)},e.mixins.toolbar),hide:{display:"none"},drawer:{width:240,flexShrink:0,whiteSpace:"nowrap"},drawerOpen:{width:240,transition:e.transitions.create(["width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},drawerClose:Object(l.a)({transition:e.transitions.create(["width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:0},e.breakpoints.up("sm"),{width:e.spacing(7)+1}),nav:{display:"flex"},contentRoot:{flexGrow:1,display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"center"},content:{flexGrow:1,display:"flex",flexDirection:"column",justifyContent:"center"},footer:{flexShrink:0}}}));var he=function(e){var t,n,o=ge(e),i=Object(a.useState)(!1),s=Object(c.a)(i,2),w=s[0],j=s[1],y=function(){return j(!1)},E=function(){return j(!0)},N=Object(u.a)(),C=Object(f.a)(N.breakpoints.down("sm")),D=Object(a.useMemo)((function(){return!C||w}),[C,w]);Object(a.useEffect)((function(){document.title="Countdown"}));var M=r.a.createElement(de,{LinkProps:{onClick:y}});return r.a.createElement(P.a,{basename:"/countdown"},r.a.createElement(m.a,null),r.a.createElement("div",{className:o.root},r.a.createElement(d.a,{className:Object(be.a)(o.appBar,Object(l.a)({},o.appBarShift,D))},r.a.createElement(p.a,null,r.a.createElement(b.a,{color:"inherit",edge:"start",onClick:E,className:Object(be.a)(Object(l.a)({},o.hide,D))},r.a.createElement(pe.a,null)),r.a.createElement(O.a,{variant:"h6",noWrap:!0},"Countdown"))),r.a.createElement(v.a,{className:Object(be.a)(o.drawer,(t={},Object(l.a)(t,o.drawerOpen,D),Object(l.a)(t,o.drawerClose,!D),t)),classes:{paper:Object(be.a)((n={},Object(l.a)(n,o.drawerOpen,D),Object(l.a)(n,o.drawerClose,!D),n))},open:D,variant:"permanent",anchor:"left",onClose:E},r.a.createElement("div",{className:o.toolbar},r.a.createElement(b.a,{className:Object(be.a)(Object(l.a)({},o.hide,!C||!w)),onClick:y},r.a.createElement(h.a,null))),r.a.createElement(g.a,null),M),r.a.createElement("div",{className:o.contentRoot},r.a.createElement("div",{className:o.content},r.a.createElement(S.c,null,r.a.createElement(S.a,{path:x.newCountdown,exact:!0,strict:!0},r.a.createElement(V,null)),r.a.createElement(S.a,{path:x.countdown,exact:!0,strict:!0},r.a.createElement(ae,null)))),r.a.createElement(k,{className:o.footer}))))},we=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function je(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(r.a.createElement(he,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/countdown",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/countdown","/service-worker.js");we?(!function(e,t){fetch(e).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):je(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):je(t,e)}))}}()}},[[107,1,2]]]);
//# sourceMappingURL=main.e4aa0a05.chunk.js.map