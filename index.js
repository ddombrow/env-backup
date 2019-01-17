const { promisify } = require("util");

const fs = require("fs");
const archiver = require("archiver");

const path = require("path");
const readFile = promisify(fs.readFile);
const stat = promisify(fs.lstat);   
const readDir = promisify(fs.readdir);
const access = promisify(fs.access);

const filePath = process.argv[2];
const outPath = process.argv[3];

function run(basePath) {
    return new Promise((resolve, reject) => {
        const outFile = path.resolve(outPath + "/env-backup.zip");
        const output = fs.createWriteStream(outFile);
        const archive = archiver("zip", {
            zlib: { level: 9 } // Sets the compression level.
        });

        output.on("close", function() {
            console.log("done writing archive: ", outFile);
            console.log(archive.pointer() + " total bytes.");
            resolve(true);
        });

        output.on("end", function() {
            console.log("Data has been drained");
        });

        archive.on("warning", function(err) {
            if (err.code === 'ENOENT') {
              // log warning
              console.log("warning, could not find file");
            } else {
              // throw error
              reject(err);
            }
        });
           
        // good practice to catch this error explicitly
        archive.on("error", function(err) {
            reject(err);
        });

        // pipe archive data to the file
        archive.pipe(output);
        
        archive.glob("*/.env",  {
            cwd: basePath
        });

        archive.finalize();
    });
}

run(filePath)
    .then(() => {
        console.log("Done!");
        process.exit(0);
    })
    .catch(e => {
        console.log(e);
        process.exit(-1);
    });


