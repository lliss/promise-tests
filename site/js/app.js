var t = new Promise(function(resolve, reject) {
    resolve('Woot!');
});

var c = new Promise(function(resolve, reject) {
  var ok = Math.floor(Math.random() * 2);
  var wait = Math.floor(Math.random() * 2000);
  if (ok) {
    setTimeout(resolve, wait);
  } else {
    setTimeout(reject, wait);
  }
});
c.then(function() {console.log('YAY');}).catch(function() {console.log('NAY');});

/*** SOME BASIC TESTS ***/
function swear() {
  return new Promise(function(resolve, reject) {
    var ok = Math.floor(Math.random() * 2);
    var wait = Math.floor(Math.random() * 2000);
    if (ok) {
      setTimeout(resolve, wait);
    } else {
      setTimeout(reject, wait);
    }
  });
}


function timeout(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, duration);
    });
}

var p = timeout(1000).then(function() {
    console.log(1);
    return timeout(2000);
}).then(function() {
    console.log(2);
}).catch(function(err) {
    console.log('no good');
});

Promise
    .all([timeout(4000), timeout(2000)])
    .then(function() {console.log('all done');});


/*** SOME TESTS WITH UI ***/
var $modal = $('#confirm-modal');
$modal.hide();
$('#confirm-modal button').click(function() {
    $modal.hide();
});

$('#delete-btn').click(function() {
    confirmDeletion().then(
        function resolve() {
            console.log('They said Ok.');
        },
        function reject() {
            console.log('They said No Go.');
        }
    );
});

function confirmDeletion() {
    $('#confirm-modal').show();
    return new Promise(function(resolve, reject) {
        $('#confirm-true').click(function() {
            $('#confirm-modal').hide();
            resolve();
        });
        $('#confirm-false').click(function() {
            $('#confirm-modal').hide();
            reject();
        });
    });
}


/*** SOME TESTS WITH NETWORK REQUESTS WHEN YOU NEED ALL VALUES ***/
/*** BUT ORDER DOESN'T MATTER ***/
$('#greet').click(function() {
    updateWeatherInfo();
});

function updateWeatherInfo() {
    Promise
        .all(getPhysicalData())
        .then(function resolve(data) {
            const message = 'Howdy. It is a ' + data[0].value + ' ' + data[1].value + '!';
            $('#greeting').text(message);
        })
        .catch((e) => {
            console.log('Requst failed:');
            console.log(e);
        });
}

function getPhysicalData() {
    const weather = Promise.resolve($.get({
        url: 'http://localhost:8001/weather',
        dataType: 'json',
        crossDomain: true
    }));
    const time = Promise.resolve($.get({
        url: 'http://localhost:8001/time',
        dataType: 'json',
        crossDomain: true
    }));
    return [weather, time];
}

/*** SOME TESTS WITH NETWORK REQUESTS WHEN YOU NEED ALL VALUES ***/
/*** AND ORDER MATTERS ***/

$('#calc').click(function() {
    var num = $('#num').val();
    $('#calc-result').text('');

    double(num)
        .then(
            function(data) {
                console.log('doubled value: ' + data.value);
                return tripple(data.value);
            },
            function() {
                console.log('double broke');
            }
        )
        .then(
            function(data) {
                console.log('trippled value: ' + data.value);
                return quad(data.value);
            },
            function() {
                console.log('tripple broke');
            }
        )
        .then(
            function(data) {
                $('#calc-result').text(data.value);
            },
            function() {
                console.log('quad broke');
            }
        );
});

function double(value) {
    return Promise.resolve($.get({
        url: 'http://localhost:8001/double/' + value,
        dataType: 'json',
        crossDomain: true
    }));
}

function tripple(value) {
    return Promise.resolve($.get({
        url: 'http://localhost:8001/tripple/' + value,
        dataType: 'json',
        crossDomain: true
    }));
}

function quad(value) {
    return Promise.resolve($.get({
        url: 'http://localhost:8001/quad/' + value,
        dataType: 'json',
        crossDomain: true
    }));
}
