# Tutorial 1: Quality control of Nanopore Reads and processing of reads

Learn to assess and visualise the quality of Oxford Nanopore sequencing data using FastQC, MultiQC, and NanoPlot and perform adapter trimming and quality filtering with Porechop and Fastp.

## Prerequisites

- Conda environment activated: `conda activate pathogen_detection`
- Raw FASTQ files downloaded to `data/raw_reads/`

## Learning objectives

By the end of this tutorial, you will:
- Understand quality metrics for nanopore data
- Generate QC reports using FastQC and NanoPlot [Optional]
- Process reads with Porechop and Fastp for adapter trimming and quality filtering 
- Aggregate reports with MultiQC
- Interpret quality metrics to assess data suitability

---

## Step 1: Verify your data and prepare the sample paths file

If you have not downloaded the data yet, please follow the [Data download guide](docs/03-data-download.md) before proceeding.

```bash
# Navigate to project directory
cd ~/nanopore_training

# Check your data files
ls -lh data/raw_reads/

# rename the data files
mv data/raw_reads/Barcode10_Spike2.fastq.gz data/raw_reads/barcode10.fastq.gz
mv data/raw_reads/Barcode11_Spike2b.fastq.gz data/raw_reads/barcode11.fastq.gz

# create the tab-separated sample paths file
# first create using Excel
ls $PWD/data/raw_reads/*.fastq.gz

# copy the path to the Excel file and create a tab-separated file with the sample name and path
nano reads_paths.tab
# paste the content into reads_paths.tab

# EASY WAY: create the sample paths file using command line

ls $PWD/data/raw_reads/*.fastq.gz | awk -F'/' '{ split($NF, a, "."); print a[1] "\t" $0 }' > reads_paths.tab

# Verify reads_paths.tab exists
cat reads_paths.tab
```
