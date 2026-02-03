# Conda environment setup guide

This guide will help you install Miniconda and set up the bioinformatics environment for the training.

## What is Conda?

Conda is a package and environment management system that makes it easy to install bioinformatics software and manage dependencies.

## Installing Miniconda

### For Linux/WSL

```bash
# Download Miniconda installer
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh

# Run the installer
bash Miniconda3-latest-Linux-x86_64.sh

# Follow the prompts:
# - Press Enter to review license
# - Type 'yes' to accept
# - Press Enter to confirm installation location
# - Type 'yes' to initialise Miniconda

# Activate conda
source ~/.bashrc

# Verify installation
conda --version
```

### For macOS

```bash
# Download Miniconda installer
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh

# Run the installer
bash Miniconda3-latest-MacOSX-x86_64.sh

# Follow the same prompts as Linux
source ~/.bashrc
conda --version
```

## Configuring Conda

### Add Bioconda and Conda-Forge channels

```bash
# Add channels in the correct order
conda config --add channels conda-forge
conda config --add channels bioconda

# Verify channels
conda config --show channels
```

## Creating the training environment

### Method 1: Manual Installation

```bash
# Create a new environment with Python
conda create -n pathogen_detection python=3.9 -y

# Activate the environment
conda activate pathogen_detection

# Install bioinformatics tools
conda install -c bioconda fastqc multiqc nanoplot porechop fastp minimap2 samtools kraken2 krona flye medaka quast abritamr  -y

# Install additional tools
conda install -c conda-forge wget curl csvtk parallel -y

# Install amrfinderplus separately
conda install -y -c conda-forge -c bioconda --strict-channel-priority ncbi-amrfinderplus
```

### Method 2: Using environment.yml file

Use the [pathogen_detection.yml](../conda/pathogen_detection.yml) file provided in the repository to create the environment with all required packages.

```bash
# create pathogen_detection.yml
nano pathogen_detection.yml

# Create environment from file
conda env create -f pathogen_detection

# Activate the environment
conda activate pathogen_detection
```
## Troubleshooting

### Issue: Conda command not found

**Solution**:
```bash
# Re-initialize conda
source ~/miniconda3/bin/activate
conda init bash
source ~/.bashrc
```

### Issue: Slow package installation

**Solution**:
```bash
# Use mamba (faster alternative to conda)
conda install mamba -c conda-forge -y
mamba install <package-name>
```

### Issue: Package conflicts

**Solution**:
```bash
# Create clean environment
conda create -n pathogen_detection_clean python=3.9 -y
conda activate pathogen_detection_clean
# Install packages one by one
```

### Issue: Permission errors

**Solution**:
```bash
# Don't use sudo with conda
# If you installed Miniconda with sudo, reinstall without it
```

## Additional Resources

- [Conda Documentation](https://docs.conda.io/)
- [Bioconda](https://bioconda.github.io/)
- [Conda-forge documentation](https://conda-forge.org/docs/)
- [Mamba Documentation](https://mamba.readthedocs.io/)


