(this.webpackJsonpawesomechatapp=this.webpackJsonpawesomechatapp||[]).push([[0],{176:function(e,t,n){},209:function(e,t,n){},231:function(e,t){},233:function(e,t){},243:function(e,t){},245:function(e,t){},272:function(e,t){},274:function(e,t){},275:function(e,t){},280:function(e,t){},282:function(e,t){},288:function(e,t){},290:function(e,t){},309:function(e,t){},321:function(e,t){},324:function(e,t){},327:function(e,t,n){},328:function(e,t,n){},329:function(e,t,n){},330:function(e,t,n){},331:function(e,t,n){"use strict";n.r(t),n.d(t,"Home",(function(){return S})),n.d(t,"Settings",(function(){return F})),n.d(t,"Rooms",(function(){return K})),n.d(t,"Room",(function(){return q})),n.d(t,"Login",(function(){return Q})),n.d(t,"Signup",(function(){return X}));var c=n(1),s=n.n(c),a=n(61),r=n.n(a),o=(n(176),n(4)),i=n(28),u=n(8),j=n(167),l=n.n(j).a.connect("localhost:4000"),m=s.a.createContext(),b=function(e){window.localStorage.setItem("token",JSON.stringify(e))},d=function(){try{return JSON.parse(window.localStorage.getItem("token")).token}catch(e){return null}},f=function(){try{return JSON.parse(window.localStorage.getItem("token")).username}catch(e){return null}},p=function(){try{return JSON.parse(window.localStorage.getItem("token")).id}catch(e){return null}},O=function(){window.localStorage.removeItem("token")},h=function(e){window.localStorage.setItem("currentTheme",e)},x=function(e,t,n){t(!0),n(e),setTimeout((function(){n(""),t(!1)}),2e3)},v=n(7),g=n(0),w=function(e){var t=e.navProps,n=t.showInfo,c=t.setShowInfo,s=t.roomName,a=Object(u.g)(),r=function(){a.push("/rooms")},o=function(){a.push("/settings")},i=function(){c(!n)};return Object(g.jsx)("div",{className:"header",children:Object(g.jsxs)("div",{className:"topBar",children:[Object(g.jsx)(v.a,{className:"button",onClick:r}),Object(g.jsx)("div",{children:s}),Object(g.jsx)("div",{children:function(){switch(s){case"AWESOMECHATAPP":return Object(g.jsx)(v.b,{className:"button",onClick:o});case"SETTINGS":return Object(g.jsx)(v.g,{className:"button",onClick:r});case"LOGIN":case"SIGN UP":return Object(g.jsx)(v.g,{className:"button",onClick:r,style:{visibility:"hidden"}});default:return n?Object(g.jsx)(v.g,{className:"button",onClick:i}):Object(g.jsx)(v.e,{className:"button",onClick:i})}}()})]})})};n(209);function N(){var e=Object(c.useState)(""),t=Object(o.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)({}),r=Object(o.a)(a,2),j=r[0],b=r[1],d=Object(c.useState)(!1),p=Object(o.a)(d,2),O=p[0],h=p[1],x=window.localStorage;Object(c.useEffect)((function(){x.getItem("currentTheme")||x.setItem("currentTheme","nightly"),document.documentElement.className="",document.documentElement.classList.add("theme-".concat(x.getItem("currentTheme")))})),Object(c.useEffect)((function(){b(f())}),[]),Object(c.useEffect)((function(){s("AWESOMECHATAPP")}),[s]);var v={setRoomName:s,showInfo:O,setShowInfo:h},N={roomName:n,setRoomName:s,setShowInfo:h,showInfo:O};return Object(g.jsx)(m.Provider,{value:l,children:Object(g.jsxs)(i.a,{children:[Object(g.jsx)(w,{navProps:N}),Object(g.jsxs)(u.d,{children:[Object(g.jsx)(u.b,{path:"/settings",children:j?Object(g.jsx)(F,{setRoomName:s}):Object(g.jsx)(u.a,{to:"/login"})}),Object(g.jsx)(u.b,{path:"/rooms/:id",children:Object(g.jsx)(q,{roomProps:v})}),Object(g.jsx)(u.b,{path:"/rooms",children:j?Object(g.jsx)(K,{setRoomName:s}):Object(g.jsx)(u.a,{to:"/login"})}),Object(g.jsx)(u.b,{path:"/login",children:Object(g.jsx)(Q,{setCurrentUser:b,setRoomName:s})}),Object(g.jsx)(u.b,{path:"/signup",children:Object(g.jsx)(X,{setRoomName:s})}),Object(g.jsx)(u.b,{path:"/",children:j?Object(g.jsx)(u.a,{to:"/rooms"}):Object(g.jsx)(u.a,{to:"/login"})})]})]})})}var S=function(e){return Object(g.jsx)("div",{})},y=n(3),I=n.n(y),k=n(6),C=n(13),E=n.n(C),P="http://localhost:4000/api/";P="/api/";var R=function(){var e=Object(k.a)(I.a.mark((function e(t){var n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.post("".concat(P,"login"),t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=Object(k.a)(I.a.mark((function e(t){var n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.post("".concat(P,"users"),t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(k.a)(I.a.mark((function e(t){var n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.put("".concat(P,"users/"),t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(k.a)(I.a.mark((function e(t){var n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,E.a.delete("".concat(P,"users/").concat(t.userId));case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(e){var t=e.message;return function(){if("string"===typeof t.message)return Object(g.jsx)("ul",{className:"notification",children:Object(g.jsx)("li",{children:t.message})});if("object"===typeof t.message){var e=t.message.map((function(e){return Object(g.jsx)("li",{children:e.msg},e.msg)}));return Object(g.jsx)("ul",{className:"notification",children:e})}return null}()},M=function(e){var t=e.setIsChangePasswordVisible,n=e.isChangePasswordVisible,s=Object(c.useState)(""),a=Object(o.a)(s,2),r=a[0],i=a[1],u=Object(c.useState)(""),j=Object(o.a)(u,2),l=j[0],m=j[1],b=Object(c.useState)(f()),d=Object(o.a)(b,2),p=d[0],O=(d[1],Object(c.useState)(!1)),h=Object(o.a)(O,2),w=h[0],N=h[1],S=Object(c.useState)(!1),y=Object(o.a)(S,2),C=y[0],E=y[1],P=Object(c.useState)(!1),R=Object(o.a)(P,2),D=(R[0],R[1],Object(c.useState)("")),A=Object(o.a)(D,2),M=A[0],F=A[1],B=function(e){e.preventDefault(),i(e.target.value)},V=function(e){e.preventDefault(),m(e.target.value)},G=function(){var e=Object(k.a)(I.a.mark((function e(n){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,T({password:r,newPassword:l,user:p});case 4:t(!1),i(""),m(""),x({message:"Password changed successfully.",type:"success"},N,F),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),e.t0.response.data.errors&&x({message:"Check old and new password",type:"error"},N,F);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}();function U(){var e=document.getElementById("login-form-username-input");"password"===e.type?(e.type="text",E(!0)):(e.type="password",E(!1))}function H(){var e=document.getElementById("newPassword");"password"===e.type?(e.type="text",E(!0)):(e.type="password",E(!1))}var J=function(){t(!1),i(""),m("")};return n?Object(g.jsxs)("div",{className:"changePassword",children:[w?Object(g.jsx)(L,{message:M}):"",Object(g.jsxs)("form",{className:"changePasswordForm",onSubmit:G,children:[Object(g.jsx)("h2",{children:"Change password"}),Object(g.jsxs)("div",{className:"loginFormDiv",children:[Object(g.jsx)("h3",{children:"Password"}),Object(g.jsx)("input",{id:"login-form-username-input",type:"password",name:"password",onChange:B,value:r}),C?Object(g.jsx)(v.d,{id:"pwIcon",className:"pwIcon",onClick:U}):Object(g.jsx)(v.c,{id:"pwIcon",className:"pwIcon",onClick:U})]}),Object(g.jsxs)("div",{className:"loginFormDiv",children:[Object(g.jsx)("h3",{children:"New password"}),Object(g.jsx)("input",{type:"password",name:"newPassword",id:"newPassword",onChange:V,value:l}),C?Object(g.jsx)(v.d,{id:"pwIcon",className:"pwIcon",onClick:H}):Object(g.jsx)(v.c,{id:"pwIcon",className:"pwIcon",onClick:H})]}),Object(g.jsx)("input",{type:"submit",value:"Confirm"})]}),Object(g.jsx)("button",{onClick:J,children:"Cancel"})]}):null};var F=function(e){var t=e.setRoomName,n=Object(u.g)(),s=Object(c.useState)(f()),a=Object(o.a)(s,2),r=a[0],i=a[1],j=Object(c.useState)(p()),l=Object(o.a)(j,2),m=l[0],b=(l[1],Object(c.useState)(!1)),d=Object(o.a)(b,2),v=d[0],w=d[1],N=Object(c.useState)(""),S=Object(o.a)(N,2),y=S[0],C=S[1],E=window.localStorage,P=Object(c.useState)(!1),R=Object(o.a)(P,2),D=R[0],T=R[1],F=Object(c.useState)(E.getItem("currentTheme")),B=Object(o.a)(F,2),V=(B[0],B[1]);Object(c.useEffect)((function(){t("SETTINGS")}));var G=function(){i(null),O(),t("AWESOMECHATAPP"),h("nightly"),n.push("/login")},U=function(){var e=Object(k.a)(I.a.mark((function e(t){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Are you sure you wish to delete this item?")){e.next=14;break}return e.prev=1,e.next=4,A({userId:m});case 4:i(null),O(),h("nightly"),n.push("/login"),x({message:"Account deleted successfully.",type:"success"},w,C),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),e.t0.response.data.errors&&x({message:"Error",type:"error"},w,C);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}(),H=function(e){E.setItem("currentTheme",e.target.value),V({value:e.target.value}),document.documentElement.className="",document.documentElement.classList.add("theme-".concat(E.getItem("currentTheme")))},J=function(){T(!0)};return r?Object(g.jsxs)("div",{children:[v?Object(g.jsx)(L,{message:y}):"",Object(g.jsxs)("div",{className:"settings",children:[Object(g.jsx)("h2",{children:"Choose a theme"}),Object(g.jsxs)("select",{name:"themes",id:"themes",value:E.getItem("currentTheme"),onChange:H,children:[Object(g.jsx)("option",{value:"nightly",children:"nightly"}),Object(g.jsx)("option",{value:"brome",children:"brome"}),Object(g.jsx)("option",{value:"peachesncream",children:"peachesncream"})]}),Object(g.jsx)("button",{className:"settingsButton",onClick:J,children:"Change password"}),Object(g.jsx)("button",{className:"settingsButton",onClick:G,children:"Logout"}),Object(g.jsx)("button",{className:"settingsButton",onClick:U,children:"Delete account"})]}),Object(g.jsx)(M,{setIsChangePasswordVisible:T,isChangePasswordVisible:D})]}):Object(g.jsx)("h1",{children:"Not logged in"})},B=n(171),V=n(170),G="http://localhost:4000/api/messages";G="/api/messages";var U=function(){var e=Object(k.a)(I.a.mark((function e(t){var n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.get(G,{params:{roomId:t},headers:{authorization:"bearer ".concat(d())}});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H="http://localhost:4000/api/rooms";H="/api/rooms";var J=function(){var e=Object(k.a)(I.a.mark((function e(){var t;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.get(H,{headers:{authorization:"bearer ".concat(d())}});case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=Object(k.a)(I.a.mark((function e(t){var n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.get("".concat(H,"/").concat(t),{headers:{authorization:"bearer ".concat(d())}});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(){var e=Object(k.a)(I.a.mark((function e(t){var n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,E.a.post("".concat(H,"/"),{name:t.newRoomName},{headers:{authorization:"bearer ".concat(d())}});case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),z=(n(327),n(328),function(e){(function(){for(var e=[],t=0;t<100;t++)e.push(t)})(),e.setShowInfo;var t=e.connectedUsers;e.roomName;return console.log(t),Object(g.jsxs)("div",{className:"infoContainer",children:[Object(g.jsx)("h1",{children:"Info"}),Object(g.jsx)("h2",{children:"Connected users:"}),Object(g.jsx)("ul",{children:t.map((function(e){return Object(g.jsx)("li",{children:e.username})}))})]})});var q=function(e){var t=e.roomProps,n=Object(c.useState)([]),s=Object(o.a)(n,2),a=s[0],r=s[1],i=Object(c.useState)([]),j=Object(o.a)(i,2),l=j[0],b=j[1],d=Object(c.useState)(""),O=Object(o.a)(d,2),h=O[0],w=O[1],N=Object(c.useState)(!1),S=Object(o.a)(N,2),y=S[0],C=S[1],E=Object(c.useState)(""),P=Object(o.a)(E,2),R=P[0],D=P[1],T=Object(c.useState)([]),A=Object(o.a)(T,2),M=A[0],F=A[1],G=Object(c.useContext)(m),H=(Object(u.g)(),Object(c.useRef)(null)),J=t.setRoomName,_=t.setShowInfo,q=t.showInfo,$=Object(u.i)(),K=Object(c.useCallback)((function(e){console.log("hnm"),r([].concat(Object(B.a)(a),[e])),G.off("message:received")}),[a,G]),Q=Object(c.useCallback)((function(e){r(a.filter((function(t){return t._id!==e._id}))),G.off("message:removed")}),[a,G]);Object(c.useEffect)((function(){var e=function(){var e=Object(k.a)(I.a.mark((function e(){var t,n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U($.id);case 2:return t=e.sent,e.next=5,W($.id);case 5:return n=e.sent,J(n.name),r(t),e.abrupt("return",(function(){r([])}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[$,J]),Object(c.useEffect)((function(){return G.off("message:received"),G.off("message:removed"),G.once("message:received",(function(e){return K(e)})),G.once("message:removed",(function(e){return Q(e)})),function(){G.off("message:received",K),G.off("message:removed",Q)}}),[G,K,Q]),Object(c.useEffect)((function(){return G.emit("room:join",{roomId:$,user:p(),username:f()}),G.on("connected:users",(function(e){b(e)})),function(){G.emit("room:leave",{roomId:$,user:p(),username:f()}),b([])}}),[G,$]),Object(c.useEffect)((function(){setTimeout((function(){X()}),25)}),[a]);var X=function(){H.current.scrollIntoView({behavior:"auto"})};return Object(c.useEffect)((function(){var e=function(e){var t=new Image;return t.src=e.content,function(e){return null!=e.match(/\.(jpeg|jpg|gif|png)$/)}(e.content)&&!t.src.includes("/rooms/")?Object(g.jsx)("img",{src:t.src,alt:t.src}):Object(g.jsx)("p",{className:"messageContent",children:e.content})};F(a.map((function(t){return Object(g.jsxs)("li",{className:t.user===f()?"sentMessage":"receivedMessage",children:[Object(g.jsx)("div",{className:"messageMenu",onClick:function(){return function(e){G.emit("message:delete",e),r(a.filter((function(t){return t._id!==e._id})))}(t)},children:Object(g.jsx)(v.h,{})}),Object(g.jsxs)("div",{className:"fromUser",children:[t.user===f()?"":Object(g.jsx)("p",{className:"userName",children:t.user}),e(t)]})]},t._id)})))}),[a,G]),Object(g.jsxs)("div",{className:"roomViewContainer",children:[Object(g.jsxs)("div",{className:"room",children:[Object(g.jsxs)("ul",{className:"chat",children:[M,Object(g.jsx)("div",{ref:H})]}),Object(g.jsxs)("form",{className:"submitMessageForm",onSubmit:function(e){if(e.preventDefault(),""!==h){var t={_id:(new V.a).toString(),roomName:$.id,room:$.id,user:f(),content:h};w(""),G.emit("message:create",t),setTimeout((function(){X()}),10)}else x({message:"Message cannot be empty.",type:"error"},C,D)},children:[Object(g.jsx)("input",{onChange:function(e){e.preventDefault(),w(e.target.value)},value:h}),Object(g.jsx)("button",{className:"submitMessage",type:"submit",children:Object(g.jsx)(v.f,{})})]})]}),q?Object(g.jsx)(z,{roomName:$,connectedUsers:l,setShowInfo:_}):"",y?Object(g.jsx)(L,{message:R}):""]})},$=(n(329),function(e){var t=e.isNewRoomVisible,n=e.setNewRoomVisible,s=Object(c.useState)(!1),a=Object(o.a)(s,2),r=a[0],i=a[1],u=Object(c.useState)(""),j=Object(o.a)(u,2),l=j[0],m=j[1],b=Object(c.useState)(""),d=Object(o.a)(b,2),f=d[0],p=d[1],O=function(e){e.preventDefault(),p(e.target.value)},h=function(){var e=Object(k.a)(I.a.mark((function e(t){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),""===f){e.next=15;break}return e.prev=2,e.next=5,_({newRoomName:f});case 5:n(!1),p(""),x({message:"Room added successfully.",type:"success"},i,m),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),e.t0.response.data.errors&&(console.log(e.t0),x({message:"Name is required",type:"error"},i,m));case 13:e.next=16;break;case 15:x({message:"Name is required",type:"error"},i,m);case 16:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}(),v=function(){n(!1),p("")};return t?Object(g.jsxs)("div",{className:"addNewRoom",children:[Object(g.jsxs)("form",{className:"newRoomForm",onSubmit:h,children:[Object(g.jsx)("div",{className:"loginFormDiv",children:Object(g.jsx)("input",{id:"login-form-username-input",type:"name",name:"newRoomName",onChange:O,value:f,placeholder:"name"})}),Object(g.jsx)("input",{type:"submit",value:"Confirm"})]}),Object(g.jsx)("button",{onClick:v,children:"Cancel"}),r?Object(g.jsx)(L,{message:l}):""]}):null});var K=function(e){var t=e.socket,n=e.handleNotification,s=e.setRoomName,a=Object(c.useState)([]),r=Object(o.a)(a,2),j=r[0],l=r[1],m=Object(u.j)(),b=(Object(u.g)(),Object(u.h)()),d=Object(c.useState)(!1),p=Object(o.a)(d,2),O=p[0],h=p[1],x=function(){var e=Object(k.a)(I.a.mark((function e(){var t;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J();case 2:t=e.sent,l(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){s("AWESOMECHATAPP"),x()}),[b,s]);var v=j.map((function(e){return Object(g.jsx)(u.b,{exact:!0,path:"".concat(m.url,"/").concat(e.id),children:Object(g.jsx)(q,{roomName:e.name,socket:t,handleNotification:n,roomId:e.id})},e.id)})),w=function(e){return e.messages.length>0?e.messages[e.messages.length-1].content:""},N=function(e){return e.messages.length>0?new Date(e.messages[e.messages.length-1].date).toLocaleString():""},S=function(){var e=Object(k.a)(I.a.mark((function e(t){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:h(!0);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return f()?Object(g.jsxs)("div",{className:"roomListContainer",children:[Object(g.jsx)("ul",{className:"roomList",children:j.map((function(e){return Object(g.jsxs)(i.b,{className:"roomListItem",to:"".concat(m.url,"/").concat(e.id),onClick:function(){return s(e.name)},children:[Object(g.jsx)("div",{className:"nameMessage",children:Object(g.jsx)("h2",{className:"roomLink",to:"".concat(m.url,"/").concat(e.id),children:e.name})}),Object(g.jsxs)("div",{className:"iconTime",children:[Object(g.jsx)("p",{className:"lastMessage",children:w(e)}),Object(g.jsx)("p",{children:N(e)})]})]},e.id)}))}),Object(g.jsx)("div",{className:"newRoomButton",children:Object(g.jsx)("button",{className:"newRoom",onClick:S,children:"New Room"})}),Object(g.jsx)(u.d,{children:v}),Object(g.jsx)($,{isNewRoomVisible:O,setNewRoomVisible:h})]}):Object(g.jsx)("div",{children:Object(g.jsx)("h1",{children:"Not logged in"})})};n(330);var Q=function(e){var t=e.setCurrentUser,n=e.setRoomName,s=Object(c.useState)(""),a=Object(o.a)(s,2),r=a[0],i=a[1],j=Object(c.useState)(""),l=Object(o.a)(j,2),m=l[0],d=l[1],f=Object(c.useState)(!1),p=Object(o.a)(f,2),O=p[0],h=p[1],w=Object(c.useState)(""),N=Object(o.a)(w,2),S=N[0],y=N[1],C=Object(c.useState)(!1),E=Object(o.a)(C,2),P=E[0],D=E[1],T=Object(u.g)();function A(){var e=document.getElementById("password");"password"===e.type?(e.type="text",D(!0)):(e.type="password",D(!1))}Object(c.useEffect)((function(){n("LOGIN")}));var M=function(){var e=Object(k.a)(I.a.mark((function e(n){var c;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,R({username:r,password:m});case 4:c=e.sent,b(c),t(c),F(),T.push("/rooms"),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),e.t0.response&&x({message:e.t0.response.data.error,type:"error"},h,y),F();case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}(),F=function(){d(""),i("")};return Object(g.jsxs)("div",{children:[O?Object(g.jsx)(L,{message:S}):"",Object(g.jsx)("div",{children:Object(g.jsxs)("form",{className:"loginForm",onSubmit:M,children:[Object(g.jsx)("h1",{children:"AWESOMECHATAPP"}),Object(g.jsxs)("div",{className:"loginFormDiv",children:[Object(g.jsx)("h3",{children:"Name"}),Object(g.jsx)("input",{id:"login-form-username-input",type:"text",name:"name",onChange:function(e){e.preventDefault(),i(e.target.value)},value:r})]}),Object(g.jsxs)("div",{className:"loginFormDiv",children:[Object(g.jsx)("h3",{children:"Password"}),Object(g.jsx)("input",{type:"password",name:"password",id:"password",onChange:function(e){e.preventDefault(),d(e.target.value)},value:m}),P?Object(g.jsx)(v.d,{id:"pwIcon",className:"pwIcon",onClick:A}):Object(g.jsx)(v.c,{id:"pwIcon",className:"pwIcon",onClick:A})]}),Object(g.jsxs)("div",{className:"loginFormSubmit",children:[Object(g.jsx)("input",{type:"submit",value:"LOGIN"}),Object(g.jsxs)("div",{className:"formInstructions",children:[Object(g.jsx)("p",{children:"Don\u2019t have account yet?"}),Object(g.jsx)("a",{className:"formLink",href:"/signup",children:"Sign up now!"})]})]})]})})]})};var X=function(e){var t=e.setRoomName,n=Object(c.useState)(""),s=Object(o.a)(n,2),a=s[0],r=s[1],i=Object(c.useState)(""),u=Object(o.a)(i,2),j=u[0],l=u[1],m=Object(c.useState)(!1),d=Object(o.a)(m,2),f=d[0],p=d[1],O=Object(c.useState)(""),h=Object(o.a)(O,2),w=h[0],N=h[1],S=Object(c.useState)(!1),y=Object(o.a)(S,2),C=y[0],E=y[1];function P(){var e=document.getElementById("password");"password"===e.type?(e.type="text",E(!0)):(e.type="password",E(!1))}Object(c.useEffect)((function(){t("SIGN UP")}));var R=function(){var e=Object(k.a)(I.a.mark((function e(t){var n;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,D({username:a,password:j});case 4:n=e.sent,b(n),x({message:"".concat(a," created successfully."),type:"success"},p,N),r(""),l(""),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),e.t0.response.data.error?(x({message:e.t0.response.data.error,type:"error"},p,N),l("")):(x({message:e.t0.response.data.errors,type:"error"},p,N),l(""));case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)("div",{children:[f?Object(g.jsx)(L,{message:w}):"",Object(g.jsx)("div",{children:Object(g.jsxs)("form",{className:"loginForm",onSubmit:R,children:[Object(g.jsx)("h1",{children:"AWESOMECHATAPP"}),Object(g.jsxs)("div",{className:"loginFormDiv",children:[Object(g.jsx)("h3",{children:"Name"}),Object(g.jsx)("input",{type:"text",name:"name",onChange:function(e){e.preventDefault(),r(e.target.value)},value:a})]}),Object(g.jsxs)("div",{className:"loginFormDiv",children:[Object(g.jsx)("h3",{children:"Password"}),Object(g.jsx)("input",{type:"password",name:"password",id:"password",onChange:function(e){e.preventDefault(),l(e.target.value)},value:j}),C?Object(g.jsx)(v.d,{id:"pwIcon",className:"pwIcon",onClick:P}):Object(g.jsx)(v.c,{id:"pwIcon",className:"pwIcon",onClick:P})]}),Object(g.jsxs)("div",{className:"loginFormSubmit",children:[Object(g.jsx)("input",{type:"submit",value:"SIGNUP"}),Object(g.jsxs)("div",{className:"formInstructions",children:[Object(g.jsx)("p",{children:"Already have an account?"}),Object(g.jsx)("a",{className:"formLink",href:"/login",children:"Log in!"})]})]})]})})]})};r.a.render(Object(g.jsx)(s.a.StrictMode,{children:Object(g.jsx)(N,{style:{height:"100%"}})}),document.getElementById("root"))}},[[331,1,2]]]);
//# sourceMappingURL=main.4c5aff29.chunk.js.map