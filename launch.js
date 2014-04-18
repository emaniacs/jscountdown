function countdown(date, callback, interval) {
    var timer = new Date(date);

    if (!timer.valueOf()) throw new Error('Invalid date.');

    var now = function(){return new Date()},
        time = [
            864E5,   // 60*60*24*1E3,
            36E5,    // 60*60*1E3,
            6E4,      // 60*1E3,
            1E3,
            1,
        ],

        timename = ['day', 'hour', 'minute', 'second', 'microsecond'],

        divMod = function(one, two) {
            return [
                Math.floor(one / two),
                Math.floor(one % two),
            ]
        },

        diff = function() {
            return timer.valueOf() - now().valueOf()
        },

        data = {},

        getTime = function() {
            var dif = diff(),
                index = 0,
                min = time.slice(-1)
            ;
            data.finish = dif < 0;

            while ( dif > min) {
                var _divMod = divMod(dif, time[index]);
                dif = _divMod[1];
                data[timename[index++]] = _divMod[0]
            }

            return data
        },
        _callback = function(){
            var int = setInterval(function() {
                    var count = getTime();
                    count.finish && clearInterval(int);
                    callback.call(count)
                },
                interval || 1E3);

            return int;
        }
    ;

    return callback ? _callback() : getTime()
}
