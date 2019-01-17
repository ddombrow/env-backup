# env-backup

Purpose:  I you have a lot of directories with env files you want to back up.

## Usage

`node index.js <source path> <output dir>`

source path - the root dir you want to start from.  All files matching the pattern "*/.env" descending from the source path will be copied to the archive.

output dir - the dir to output the backup file, which will be saved as output_dir/env-backup.zip