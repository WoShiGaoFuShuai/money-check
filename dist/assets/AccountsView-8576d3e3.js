import{b as E,T as M}from"./accounts-17264377.js";import{d as A,j as v,A as F,k as P,o as m,c as f,m as C,S as z,g as e,F as U,i as L,t as b,r as N,v as $,h as S,a as u,p as V,n as T,_ as k,b as q,e as B,f as I,w as j,q as J}from"./index-d34b31e1.js";import{A as H}from"./AppError-2fee9d12.js";import{N as K}from"./NavTop-eea6f24e.js";const Q={class:"history-select__block"},R=["value"],O=A({__name:"NewAccountsCurrencySelect",props:{allCurrency:{type:Array,required:!0},currentSymbol:{type:String,required:!1,default(){return""}}},emits:["emitSelectedItem"],setup(a,{emit:d}){const n=a,o=v(""),l=()=>{d("emitSelectedItem",s.value)};F(()=>{if(n.currentSymbol==="")o.value=n.allCurrency[0].currency;else{const t=n.allCurrency.find(c=>c.symbol===n.currentSymbol),r=n.allCurrency.indexOf(t);o.value=n.allCurrency[r].currency}d("emitSelectedItem",s.value)});const s=P(()=>{const t=n.allCurrency.find(c=>c.currency===o.value);return t==null?void 0:t.symbol});return(t,r)=>(m(),f("div",Q,[C(e("select",{"onUpdate:modelValue":r[0]||(r[0]=c=>o.value=c),class:"history-select",role:"history-select",onChange:l},[(m(!0),f(U,null,L(n.allCurrency,c=>(m(),f("option",{key:c.currency,value:c.currency},b(c.currency)+" "+b(c.symbol),9,R))),128))],544),[[z,o.value]])]))}});const D=a=>(V("data-v-004c790c"),a=a(),T(),a),W={class:"newAccount__main"},X={class:"newAccount__form"},Y={class:"form__item"},Z=D(()=>e("label",{class:"form__label-title",for:"name"},"Name",-1)),ee={class:"form__item"},te={class:"newAccount__currency"},ce=D(()=>e("span",{class:"currency__name"},"Currency",-1)),ne={class:"currency__item"},oe={class:"newAccount__button-wrapper"},se=A({__name:"NewAccountForm",props:{currencies:{type:Array,required:!0}},emits:["hideNewAccountModal","accountsStoreAddNewAcc"],setup(a,{emit:d}){const n=a,o=v(""),l=v(0),s=v(""),t=v(""),r=()=>{l.value!==0&&(l.value=-l.value)},c=i=>{s.value=i},_=()=>{d("hideNewAccountModal")},y=()=>{if(o.value.trim().length){const i={title:o.value,sum:l.value,currency:s.value,active:!1};d("accountsStoreAddNewAcc",i),o.value="",l.value=0,s.value="",t.value=""}else t.value=" Please fill out all inputs"};return(i,p)=>{const h=N("font-awesome-icon");return m(),f("div",W,[e("div",X,[e("div",Y,[Z,C(e("input",{id:"name","onUpdate:modelValue":p[0]||(p[0]=w=>o.value=w),type:"text",class:"form__input",placeholder:"name for account",role:"accountNameInput"},null,512),[[$,o.value]])]),e("div",ee,[e("label",{class:"form__label-title form__label-title--balance",for:"balance"},[S("Balance "),e("span",{class:"form__label-title--plusMinus",role:"changeAccountBalanceBtn",onClick:r},"+/-")]),C(e("input",{id:"balance","onUpdate:modelValue":p[1]||(p[1]=w=>l.value=w),role:"accountBalanceInput",type:"number",class:"form__input",placeholder:"insert amount for account"},null,512),[[$,l.value]])])]),e("div",te,[ce,e("div",ne,[u(O,{"all-currency":n.currencies,onEmitSelectedItem:c},null,8,["all-currency"])])]),u(H,{error:t.value},null,8,["error"]),e("div",oe,[u(h,{class:"btn__primary",icon:"fa-solid fa-check",role:"addNewAccountBtn",onClick:y}),u(h,{class:"btn__primary",icon:"fa-solid fa-xmark",role:"closeNewAccountBtn",onClick:_})])])}}});const ae=k(se,[["__scopeId","data-v-004c790c"]]),G=a=>(V("data-v-1a588d9e"),a=a(),T(),a),le={class:"newAccount__wrapper"},re={class:"new__account-text"},ue=G(()=>e("br",null,null,-1)),ie=G(()=>e("span",{class:"settings"}," Go to Settings ",-1)),_e=A({__name:"NewAccount",emits:["hideNewAccountModal"],setup(a,{emit:d}){const n=E(),o=()=>{d("hideNewAccountModal")},l=t=>{try{n.addNewAccount(t),s.value="",o()}catch(r){r instanceof Error&&(s.value=r.message)}},s=v("");return(t,r)=>{const c=N("router-link");return m(),f("div",le,[u(M,{title:"New Account","right-icons":[{icon:"fa solid fa-pencil"},{icon:"fa solid fa-plus"}]}),u(ae,{currencies:q(n).currencies,role:"NewAccountFormComponent",onHideNewAccountModal:o,onAccountsStoreAddNewAcc:l},null,8,["currencies"]),s.value.length?(m(),B(H,{key:0,class:"error__wrapper",error:s.value},null,8,["error"])):I("",!0),e("h3",re,[S(" Can't find the currency you need? "),ue,u(c,{class:"link",to:{name:"settings"}},{default:j(()=>[ie]),_:1})])])}}});const de=k(_e,[["__scopeId","data-v-1a588d9e"]]),me={class:"accounts-list"},pe={class:"accounts-list__account-name"},ve={class:"account-name__name"},fe={class:"accounts-list__account-amount"},ye={class:"account-amount__amount"},Ae={key:0,role:"editModeButtons",class:"accounts-list__edit"},he=A({__name:"AccountsList",props:{accounts:{type:Array,required:!0},editMode:{type:Boolean,required:!0}},emits:["showEditCurrentAccount"],setup(a,{emit:d}){const n=a,o=E(),l=(t,r,c,_)=>{d("showEditCurrentAccount",{sum:t,symbol:r,title:c,index:_})},s=t=>{o.deleteAccount(t)};return(t,r)=>{const c=N("font-awesome-icon");return m(),f("div",me,[e("ul",null,[(m(!0),f(U,null,L(n.accounts,(_,y)=>(m(),f("li",{key:_.title,role:"accouts-list__li",class:"accouts-list__li"},[e("div",pe,[e("span",ve,b(_.title),1)]),e("div",fe,[e("span",ye,[S(b(_.sum)+" ",1),e("span",null,b(_.currency),1)])]),n.editMode?(m(),f("div",Ae,[u(c,{icon:"fa-solid fa-pencil",class:"icon icon__edit",role:"pencilIcon",onClick:i=>l(_.sum,_.currency,_.title,y)},null,8,["onClick"]),u(c,{icon:"fa-solid fa-trash",class:"icon icon__del",role:"deleteIcon",onClick:i=>s(y)},null,8,["onClick"])])):I("",!0)]))),128))])])}}});const we=k(he,[["__scopeId","data-v-fe66b5b5"]]),g=a=>(V("data-v-40347577"),a=a(),T(),a),be={class:"newAccount__wrapper"},Ce={class:"newAccount__main"},Ne={class:"newAccount__form"},Se={class:"form__item"},ke=g(()=>e("label",{class:"form__label-title",for:"name"},"Name",-1)),ge={class:"form__item"},$e={class:"newAccount__currency"},Ie=g(()=>e("span",{class:"currency__name"},"Currency",-1)),Ee={class:"currency__item"},xe=g(()=>e("div",{class:"error",role:"error"}," Please fill out all inputs ",-1)),Be={class:"newAccount__button-wrapper"},Me={class:"new__account-text"},Ve=g(()=>e("br",null,null,-1)),Te=g(()=>e("span",{class:"settings"}," Go to Settings ",-1)),qe=A({__name:"EditCurrentAccount",props:{accountToEdit:{type:Object,required:!0}},emits:["hideEditCurrentAccount"],setup(a,{emit:d}){const n=a,o=E(),l=v(""),s=v(0),t=v(""),r=()=>{const i=n.accountToEdit.index,p={title:l.value,sum:s.value,currency:t.value};o.editAccount(p,i),d("hideEditCurrentAccount")},c=()=>{d("hideEditCurrentAccount")},_=()=>{s.value!==0&&(s.value=-s.value)},y=i=>{t.value=i};return F(()=>{l.value=n.accountToEdit.title,s.value=n.accountToEdit.sum}),(i,p)=>{const h=N("font-awesome-icon"),w=N("router-link");return m(),f("div",be,[u(M,{title:"Edit Account","right-icons":[{icon:"fa solid fa-pencil"},{icon:"fa solid fa-plus"}]}),e("div",Ce,[e("div",Ne,[e("div",Se,[ke,C(e("input",{id:"name","onUpdate:modelValue":p[0]||(p[0]=x=>l.value=x),type:"text",class:"form__input",placeholder:"name for account",role:"accountNameInput"},null,512),[[$,l.value]])]),e("div",ge,[e("label",{class:"form__label-title form__label-title--balance",for:"balance"},[S("Balance "),e("span",{class:"form__label-title--plusMinus",role:"changeAccountBalanceBtn",onClick:_},"+/-")]),C(e("input",{id:"balance","onUpdate:modelValue":p[1]||(p[1]=x=>s.value=x),role:"accountBalanceInput",type:"number",class:"form__input",placeholder:"insert amount for account"},null,512),[[$,s.value]])])]),e("div",$e,[Ie,e("div",Ee,[u(O,{"all-currency":q(o).currencies,"current-symbol":n.accountToEdit.symbol,onEmitSelectedItem:y},null,8,["all-currency","current-symbol"])])]),xe,e("div",Be,[u(h,{class:"btn__primary",icon:"fa-solid fa-check",role:"editAccountBtn",onClick:r}),u(h,{class:"btn__primary",icon:"fa-solid fa-xmark",role:"closeAccountBtn",onClick:c})])]),e("h3",Me,[S(" Can't find the currency you need? "),Ve,u(w,{class:"link",to:{name:"settings"}},{default:j(()=>[Te]),_:1})])])}}});const Fe=k(qe,[["__scopeId","data-v-40347577"]]),Ue={class:"accountsView__wrapper"},Le=A({__name:"AccountsView",setup(a){const d=[{icon:"fa-solid fa-credit-card",linkName:"accounts"},{icon:"fa-solid fa-repeat",linkName:"transfers"}],n=E(),o=v(!1),l=()=>{o.value=!0},s=()=>{t.value=!t.value},t=v(!1),r=v(!1),c=J({sum:0,symbol:"",title:"",index:0}),_=y=>{Object.assign(c,y),r.value=!0};return(y,i)=>(m(),f("div",Ue,[u(M,{title:"Accounts","right-icons":[{icon:"fa solid fa-pencil",handler:s},{icon:"fa solid fa-plus",handler:l}]},null,8,["right-icons"]),u(K,{links:d}),u(we,{"edit-mode":t.value,accounts:q(n).accounts,onShowEditCurrentAccount:_},null,8,["edit-mode","accounts"]),o.value?(m(),B(de,{key:0,onHideNewAccountModal:i[0]||(i[0]=p=>o.value=!1)})):I("",!0),r.value?(m(),B(Fe,{key:1,"account-to-edit":c,onHideEditCurrentAccount:i[1]||(i[1]=p=>r.value=!1)},null,8,["account-to-edit"])):I("",!0)]))}});const Ge=k(Le,[["__scopeId","data-v-6d321bf0"]]);export{Ge as default};