(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,n,t){e.exports=t(40)},40:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(16),c=t.n(r),u=t(17),l=t(5),i=t(2),m=t(4),s=t.n(m),f="/api/persons",d=function(){return s.a.get(f).then((function(e){return e.data}))},h=function(e){return s.a.post(f,e).then((function(e){return e.data}))},b=function(e,n){return s.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){return s.a.delete("".concat(f,"/").concat(e)).then((function(e){return console.log(e),e.data}))},p=function(e){var n=e.search,t=e.changeSearch;return o.a.createElement("input",{value:n,onChange:t})},v=function(e){var n=e.submitHandler,t=e.newName,a=e.changeName,r=e.phone,c=e.changePhone;return o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,"name: ",o.a.createElement("input",{id:"yup",value:t,onChange:a})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:r,onChange:c})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=e.persons,t=e.search,a=e.setPersons;return o.a.createElement("ul",null,n.filter((function(e){return-1!==e.name.toLowerCase().indexOf(t.toLowerCase())})).map((function(e){return o.a.createElement("li",{key:e.id},e.name," ",e.number," ",o.a.createElement("button",{onClick:function(){return function(e){var t=e.id,o=e.name;window.confirm("Delete ".concat(o))&&g(t).then((function(e){console.log(e,"removed"),a(n.filter((function(e){return e.id!==t})))})).catch((function(e){return console.log(e)}))}(e)}},"delete"))})))},j=function(e){var n=e.message;if(!n)return null;var t=n.message,a={color:n.color,background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return o.a.createElement("div",{style:a},t)},O=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),m=Object(i.a)(c,2),s=m[0],f=m[1],g=Object(a.useState)(""),O=Object(i.a)(g,2),w=O[0],S=O[1],k=Object(a.useState)(""),y=Object(i.a)(k,2),C=y[0],N=y[1],P=Object(a.useState)(null),x=Object(i.a)(P,2),B=x[0],D=x[1];Object(a.useEffect)((function(){console.log("effect"),d().then((function(e){console.log("promise fulfilled",e),r(e)}))}),[]);return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(j,{message:B}),o.a.createElement(p,{search:C,changeSearch:function(e){N(e.target.value)}}),o.a.createElement("h2",null," add new people"),o.a.createElement("h2",null,"Numbers"),o.a.createElement(v,{submitHandler:function(e){e.preventDefault();var n={name:s,number:w,id:t.length+1},a=t.find((function(e){return e.name===n.name}));a?window.confirm("".concat(a.name," is already added to the phonebook, replace the old number with a new one?"))&&b(a.id,Object(l.a)(Object(l.a)({},a),{},{number:w})).then((function(e){console.log(e,"updated"),r(t.filter((function(e){return e.id!==a.id})).concat(Object(l.a)(Object(l.a)({},a),{},{number:w}))),f(""),S("")})).catch((function(e){D({message:"Information of  ".concat(a.name," has already been removed from the server"),color:"red"}),setTimeout((function(){return D(null)}),3e3)})):h(n).then((function(e){r([].concat(Object(u.a)(t),[n])),f(""),S(""),D({message:"Added ".concat(n.name),color:"green"}),setTimeout((function(){return D(null)}),3e3),console.log("posted object was",e)})).catch((function(e){return console.log(e)}))},newName:s,changeName:function(e){console.log(e.target,o.a.createElement("a",{href:"google.com"},"google.com")),f(e.target.value)},phone:w,changePhone:function(e){S(e.target.value)}}),o.a.createElement(E,{persons:t,setPersons:r,search:C}))};c.a.render(o.a.createElement(O,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.683255ca.chunk.js.map