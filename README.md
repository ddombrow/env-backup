# env-backup

Purpose:  If you have a lot of directories with .env files you want to back up.

## Usage

`node index.js <source path> <output dir>`

source path - the root directory you have all your source directories in.  All files matching the pattern `*/.env` descending from this path will be copied to the archive.

output dir - the directory to output the backup file, which will be saved as output_dir/env-backup.zip
