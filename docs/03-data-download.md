# Data download and setup databases

This guide will help you download the training datasets, databases, and reference files needed for the bioinformatics analysis.


## Training dataset overview

We will use publicly available Oxford Nanopore sequencing data of chicken samples spiked with *Salmonella* species from the Galaxy Training Network.

### Dataset Details

| Sample ID | Barcode | Species | Subspecies | Source |
|-----------|---------|---------|------------|--------|
| Sample 1 | Barcode10 | *Salmonella enterica* | subsp. *enterica* | Spiked chicken sample |
| Sample 2 | Barcode11 | *Salmonella enterica* | subsp. *houtenae* | Spiked chicken sample |

**Data Source**: [Galaxy Training Network - Zenodo](https://zenodo.org/record/11222469)

## Setting up directory structure

First, create the necessary directory structure for organizing your data and analysis.

```bash
# Navigate to your working directory
cd ~

# Create main project directory
mkdir nanopore_training
cd nanopore_training

# Create directory structure
mkdir -p data/raw_reads
mkdir -p data/processed_reads
mkdir -p databases/kraken2
mkdir -p databases/references

# Verify structure
tree
```

## Downloading raw reads

```bash
# Navigate to raw_reads directory
cd ~/nanopore_training/data/raw_reads/

# Download Sample 1 (Barcode10)
wget https://zenodo.org/record/11222469/files/Barcode10_Spike2.fastq.gz

# Download Sample 2 (Barcode11)
wget https://zenodo.org/record/11222469/files/Barcode11_Spike2b.fastq.gz

# Verify downloads
ls -lh
```

## Download processed reads 

We might not be able to process the raw reads during the tutorial due to time constraints. This is to have a processed dataset ready for the downstream analysis steps.

```bash
# Navigate to processed_reads directory
cd ~/nanopore_training/data/processed_reads/

# Download preprocessed Sample 1
wget https://zenodo.org/record/11222469/files/preprocessed_sample_barcode10_spike2.fastq.gz

# Download preprocessed Sample 2
wget https://zenodo.org/record/11222469/files/preprocessed_sample_barcode11_spike2b.fastq.gz

# verify downloads
ls -lh
```

## Downloading reference genomes - Chicken reference genome (galGal6)

For host filtering, we need the chicken reference genome:

```bash
# Navigate to references directory
cd ~/nanopore_training/databases/references/

# Download chicken genome (galGal6) - ~332M
wget https://hgdownload.soe.ucsc.edu/goldenPath/galGal6/bigZips/galGal6.fa.gz

# Verify download
ls -lh
```

### Download assembled genomes

If we can't go through assembly steps, we can download pre-assembled genomes for the *Salmonella* subspecies:

```bash
# Navigate to references directory
cd ~/nanopore_training/data/assembly/
# Download assembled genome for subsp. enterica
wget https://zenodo.org/record/11222469/files/Contigs_Barcode10.fasta
# Download assembled genome for subsp. houtenae
wget https://zenodo.org/record/11222469/files/Contigs_Barcode11.fasta
```

## Downloading kraken2 databases

### BabyKraken database (light weight)

BabyKraken is a compact database (~11 MB) optimised for bacterial pathogens.

```bash
# Navigate to kraken2 directory
cd ~/nanopore_training/databases/kraken2/

# Download BabyKraken database
curl -L https://github.com/MDU-PHL/babykraken/blob/master/dist/babykraken.tar.gz?raw=true | tar -xz

# Verify extraction
ls -lh babykraken/

# Expected contents:
# - hash.k2d
# - opts.k2d
# - taxo.k2d
```

### Alternative: Standard Kraken2 Database

If you have more storage and want a comprehensive database:

```bash
# Download standard 16GB database (~16GB compressed, ~50GB uncompressed)
cd ~/nanopore_training/databases/kraken2/

# Create directory
mkdir -p standard_16gb
cd standard_16gb

# Download (this will take time!) using curl with resume support

curl -C - -O https://genome-idx.s3.amazonaws.com/kraken/k2_standard_16gb_20241228.tar.gz 

# Extract
tar -xzf k2_standard_16gb_20241228.tar.gz

# Clean up compressed file
# rm k2_standard_16gb_20241228.tar.gz
```

### Update Krona Taxonomy Database

For visualisation with Krona for taxonomic classification results, we need to update the Krona taxonomy database. This is a one-time setup step.

```bash
# Update Krona taxonomy database (one-time setup)
ktUpdateTaxonomy.sh

# This downloads NCBI taxonomy to:
# ~/miniconda3/envs/pathogen_detection/opt/krona/taxonomy/
```




