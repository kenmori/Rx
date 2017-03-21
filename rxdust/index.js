var source = Rx.Observable.create(function(observer){
    observer.onNext(42);
    observer.onCompleted();
    return function() {
        console.log('disposed');
    }
})
var subscription = sorce.subscribe(
function(x){
    console.log('Next: ' + x);
},
function (err){
    console.log('Error: ' + err);
},
function (){
    console.log('completed');
}
)


var btnClicks = Rx.Observable.fromEvent($('#btn'),'click');
btnClicks
.filter(function(value){
    return value.altKey;
}).subscribe(function(){//できあがったイベントを購読者に通知する必要がある
    console.log('AltKey');
})
//////////////////////////////////////////////////////////
var input = $('#input');
var source = Rx.Observable.fromEvent(input, 'click');
source.subscribe(
    function (x){
        console.log('Next : Clicked');
    },
    function (err) {
        console.log('error : %s', err);
    },
    function (){
        console.log('Completed');
    });
input.trigger('click');


//イベントとデータの配列→ストリーム(ObservableとObservable squence)
////////////////////////////////////////////////////////
https://github.com/Reactive-Extensions/RxJS/blob/master/src/core/linq/observable/create.js
var source2 = Rx.Observable.create(function(observer){
    observer.onNext(32);
    observer.onCompleted();
    return function (){
        console.log('disposed');
    };
});

var subscription2 = source2.subscribe(
    function (x) {
        console.log('Next' + x);
    },
    function (err) {
        console.log('Error' + err);
    },
    function() {
        console.log('Completed');
    });


subscription2.dispose();
////////////////////////////////////////////////////////

Rx.Observable.from([1,2,3,4,5,6,7,8,9,10,11])
    .filter(function(num){
        return num % 2;
    }).map(function(num){
    return num * num;
}).forEach(function (num){//forEachはsubscribeのエイリアス
    return console.log(num);
});


////////////////////////////////////////////////////
var observer2 = Rx.Observer.create(function(){//通知の値、方法を作る
    return console.log("onNext:" + num);
}, function (error) {
    return console.log("onError:" + error);
}, function () {
    return console.log('onCompleted');
});

//
//
// Rx.Observable.from([1,2,4,5,6,7,8,9,10]).delayWithSelector(function (num) {//operater
//     return Rx.Observable.timer(num * 500);
// }).filter(function (num) {
//     return num % 2;
// }).map(function (num){
//     return num * num;
//}).subscribe(observer2);//通知の方法を渡す

var start = Date.now();
var source = Rx.Observable.range(0, 3).delaySubscription(5000);

var subscription = source.subscribe(
    function (x) { console.log('Next: %s, %s', x, Date.now() - start); },
    function (err) { console.log('Error: ' + err); },
    function () { console.log('Completed'); });


//////////////////////////////////////////////
var source3 = Rx.Observable.create(function (observer){
    var num = 0;
    var id = setInterval(function (){
        observer.onNext(num++);//onNextをつかってnumを500ずつobserverにプッシュ(購読者に通知)する(値を発行する通知)
    }, 500);
    setTimeout(function () {
        //10秒後に「ストリームが完了した」合図を送る(ストリーミングが完了した通知)
        observer.onCompleted();
    }, 10000);
    //お掃除
    return function () {
        console.log('disosed');
        clearInterval(id);
    };
});
var subscription3 = source3.subscribe(
    function (x) {
        console.log('onNext:' + x);
    },
    function (e) {
        console.log('onError' + e.message);
    },
    function () {
        console.log('onCompleted');
    });
setTimeout(function () {
    subscription3.dispose();
}, 5000);



/////////////////////

// observer.create([onNext],[onError],[onComposit])
// return observer obj implements using this given action;

var source4 = Rx.Observable.return(42);
var observer4 = Rx.Observer.create(
    x => console.log(x),
    e => console.log(e.message),
    ()=> console.log('composit'));



//////////////////////////////
// var subscription = source4.subscribe(observer4);
// var ele1 = document.getElementById('click1');
// var ele2 = document.getElementById('click2');
// var out = document.getElementById('out');
// var plus = Rx.Observable.fromEvent(ele1, 'click').map(1);
// var minus = Rx.Observable.fromEvent(ele2, 'click').map(-1);
//
// var both = plus.merge(minus);
// var curtValue = both.scan(0, function(acc, v){
//     return acc + v;
// });
//
// var htmlSet = Rx.Observer.create(function(v){
//     out.innerHTML = v;
// });
// var subscription = curtValue.subscribe(htmlSet);







