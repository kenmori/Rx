var btnClicks = Rx.Observable.fromEvent($('#btn'),'click');
btnClicks
.filter(function(value){
    return value.altKey;
})
    .subscribe(function(){//できあがったイベントを購読者に通知する必要がある
    console.log('AltKey');
})
//////////////////////////////////////////////////////////
var input = $('#input');
var source = Rx.Observable.fromEvent(input, 'click');
var subscription = source.subscribe(
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
}).forEach(function (num){
    return console.log(num);
});
