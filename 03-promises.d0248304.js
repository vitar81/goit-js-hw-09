!function(){function e(e,n){var t=Math.random()>.3;return new Promise((function(o,a){setTimeout((function(){var l={position:e,delay:n};t?o(l):a(l)}),n)}))}var n=document.querySelector(".form"),t=n.elements.delay,o=n.elements.step,a=n.elements.amount;n.addEventListener("submit",(function(n){n.preventDefault();var l=Number(t.value),r=Number(o.value),i=Number(a.value);if(l>0&&r>0&&i>0){for(var u=[],s=1;s<=i;s++){var c=l+(s-1)*r;u.push(e(s,c))}Promise.allSettled(u).then((function(e){var n=!0,t=!1,o=void 0;try{for(var a,l=e[Symbol.iterator]();!(n=(a=l.next()).done);n=!0){var r=a.value;"fulfilled"===r.status?console.log("✅ Fulfilled promise ".concat(r.value.position," in ").concat(r.value.delay,"ms")):console.log("❌ Rejected promise ".concat(r.reason.position," in ").concat(r.reason.delay,"ms"))}}catch(e){t=!0,o=e}finally{try{n||null==l.return||l.return()}finally{if(t)throw o}}}))}else console.log("Please enter valid data")}))}();
//# sourceMappingURL=03-promises.d0248304.js.map