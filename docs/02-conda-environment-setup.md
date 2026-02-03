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

