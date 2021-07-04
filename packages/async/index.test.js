import async from './index';
//
describe('async auto test:',()=>{
    //
    it('basics', (done) => {
        var callOrder = [];
        async.auto({
            task1: ['task2', function(results, callback){
                setTimeout(() => {
                    callOrder.push('task1');
                    callback();
                }, 25);
            }],
            task2(callback){
                setTimeout(() => {
                    callOrder.push('task2');
                    callback();
                }, 50);
            },
            task3: ['task2', function(results, callback){
                callOrder.push('task3');
                callback();
            }],
            task4: ['task1', 'task2', function(results, callback){
                callOrder.push('task4');
                callback();
            }],
            task5: ['task2', function(results, callback){
                setTimeout(() => {
                    callOrder.push('task5');
                    callback();
                }, 0);
            }],
            task6: ['task2', function(results, callback){
                callOrder.push('task6');
                callback();
            }]
        },
        (err) => {
            expect(err).toEqual(null);
            expect(callOrder).toEqual(['task2','task3','task6','task5','task1','task4']);
            done();
        });
    });

    it('auto petrify', (done) => {
        var callOrder = [];
        async.auto({
            task1: ['task2', function (results, callback) {
                setTimeout(() => {
                    callOrder.push('task1');
                    callback();
                }, 100);
            }],
            task2 (callback) {
                setTimeout(() => {
                    callOrder.push('task2');
                    callback();
                }, 200);
            },
            task3: ['task2', function (results, callback) {
                callOrder.push('task3');
                callback();
            }],
            task4: ['task1', 'task2', function (results, callback) {
                callOrder.push('task4');
                callback();
            }]
        },
        (err) => {
            if (err) throw err;
            expect(callOrder).toEqual(['task2', 'task3', 'task1', 'task4']);
            done();
        });
    });

    it('auto results', (done) => {
        var callOrder = [];
        async.auto({
            task1: ['task2', function(results, callback){
                expect(results.task2).toEqual('task2');
                setTimeout(() => {
                    callOrder.push('task1');
                    callback(null, 'task1a', 'task1b');
                }, 25);
            }],
            task2(callback){
                setTimeout(() => {
                    callOrder.push('task2');
                    callback(null, 'task2');
                }, 50);
            },
            task3: ['task2', function(results, callback){
                expect(results.task2).toEqual('task2');
                callOrder.push('task3');
                callback(null);
            }],
            task4: ['task1', 'task2', function(results, callback){
                expect(results.task1).toEqual(['task1a','task1b']);
                expect(results.task2).toEqual('task2');
                callOrder.push('task4');
                callback(null, 'task4');
            }]
        },
        (err, results) => {
            expect(callOrder).toEqual(['task2','task3','task1','task4']);
            expect(results).toEqual({task1: ['task1a','task1b'], task2: 'task2', task3: undefined, task4: 'task4'});
            done();
        });
    });

    it('auto empty object', (done) => {
        async.auto({}, (err) => {
            expect(err).toEqual(null);
            done();
        });
    });

    it('auto no callback', (done) => {
        async.auto({
            task1(callback){callback();},
            task2: ['task1', function(results, callback){callback(); done();}]
        });
    });

    it('auto concurrency no callback', (done) => {
        async.auto({
            task1(callback){callback();},
            task2: ['task1', function(results, callback){callback(); done();}]
        }, 1);
    });

    // Issue 24 on github: https://github.com/caolan/async/issues#issue/24
    // Issue 76 on github: https://github.com/caolan/async/issues#issue/76
    it('auto removeListener has side effect on loop iteratee', (done) => {
        async.auto({
            task1: ['task3', function(/*callback*/) { done(); }],
            task2: ['task3', function(/*callback*/) { /* by design: DON'T call callback */ }],
            task3(callback) { callback(); }
        });
    });

    // Issue 410 on github: https://github.com/caolan/async/issues/410
    it('auto calls callback multiple times', (done) => {
        var finalCallCount = 0;
        try {
            async.auto({
                task1(callback) { callback(null); },
                task2: ['task1', function(results, callback) { callback(null); }]
            },

            // Error throwing final callback. This should only run once
            () => {
                finalCallCount++;
                var e = new Error('An error');
                e._test_error = true;
                throw e;
            });
        } catch (e) {
            if (!e._test_error) {
                throw e;
            }
        }
        setTimeout(() => {
            expect(finalCallCount).toEqual(1);
            done();
        }, 10);
    });


    it('auto calls callback multiple times with parallel functions', (done) => {
        async.auto({
            task1(callback) { setTimeout(callback,0,'err'); },
            task2(callback) { setTimeout(callback,0,'err'); }
        },
        // Error throwing final callback. This should only run once
        (err) => {
            expect(err).toEqual('err');
            done();
        });
    });


    // Issue 462 on github: https://github.com/caolan/async/issues/462
    it('auto modifying results causes final callback to run early', (done) => {
        async.auto({
            task1(callback){
                callback(null, 'task1');
            },
            task2: ['task1', function(results, callback){
                results.inserted = true;
                setTimeout(() => {
                    callback(null, 'task2');
                }, 50);
            }],
            task3(callback){
                setTimeout(() => {
                    callback(null, 'task3');
                }, 100);
            }
        },
        (err, results) => {
            expect(results.inserted).toEqual(true);
            expect(results.task3).toEqual('task3');
            done();
        });
    });

    // Issue 263 on github: https://github.com/caolan/async/issues/263
    it('auto prevent dead-locks due to inexistant dependencies', (done) => {
        expect(() => {
            async.auto({
                task1: ['noexist', function(results, callback){
                    callback(null, 'task1');
                }]
            });
        }).toThrow(/dependency `noexist`/);
        done();
    });

    // Issue 263 on github: https://github.com/caolan/async/issues/263
    it('auto prevent dead-locks due to cyclic dependencies', (done) => {
        expect(() => {
            async.auto({
                task1: ['task2', function(results, callback){
                    callback(null, 'task1');
                }],
                task2: ['task1', function(results, callback){
                    callback(null, 'task2');
                }]
            });
        }).toThrow();
        done();
    });

    // Issue 1092 on github: https://github.com/caolan/async/issues/1092
    it('extended cycle detection', (done) => {
        var task = function (name) {
            return function (results, callback) {
                callback(null, 'task ' + name);
            };
        };
        expect(() => {
            async.auto({
                a: ['c', task('a')],
                b: ['a', task('b')],
                c: ['b', task('c')]
            });
        }).toThrow();
        done();
    });
});