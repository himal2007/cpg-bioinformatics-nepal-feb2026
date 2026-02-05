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

---

## Step 2: FastQC - Standard Quality Metrics

**What is FastQC?**
- Bioinformatics tool for sequencing quality assessment
- Generates HTML reports with quality graphs
- Works for both Illumina and nanopore data

### Run FastQC

```bash
# Create output directory
mkdir -p analysis/qc/fastqc_raw/

# Run one at a time first

fastqc data/raw_reads/barcode10.fastq.gz -o analysis/qc/fastqc_raw/ -t 8
fastqc data/raw_reads/barcode11.fastq.gz -o analysis/qc/fastqc_raw/ -t 8


# Run FastQC on both samples in parallel
cat reads_paths.tab  | parallel -j 1 --colsep '\t' 'fastqc {2} -o analysis/qc/fastqc_raw -t 8'
```

**Command explanation:**
- `cat reads_paths.tab`: Read sample paths
- `parallel -j 1`: Process 1 sample at a time (increase for faster processing)
- `--colsep '\t'`: Tab-separated columns
- `{2}`: Second column (file path)
- `-o`: Output directory
- `-t 8`: Use 8 threads

### View FastQC results

```bash
# List generated files
ls -lh analysis/qc/fastqc_raw/

# Open HTML report in browser (WSL/Linux)
firefox analysis/qc/fastqc_raw/Barcode10_Spike2_fastqc.html &
# Or for WSL: explorer.exe analysis/qc/fastqc_raw/Barcode10_Spike2_fastqc.html
```

**Key metrics to check:**
- ✓ **Per base sequence quality**: Q scores along read length
- ✓ **Per sequence quality scores**: Overall quality distribution
- ⚠️ **Per base sequence content**: May show warnings (expected for nanopore)
- ⚠️ **Sequence length distribution**: Variable for nanopore (normal!)

**For nanopore data:**

- Orange/red warnings are common and often acceptable
- Focus on: quality scores, read lengths, total sequences

---

## Step 3: MultiQC - aggregate reports

**What is MultiQC?**
- Combines multiple QC reports into one interactive HTML
- Accepts outputs from FastQC, NanoPlot, Fastp, and many other tools
- Useful for comparing samples side-by-side
- Creates publication-ready figures

### Run MultiQC

```bash
# Aggregate all FastQC outputs
cd analysis/qc/
multiqc fastqc_raw/ -o multiqc_raw/


# Return to project root
cd ~/nanopore_training
```

**Command explanation:**
- `.`: Current directory (containing FastQC outputs)
- `-o ../multiqc_raw`: Output to parent directory

### View MultiQC report

```bash
# Open MultiQC report
firefox analysis/qc/multiqc_raw/multiqc_report.html &
```

**What to look for:**
- Sample comparison in side-by-side plots
- General statistics table (reads, quality, length)
- Any outlier samples
- Consistent quality across samples

---

## Step 4 [OPTIONAL - Only if you have time]: NanoPlot - Nanopore-Specific QC 

**What is NanoPlot?**
- Designed specifically for Oxford Nanopore data
- Provides detailed read length and quality statistics

### Run NanoPlot

```bash
# Create output directory
mkdir -p analysis/qc/nanoplot_raw/

# Run NanoPlot on each sample
cat reads_paths.tab \
  | parallel -j 1 --colsep '\t' \
    'NanoPlot \
       --fastq {2} \
       --outdir analysis/qc/nanoplot_raw/{1} \
       --prefix {1}_ \
       --threads 8 \
       --plots dot kde'
```

**Command explanation:**
- `--fastq {2}`: Input FASTQ file
- `--outdir`: Output directory (separate folder per sample)
- `--prefix {1}_`: Add sample name prefix to output files
- `--plots dot kde`: Create dot plot and kernel density estimate plots

### View NanoPlot Results

```bash
# Check generated files for one sample
ls -lh analysis/qc/nanoplot_raw/barcode10/

# Open NanoPlot HTML report
firefox analysis/qc/nanoplot_raw/barcode10/barcode10_NanoPlot-report.html &
```

**Key NanoPlot metrics:**

| Metric | What it means | Good values (for bacteria) |
|--------|---------------|----------------------------|
| **Number of reads** | Total sequencing output | 50,000+ |
| **Mean read length** | Average read size | 2,000-5,000 bp |
| **Mean read quality** | Average Q score | Q10+ acceptable, Q12+ good |
| **N50** | 50% of bases in reads ≥ this length | 3,000+ bp |
| **Total bases** | Total sequencing output | 200 Mb+ |

### Quick Stats Summary

```bash
# Extract key statistics from NanoPlot
echo "=== Read Statistics Summary ==="
for sample in barcode10 barcode11; do
  echo ""
  echo "Sample: $sample"
  grep -E "Number of reads|Mean read length|Mean read quality|Read length N50" \
    analysis/qc/nanoplot_raw/${sample}/${sample}_NanoStats.txt
done
```

---
