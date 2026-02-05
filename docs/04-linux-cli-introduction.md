# Linux Command-Line Interface (CLI) Basics

This guide introduces essential Linux commands you'll use throughout the bioinformatics training.

## What is the Command Line?

The **command-line interface (CLI)** allows you to interact with your computer by typing text commands instead of clicking icons. For bioinformatics, the CLI is:

- **Powerful**: Can process thousands of files with a single command
- **Reproducible**: Commands can be saved and re-run exactly
- **Efficient**: Faster than GUI for repetitive tasks
- **Universal**: Works on any Linux system or cluster

## Understanding the Shell Prompt

When you open a terminal, you'll see a prompt like:

```bash
username@hostname:~$
```

Breaking it down:
- `username`: Your login name
- `hostname`: Computer name
- `~`: Current directory (~ means home directory)
- `$`: Regular user (# means root/admin)

## Search for help

```bash
# Get help
command --help
# Get manual
man command
```

## File and Directory Management

### 1. Create Directory (`mkdir`)

```bash
# Create single directory
mkdir analysis

# Create multiple directories
mkdir data scripts results

# Create nested directories
mkdir -p analysis/qc/fastqc

# Create with specific permissions
mkdir -m 755 public_data
```

## File System Navigation

### 1. Print Working Directory (`pwd`)

Shows your current location:

```bash
pwd
# Output: /home/username/projects
```

### 2. List Directory Contents (`ls`)

```bash
# Basic listing
ls

# Long format (shows permissions, size, date)
ls -l

# Include hidden files (starting with .)
ls -a

# Human-readable sizes
ls -lh

# Sort by modification time (newest first)
ls -lt

# Reverse sort order
ls -ltr

# Commonly used combination
ls -lah
```

### 3. Change Directory (`cd`)

```bash
# Go to home directory
cd
# or
cd ~

# Go to specific directory
cd /home/username/projects

# Go up one level
cd ..

# Go up two levels
cd ../..

# Go to previous directory
cd -

# Use relative paths
cd data/raw_reads

# Use absolute paths
cd /home/username/analysis/results
```

**Path shortcuts:**
- `~` = Home directory
- `.` = Current directory
- `..` = Parent directory
- `-` = Previous directory
- `/` = Root directory

---

## File and Directory Management

### 1. Create Directory (`mkdir`)

```bash
# Create single directory
mkdir analysis

# Create multiple directories
mkdir data scripts results

# Create nested directories
mkdir -p analysis/qc/fastqc

# Create directory with multiple subdirectories in one command

mkdir -p data/{raw_reads,processed_reads,assemblies}
```

### 2. Create Empty File (`touch`)

```bash
# Create new file
touch sample_list.txt

# Update modification time of existing file
touch existing_file.txt

# Create multiple files
touch file1.txt file2.txt file3.txt
```

### 3. Copy Files and Directories (`cp`)

```bash
# Copy file
cp source.txt destination.txt

# Copy file to directory
cp sample.fastq data/

# Copy directory recursively
cp -r analysis/ backup_analysis/

# Copy multiple files to directory
cp file1.txt file2.txt file3.txt destination_dir/
```

### 4. Move/Rename (`mv`)

```bash
# Rename file
mv old_name.txt new_name.txt

# Move file to directory
mv sample.fastq data/raw/

# Move multiple files
mv file1.txt file2.txt file3.txt destination/

# Move directory
mv old_dir/ new_location/
```

### 5. Remove Files and Directories (`rm`)

```bash
# Remove file
rm file.txt

# Remove directory and contents
rm -r directory/

# Force remove (no confirmation)
rm -f file.txt

# Remove directory recursively, force
rm -rf directory/
```

⚠️ **WARNING**: `rm` is permanent! There's no "Recycle Bin" in Linux.

## Viewing and Editing Files

### 1. View Entire File (`cat`)

```bash
# Display file contents
cat file.txt

# Display with line numbers
cat -n file.txt

# Concatenate multiple files
cat file1.txt file2.txt > combined.txt
```

### 2. View File Page-by-Page (`less`)

```bash
# Open file in pager
less large_file.txt

# Navigation in less:
# Space = next page
# b = previous page
# / = search forward
# ? = search backward
# q = quit
# g = go to start
# G = go to end
```

### 3. View First/Last Lines (`head`/`tail`)

```bash
# First 10 lines (default)
head file.txt

# First 20 lines
head -n 20 file.txt

# Last 10 lines
tail file.txt

# Last 50 lines
tail -n 50 file.txt

# Follow file in real-time (useful for logs)
tail -f logfile.txt

# Follow last 100 lines
tail -n 100 -f analysis.log
```

### 4. Count Lines/Words/Characters (`wc`)

```bash
# Count lines, words, characters
wc file.txt

# Count only lines
wc -l file.txt

# Count only words
wc -w file.txt

# Count characters
wc -c file.txt

# Count reads in FASTQ (lines/4)
echo $((`wc -l < sample.fastq`/4))
```

### 5. Search in Files (`grep`)

```bash
# Search for pattern
grep "pattern" file.txt

# Case-insensitive search
grep -i "pattern" file.txt

# Show line numbers
grep -n "pattern" file.txt

# Count matching lines
grep -c "pattern" file.txt

# Invert match (show non-matching lines)
grep -v "pattern" file.txt

# Search recursively in directory
grep -r "pattern" directory/

# Search with regular expression
grep -E "pattern1|pattern2" file.txt

```

### 6. Text Editors

#### nano (Beginner-friendly)
```bash
# Open file in nano
nano file.txt

# Keyboard shortcuts:
# Ctrl+O = Save
# Ctrl+X = Exit
# Ctrl+W = Search
# Ctrl+K = Cut line
# Ctrl+U = Paste
```

#### vim (Advanced)
```bash
# Open file in vim
vim file.txt

# Basic commands:
# i = Enter insert mode
# Esc = Exit insert mode
# :w = Save
# :q = Quit
# :wq = Save and quit
# :q! = Quit without saving
# /pattern = Search
```

## Process Management

### 1. View Running Processes

```bash
# List all processes
ps aux

# List your processes
ps -u username

# Real-time process viewer
top

# Better process viewer
htop

# Find specific process
ps aux | grep python
```

## Pipes and Redirection

### 1. Redirection

```bash
# Redirect output to file (overwrite)
command > output.txt

# Redirect output to file (append)
command >> output.txt

# Redirect error to file
command 2> error.txt

# Redirect both output and error
command > output.txt 2>&1
# or
command &> output.txt
```

### 2. Pipes (`|`)

```bash
# Chain commands
ls -l | grep ".fastq"

# Count files
ls | wc -l

# Sort and unique
cat file.txt | sort | uniq

# Search and count
grep "pattern" file.txt | wc -l

# Complex pipeline
cat sample.fastq | grep "^@" | wc -l
```

### Command History

```bash
# Show command history
history

# Execute command from history
!123

# Execute previous command
!!

# Execute last command starting with 'cd'
!cd

# Search history
Ctrl+R, then type the search term
```

### Useful keyboard shortcuts

```sh
# Ctrl+C = Terminate current command
# Ctrl+Z = Suspend current command
# Ctrl+D = Exit shell (like 'exit')
# Ctrl+L = Clear terminal (like 'clear')
# Ctrl+W = Delete previous word
# Ctrl+Y = Paste deleted word
# Ctrl+R = Search command history

# tab = Auto-complete file/directory names
# tab twice = Show possible completions
```

---

## Additional Resources

- [Linux Journey](https://linuxjourney.com/) - Interactive learning
- [Explain Shell](https://explainshell.com/) - Explains any command
- [TLDR Pages](https://tldr.sh/) - Simplified man pages

