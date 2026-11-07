// ===== EDITE AQUI =====
var PIX_KEY="58e9a7aa-57a3-48b9-a8fb-46205c7812c3", PIX_NAME="MINHA LOJA", PIX_CITY="SAO PAULO";
var PRODUCTS=[
{id:1,n:"Máquina de Cortar Cabelo Profissional UltraMax ULT-828",e:"💈",img:"produto.jpg",p:50,d:"Máquina de corte profissional dourada, recarregável por USB. Lâmina de aço inoxidável com cabeça cerâmica Sharp, lâmina ajustável, interruptor e display LED que mostra a carga da bateria. Acompanha 4 pentes-guia, escovinha de limpeza, óleo lubrificante e cabo USB.",o:{}}
];
// ======================
var cart=[],sel={},q=1,step=1,F={},ship=0,pay="pix";
var $=function(i){return document.getElementById(i)};
var R=function(v){return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})};
function toast(t){var e=$("toast");e.textContent=t;e.className="on";setTimeout(function(){e.className=""},1800)}
function show(h){$("sh").innerHTML=h;$("ov").className="ov on"}
function closeOv(){$("ov").className="ov"}
function render(){$("grid").innerHTML=PRODUCTS.map(function(p,i){return '<div class="card" style="animation-delay:'+i*70+'ms" onclick="openP('+p.id+')"><div class="em">'+im(p,"cimg")+'</div><h3>'+p.n+'</h3><div class="price">'+R(p.p)+'</div></div>'}).join("");upd()}
function upd(){var n=cart.reduce(function(a,c){return a+c.q},0);$("cnt").textContent=n;var b=$("cb");b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump")}
function im(p,c){return p.img?'<img class="'+c+'" src="'+p.img+'" alt="'+p.n+'">':p.e}
function pr(id){return PRODUCTS.filter(function(p){return p.id===id})[0]}
function openP(id){var p=pr(id);sel={};q=1;for(var k in p.o)sel[k]=p.o[k][0];drawP(p)}
function drawP(p){var h='<button class="x" onclick="closeOv()">✕</button><div class="big">'+im(p,"pimg")+'</div><h2>'+p.n+'</h2><p>'+p.d+'</p><div class="price" style="font-size:22px">'+R(p.p)+'</div>';
for(var k in p.o){h+='<label>'+k+'</label><div class="chips">'+p.o[k].map(function(v){return '<button class="chip'+(sel[k]===v?' on':'')+'" onclick="pick(\''+p.id+'\',\''+k+'\',\''+v+'\')">'+v+'</button>'}).join("")+'</div>'}
h+='<div class="row" style="border:0"><span>Quantidade</span><span class="qty"><button onclick="qp(-1,'+p.id+')">−</button><b>'+q+'</b><button onclick="qp(1,'+p.id+')">+</button></span></div><button class="btn" onclick="add('+p.id+')">Adicionar · '+R(p.p*q)+'</button>';show(h)}
function pick(id,k,v){sel[k]=v;drawP(pr(+id))}
function qp(d,id){q=Math.max(1,q+d);drawP(pr(id))}
function add(id){var o=Object.keys(sel).map(function(k){return sel[k]}).join(" · "),key=id+o,f=cart.filter(function(c){return c.key===key})[0];
if(f)f.q+=q;else cart.push({key:key,id:id,o:o,q:q});upd();closeOv();toast("Adicionado ao carrinho ✓")}
function total(){return cart.reduce(function(a,c){return a+pr(c.id).p*c.q},0)}
function openCart(){step=1;if(!cart.length){show('<button class="x" onclick="closeOv()">✕</button><h2>Carrinho</h2><p>Seu carrinho está vazio. Toque em um produto para começar 🛍️</p><button class="btn" onclick="closeOv()">Ver produtos</button>');return}
var h='<button class="x" onclick="closeOv()">✕</button><h2>Seu carrinho</h2>'+cart.map(function(c,i){var p=pr(c.id);return '<div class="row"><div><b>'+p.n+'</b><br><small>'+c.o+'</small><br><span class="price">'+R(p.p*c.q)+'</span></div><span class="qty"><button onclick="cq('+i+',-1)">−</button><b>'+c.q+'</b><button onclick="cq('+i+',1)">+</button></span></div>'}).join("")+'<div class="tot"><span>Subtotal</span><span>'+R(total())+'</span></div><button class="btn" onclick="checkout()">Finalizar compra</button><button class="btn alt" onclick="closeOv()">Continuar comprando</button>';show(h)}
function cq(i,d){cart[i].q+=d;if(cart[i].q<1)cart.splice(i,1);upd();openCart()}
function bar(){return '<div class="steps"><i class="on"></i><i class="'+(step>1?'on':'')+'"></i><i class="'+(step>2?'on':'')+'"></i></div>'}
function checkout(){if(step===1){var f=function(k){return F[k]||""};
show('<button class="x" onclick="openCart()">←</button><h2>Endereço de entrega</h2>'+bar()+'<label>Nome completo</label><input id="nome" value="'+f("nome")+'"><label>WhatsApp</label><input id="tel" inputmode="tel" value="'+f("tel")+'"><div class="two"><div><label>CEP</label><input id="cep" inputmode="numeric" value="'+f("cep")+'"></div><div><label>Número</label><input id="num" value="'+f("num")+'"></div></div><label>Rua</label><input id="rua" value="'+f("rua")+'"><div class="two"><div><label>Bairro</label><input id="bai" value="'+f("bai")+'"></div><div><label>Cidade/UF</label><input id="cid" value="'+f("cid")+'"></div></div><label>Complemento</label><input id="comp" value="'+f("comp")+'"><button class="btn" onclick="toStep2()">Continuar</button>')}}
function toStep2(){var ids=["nome","tel","cep","num","rua","bai","cid","comp"];ids.forEach(function(i){F[i]=$(i).value.trim()});
if(!F.nome||!F.tel||!F.cep||!F.num||!F.rua||!F.cid){toast("Preencha os campos principais");return}step=2;payStep()}
function payStep(){var S=[["Padrão · 5 a 8 dias",0],["Expressa · 1 a 3 dias",24.9]],h='<button class="x" onclick="step=1;checkout()">←</button><h2>Entrega e pagamento</h2>'+bar()+'<label>Entrega</label>';
S.forEach(function(s){h+='<div class="opt'+(ship===s[1]?' on':'')+'" onclick="ship='+s[1]+';payStep()"><span style="flex:1">'+s[0]+'</span><b>'+(s[1]?R(s[1]):'Grátis')+'</b></div>'});
h+='<label>Pagamento</label><div class="opt'+(pay==="pix"?' on':'')+'" onclick="pay=\'pix\';payStep()"><span style="flex:1">⚡ Pix (aprovação na hora)</span></div><div class="opt'+(pay==="ent"?' on':'')+'" onclick="pay=\'ent\';payStep()"><span style="flex:1">🚚 Pagar na entrega</span></div><div class="tot"><span>Total</span><span>'+R(total()+ship)+'</span></div><button class="btn" onclick="confirmOrder()">Confirmar pedido</button>';show(h)}
function f2(i,v){return i+String(v.length).padStart(2,"0")+v}
function crc(s){var c=65535,i,j;for(i=0;i<s.length;i++){c^=s.charCodeAt(i)<<8;for(j=0;j<8;j++)c=c&32768?((c<<1)^4129)&65535:(c<<1)&65535}return c.toString(16).toUpperCase().padStart(4,"0")}
function pixCode(v){var s="000201"+f2("26",f2("00","br.gov.bcb.pix")+f2("01",PIX_KEY))+"52040000"+"5303986"+f2("54",v.toFixed(2))+"5802BR"+f2("59",PIX_NAME)+f2("60",PIX_CITY)+f2("62",f2("05","***"))+"6304";return s+crc(s)}
function confirmOrder(){step=3;var v=total()+ship;
if(pay==="ent"){finish("Pedido confirmado!","Você paga "+R(v)+" na entrega.");return}
var c=pixCode(v);show('<h2>Pague com Pix ⚡</h2>'+bar()+'<div class="pix"><p>Valor: <b>'+R(v)+'</b></p><div id="qr"></div><div class="code" id="pc">'+c+'</div><button class="btn" onclick="copyP()">Copiar código Pix</button><button class="btn alt" onclick="finish(\'Pagamento informado!\',\'Assim que o Pix for confirmado, enviamos seu pedido.\')">Já paguei</button></div>');
try{new QRCode($("qr"),{text:c,width:180,height:180,correctLevel:QRCode.CorrectLevel.L})}catch(e){$("qr").textContent="Use o código abaixo"}}
function copyP(){var t=$("pc").textContent;try{navigator.clipboard.writeText(t).then(function(){toast("Código copiado ✓")},function(){toast("Selecione e copie o código")})}catch(e){toast("Selecione e copie o código")}}
function finish(t,m){show('<div class="done"><div class="big">🎉</div><h2>'+t+'</h2><p>'+m+'</p><p>Entrega para:<br><b>'+F.rua+', '+F.num+' · '+F.cid+'</b></p><button class="btn" onclick="cart=[];step=1;upd();closeOv()">Voltar à loja</button></div>')}
render();
