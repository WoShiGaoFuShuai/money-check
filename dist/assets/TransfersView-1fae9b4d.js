import{b as G,T as J}from"./accounts-17264377.js";import{N as K}from"./NavTop-eea6f24e.js";import{T as M,u as P,a as w,b as Q,c as X,E as Z,m as F}from"./EditTransferWindow-5a87384e.js";import{d as R,o as i,c as v,g as ee,t as te,F as W,i as ne,e as I,_ as V,j as s,k as A,r as ae,a as o,b as m,f as k,w as re,h as ce}from"./index-d34b31e1.js";import"./getDayLabel-d438a4ed.js";const se={class:"recent__wrapper"},oe={"data-testid":"date",class:"recent__date"},ie={key:0,class:"recent__no-transfers","data-testid":"no-transfers-text"},ue={key:1,class:"recent__transfers-wrapper"},de=R({__name:"TransferTransactions",props:{date:{type:String,required:!0},transfersList:{type:Array,required:!0}},emits:["editTransactionInitiated"],setup(y,{emit:C}){const n=y,u=c=>{C("editTransactionInitiated",c)};return(c,d)=>(i(),v("div",se,[ee("div",oe,te(n.date),1),y.transfersList.length?(i(),v("div",ue,[(i(!0),v(W,null,ne(n.transfersList,f=>(i(),I(M,{key:f.timestamp,transfer:f,onTransactionItemClick:u},null,8,["transfer"]))),128))])):(i(),v("div",ie," no transfers "))]))}});const N=V(de,[["__scopeId","data-v-b2793843"]]),le=R({__name:"TransfersView",setup(y){const C=[{icon:"fa-solid fa-credit-card",linkName:"accounts"},{icon:"fa-solid fa-repeat",linkName:"transfers"}],n=G(),u=P(),c=s(0),d=s(1),f=s(!1),t=s({isShowTextInput:!1,debitAmount:null,creditAmount:null,debitCurrency:"",creditCurrency:""}),g=()=>{t.value.isShowTextInput=!1,t.value.debitAmount=null,t.value.creditAmount=null,t.value.debitCurrency="",t.value.creditCurrency=""},a=s({timestamp:0,note:"",createdTime:0,debitAmount:0,debitCurrency:"",creditAmount:0,creditCurrency:""}),L=e=>{c.value=e},B=e=>{d.value=e},O=(e,r)=>{const l={timestamp:r.timestamp,note:r.note,amount:r.amount,createdTime:r.createdTime,debitTitle:T.value.title,creditTitle:h.value.title,currency:T.value.currency};u.addToTransfers(l),n.transfer(c.value,d.value,e)},T=A(()=>n.accounts[c.value]),h=A(()=>n.accounts[d.value]),q=A(()=>n.accounts[c.value].currency===n.accounts[d.value].currency),p=s(!1),Y=()=>{p.value=!0},$=()=>{p.value=!1},j=e=>{a.value.timestamp=e.timestamp,a.value.note=e.note,a.value.createdTime=e.createdTime,a.value.debitAmount=e.debitAmount,a.value.debitCurrency=e.debitCurrency,a.value.creditAmount=e.creditAmount,a.value.creditCurrency=e.creditCurrency,H()},S=e=>{t.value.isShowTextInput=!0,t.value.creditAmount=e.creditAmount,t.value.creditCurrency=e.creditCurrency,t.value.debitAmount=e.debitAmount,t.value.debitCurrency=e.debitCurrency},H=()=>{n.transferWithDifferentCurrency(c.value,d.value,a.value.debitAmount,a.value.creditAmount);const e={...a.value,currencyDebit:a.value.debitCurrency,currencyCredit:a.value.creditCurrency,debitTitle:T.value.title,creditTitle:h.value.title};u.addToTransfers(e),g()},D=e=>{f.value=e},E=e=>{const r=n.accounts.find(_=>_.title===e.debitTitle),l=n.accounts.find(_=>_.title===e.creditTitle);r&&l&&(b.value=n.accounts.indexOf(r),x.value=n.accounts.indexOf(l)),u.addToEditTransfer(e),"creditAmount"in e&&(t.value.isShowTextInput=!0,t.value.debitAmount=e.debitAmount,t.value.creditAmount=e.creditAmount,t.value.debitCurrency=e.currencyDebit,t.value.creditCurrency=e.currencyCredit),D(!0)},b=s(0),x=s(0),U=e=>{b.value=e},z=e=>{x.value=e};return(e,r)=>{const l=ae("router-link");return i(),v(W,null,[o(J,{title:"Transfers"}),o(K,{links:C}),o(w,{title:"Debit the account",accounts:m(n).accounts,"choosen-account-index":c.value,onChooseDebitAccount:L},null,8,["accounts","choosen-account-index"]),o(w,{title:"Credit to the account",accounts:m(n).accounts,"choosen-account-index":d.value,onChooseCreditAccount:B},null,8,["accounts","choosen-account-index"]),o(Q,{mode:m(F).DEFAULT,"is-same-currency":q.value,"info-input-data":t.value,onShowExchangeRate:Y,onSubmitTransfer:O,onSendTrasnferInfoFormDifferentCurrency:j},null,8,["mode","is-same-currency","info-input-data"]),p.value?(i(),I(X,{key:0,"debit-account":T.value,"credit-account":h.value,onCloseTransferExchangeRate:$,onSubmitTransferWithDifferentCurrency:S},null,8,["debit-account","credit-account"])):k("",!0),o(N,{class:"transfer__recent",date:"today","transfers-list":m(u).transfersTodaySorted,onEditTransactionInitiated:E},null,8,["transfers-list"]),o(N,{date:"yesterday","transfers-list":m(u).transfersYesterdaySorted,onEditTransactionInitiated:E},null,8,["transfers-list"]),o(l,{class:"transfer__link",to:{name:"transfers-history"}},{default:re(()=>[ce(" HISTORY ")]),_:1}),f.value?(i(),I(Z,{key:1,"info-input-data":t.value,"edit-debit-account-index":b.value,"edit-credit-account-index":x.value,onCloseEditTransferWindow:r[0]||(r[0]=_=>D(!1)),onChangeEditChoosenCreditAccountIndex:z,onChangeEditChoosenDebitAccountIndex:U,onResetInfoInputData:g,onSubmitTransferWithDifferentCurrency:S},null,8,["info-input-data","edit-debit-account-index","edit-credit-account-index"])):k("",!0)],64)}}});const ye=V(le,[["__scopeId","data-v-e6d1458b"]]);export{ye as default};
