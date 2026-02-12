## Install with Windows

1. Use `WSL` to run `unix` (you don't need this for mac or linux OS's)

```sh
wsl --install
wsl.exe -d Ubuntu
# set username and password
```

2. Install `conda`

```sh
# make directory
cd ~
mkdir ~/miniconda3/

# download installer
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
## OR PUT miniconda.sh INTO FOLDER FROM HARD DRIVE

## to open a location from WSL terminal in file explorer run
explorer.exe .

# run installer
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3

# remove installer 
rm ~/miniconda3/miniconda.sh
# refresh shell
source ~/miniconda3/bin/activate
# initialise conda
conda init --all
```

3. Log in to unix environment after closing PowerShell (you don't need this for Mac or linux OS's)

```sh
# Unix user account: 
# password: 
```

4. Create directory to store repository locally

```sh
mkdir ~/Tools/

# clone repository to newly created directory
git clone https://github.com/centre-pathogen-genomics/CPGIH_Utility.git ~/Tools/CPGIH_Utility
## OR PUT /CPGIH_Utility/ INTO FOLDER FROM HARD DRIVE
```

5. Create conda environment into which you will install the software

```sh
conda create -n cpgih_utility -y

# activate the conda environment
conda activate cpgih_utility

# install the required software 
conda install -c bioconda -c conda-forge kraken2 shovill seqkit csvtk flye emu python=3.12.3 -y
conda install anaconda::gawk

```

6. Update `$BRIDGE_SCRIPT_DIR` and `$BRIDGE_WORKING_DIR`. These two variables need to be set to the local directory of the CPGIH_Utility repo scripts directory and the working directory of the machine respectively.
eg. `BRIDGE_SCRIPT_DIR=/home/cpgih/Tools/CPGIH_Utility/Scripts` and `BRIDGE_WORKING_DIR=/mnt/c/Users/charl/OneDrive/Desktop`.

```sh
# Set these with the following:

conda env config vars set BRIDGE_SCRIPT_DIR=/home/cpgih/Tools/CPGIH_Utility/Scripts
conda env config vars set BRIDGE_WORKING_DIR=/mnt/c/Users/charl/OneDrive/Desktop

# restart env to load
conda deactivate
conda activate cpgih_utility
# confirm location is set
conda env config vars list
```

7. Setup DBs

i. `kraken2` database

```sh
# make kraken directory
mkdir ~/kraken2_db

# download db
curl -o ~/kraken2_db/kraken2_db.tar.gz https://genome-idx.s3.amazonaws.com/kraken/k2_standard_16gb_20241228.tar.gz
## OR PUT kraken2_db.tar.gz INTO FOLDER FROM HARD DRIVE

# extract db
tar -xzf ~/kraken2_db/kraken2_db.tar.gz -C ~/kraken2_db 

# check it worked AND THE COMPUTER CAN RUN IT
kraken2-inspect --db ~/kraken2_db | head

# delete tarball to save space
rm ~/kraken2_db/kraken2_db.tar.gz 

# tell conda where to find it
conda env config vars set KRAKEN2_DEFAULT_DB=$HOME/kraken2_db

# restart env to load
conda deactivate
conda activate cpgih_utility
# confirm location is set
conda env config vars list
```

ii. `emu` database

```sh
# make emu directory
mkdir ~/emu_db

# tell conda where to find it
export EMU_DATABASE_DIR=$HOME/emu_db/
# enter db directory
cd ${EMU_DATABASE_DIR}

# download db
pip install osfclient
osf -p 56uf7 fetch osfstorage/emu-prebuilt/emu.tar
## OR PUT emu.tar INTO FOLDER FROM HARD DRIVE

# extract
tar -xvf emu.tar

# remove tarball
rm emu.tar
```

8. Reload tools after update

```sh
# login to wsl and change location
wsl
cd /home/cpgih

# delete Tools/
sudo rm -r Tools

# create directory to store repository locally
mkdir ~/Tools/

# clone repository to newly created directory
git clone https://github.com/centre-pathogen-genomics/CPGIH_Utility.git ~/Tools/CPGIH_Utility
```

9. Wrapper scripts setup

```sh
# Wraps both illumina_genomesqc.sh, ont_genomesqc.sh as command line application
# Add scripts directory to the path of the machine:

echo 'export PATH=$PATH:[REPO_PATH]/Scripts' | tee -a ~/.bashrc >> ~/.zshrc

eg. `echo 'export PATH=$PATH:/home/cpgih/Tools/CPGIH_Utility/Scripts' | tee -a ~/.bashrc >> ~/.zshrc
```

10. HOW TO CHANGE THE FILE LOCATION WITH THE WRAPPER SCRIPT

You can change the path to your input files by running this code again and changing the location

```sh
conda env config vars set BRIDGE_WORKING_DIR=/mnt/c/Users/charl/OneDrive/Desktop
```

