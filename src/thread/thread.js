// const modulePath = `${__dirname}/worker.js`;
// import cp from 'child_process';

export async function myThread(...data) {

    const teste = Promise.all(data);

    console.log(teste)


    // async.parallel([
    //     function(callback) {
    //       setTimeout(function() {
    //         console.log('Task One');
    //         callback(null, 1);
    //       }, 200);
    //     },
    //     function(callback) {
    //       setTimeout(function() {
    //         console.log('Task Two');
    //         callback(null, 2);
    //       }, 100);
    //     }
    //   ],
    //   function(err, results) {
    //     console.log(results);
    //     // the results array will equal [1, 2] even though
    //     // the second function had a shorter timeout.
    //   });

//   await async.parallel(data, function (err, results) {
//     console.log("aqui..................");
//     console.log(results);
//     console.log(err);
//     // results now equals to: { task1: 1, task2: 2 }
//   });

  // for (const item of data) {
  //     console.log(`${__dirname}/../scrap/${item.name}.js`)
  //     const worker = cp.fork(`${__dirname}/../scrap/${item.name}.js`, []);
  //     worker.on("message", msg => console.log("teste msg: ", msg))
  //     worker.on("error", msg => console.log("error msg: ", msg))
  //     worker.send(item);
  // }
}
