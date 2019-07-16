var Docker = require('dockerode');
var util = require('util');

var docker = new Docker({socketPath: '/var/run/docker.sock'});

let proof

function genProof(container, noteParams) {
  var runCmd = "bash getproof.sh " + noteParams


  var options = {
    Cmd: ['bash', '-c', runCmd],
    WorkingDir: '/home/zokrates/zk-related', // circuit/createNote/ ../ //
     AttachStdout: true,
     AttachStderr: true
  };

  container.exec(options, function(err, exec) {
    if (err) return;
    exec.start(function(err, stream) {
      if (err) return;

      container.modem.demuxStream(stream, process.stdout, process.stderr);

      exec.inspect(function(err, data) {
        if (err) return;
        // proof = JSON.parse(data);
        return data;
      });
    });
  });
}


// You can use hardcoded Container's ID, instead of this iteration.
docker.listContainers({all: true}, function(err, containers) {
console.log('err ' + err);
console.log('ALL: ' + Object.keys(containers[0]));
console.log(containers.length);

for (i = 0; i < containers.length; i++) {
    console.log(containers[i].Names);
    // if your zokrates container name is not `zokrates` is.
    // Should be change `/zokrates` to yours.
    if (containers[i].Names[0] == '/zokrates') {
            zokrates = containers[i];
        }
    }

console.log("selected Container ID :", zokrates.Id);

var con = docker.getContainer(zokrates.Id);

// getCreateParams
genProof(con, "232310020822901034104762510965330293111 290107346578087637545360782727286918188 910473606 239207701314920212136923811659422657801 0 11 210219292964116369102883671286459321076 227322991366389551999749449849806758625 2660197181 16319012648326391858874240100255177854 0 9 42022122505097917127364068979301637648 120910671520054972343429929459551033400 0 2");

});




