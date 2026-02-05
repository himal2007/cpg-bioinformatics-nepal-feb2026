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
- Perform taxonomic profiling with Kraken2
- Visualise taxonomic composition with Krona

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

---

## Step 5: Porechop - adapter trimming [Takes time]

**What is Porechop?**
- Removes Oxford Nanopore adapter sequences from reads
- Finds and trims adapters at read ends and internal adapters (chimeras)
- Essential for accurate downstream analysis

**Why remove adapters?**
- Adapters are synthetic sequences added during library preparation
- Can interfere with alignment and assembly
- Cause false positive matches
- Should be removed before analysis


### Run Porechop

```bash
# Create output directory
mkdir -p analysis/qc/porechop/

# Run one sample first to understand the process
porechop -i data/raw_reads/barcode10.fastq.gz -o analysis/qc/porechop/barcode10_trimmed.fastq.gz -t 8
porechop -i data/raw_reads/barcode11.fastq.gz -o analysis/qc/porechop/barcode11_trimmed.fastq.gz -t 8


# Run Porechop on all samples in parallel
# cat reads_paths.tab | parallel -j 1 --colsep '\t' 'porechop -i {2} -o analysis/qc/porechop/{1}_trimmed.fastq.gz -t 8'
# parallel --progress : Show progress bar (optional, may slow down processing)
# parallel --line-buffer : Buffer output line by line (optional, may slow down processing)

```

**Command explanation:**
```bash
porechop \
  -i input.fastq.gz           # Input FASTQ file
  -o output_trimmed.fastq.gz  # Output file (automatically compressed)
  -t 8                        # Number of threads
```

**Default Porechop behavior:**
- Searches for known ONT adapters at read ends
- Trims adapters when found
- Splits reads if internal adapters detected (chimeras)
- Discards very short reads (<1000 bp by default)

### Check Porechop Output

```bash
# View Porechop statistics (printed to terminal)
# Look for lines like:
# "Trimming adapters from read ends"
# "Splitting reads with internal adapters"
# "X reads had adapters trimmed from their start"
# "Y reads had adapters trimmed from their end"

# Count reads before and after
echo "=== Porechop Results ==="
for sample in barcode10 barcode11; do
  echo "Sample: $sample"
  raw=$(zcat data/raw_reads/${sample}.fastq.gz | echo $((`wc -l`/4)))
  trimmed=$(zcat analysis/qc/porechop/${sample}_trimmed.fastq.gz | echo $((`wc -l`/4)))
  echo "  Raw reads: $raw"
  echo "  Trimmed reads: $trimmed"
  echo "  Retained: $(echo "scale=1; $trimmed*100/$raw" | bc)%"
  echo ""
done

# List trimmed files
ls -lh analysis/qc/porechop/

# Compare file sizes (trimmed should be slightly smaller)
echo "=== File size comparison ==="
echo "Raw reads:"
du -h data/raw_reads/*.fastq.gz
echo ""
echo "Trimmed reads:"
du -h analysis/qc/porechop/*.fastq.gz
```

**What to expect:**
- Most reads (95-99%) should pass through
- 1-5% may have adapters trimmed
- Small number of chimeric reads may be split
- Very few reads should be discarded

---

## Step 6: Fastp - Quality filtering and length filtering

**What is Fastp?**
- All-in-one preprocessing tool for FASTQ files
- Performs quality filtering, length filtering, adapter trimming
- Generates comprehensive HTML reports
- Much faster than traditional tools (multithreaded)

**Why quality filter?**
- Remove low-quality reads that may introduce errors
- Filter very short reads (less informative)
- Improve downstream analysis accuracy
- Reduce computational time by removing poor data

### Run Fastp

```bash
# Create output directory
mkdir -p analysis/qc/fastp/

# Run one sample first
fastp \
  -i analysis/qc/porechop/barcode10_trimmed.fastq.gz \
  -o analysis/qc/fastp/barcode10_filtered.fastq.gz \
  --qualified_quality_phred 10 \
  --disable_trim_poly_g \
  --thread 8 \
  --html analysis/qc/fastp/barcode10_fastp.html \
  --json analysis/qc/fastp/barcode10_fastp.json

# Run on all samples in parallel
cat reads_paths.tab \
  | parallel -j 1 --colsep '\t' \
    'fastp \
       -i analysis/qc/porechop/{1}_trimmed.fastq.gz \
       -o analysis/qc/fastp/{1}_filtered.fastq.gz \
       --qualified_quality_phred 10 \
       --disable_trim_poly_g \
       --thread 8 \
       --html analysis/qc/fastp/{1}_fastp.html \
       --json analysis/qc/fastp/{1}_fastp.json'
```

**Command explanation:**
```bash
fastp \
  -i input.fastq.gz                    # Input file
  -o output_filtered.fastq.gz          # Output file
  --qualified_quality_phred 10         # Minimum quality score (Q10)
  --disable_trim_poly_g                # Disable poly-G trimming (not needed for nanopore)
  --thread 8                           # Number of threads
  --html report.html                   # HTML report
  --json report.json                   # JSON report (for MultiQC)
```

**Adjust parameters based on your needs:**
- **More stringent**: `-q 12 -l 1000` (higher quality, longer reads)
- **Less stringent**: `-q 7 -l 300` (keep more reads, lower quality)
- **For assembly**: Consider `-l 1000` or higher
- **For taxonomy**: `-l 500` is usually sufficient

### View Fastp Reports

```bash
# Open HTML report in browser
firefox analysis/qc/fastp/barcode10_fastp.html &

# Or list all reports
ls -lh analysis/qc/fastp/*.html
```

**What to look for in Fastp report:**

**Before filtering section:**
- Total reads and bases
- Quality distribution
- Length distribution

**After filtering section:**
- Reads passing filters (should be 70-95%)
- Quality improvement
- Length distribution after filtering

**Filtering result:**
- Number of reads with low quality (removed)
- Number of reads too short (removed)
- Percentage of reads passed

### Check Fastp Statistics

```bash
echo "=== Fastp Filtering Results ==="
for sample in barcode10 barcode11; do
  echo "Sample: $sample"
  
  # Extract statistics from JSON
  # total_reads=$(grep '"total_reads"' analysis/qc/fastp/${sample}_fastp.json | head -1 | awk '{print $2}' | tr -d ',')
  total_reads=$(grep '"total_reads"' analysis/qc/fastp/${sample}_fastp.json | head -1 | awk -F':' '{print $2}' | tr -d ' ,')
  filtered_reads=$(grep '"total_reads"' analysis/qc/fastp/${sample}_fastp.json | tail -1 | awk '{print $2}' | tr -d ',')
  
  echo "  Before filtering: $total_reads reads"
  echo "  After filtering: $filtered_reads reads"
  echo "  Retained: $(echo "scale=1; $filtered_reads*100/$total_reads" | bc)%"
  echo ""
done
```

**Expected retention:**
- Good quality data: 80-95% reads retained
- Acceptable: 70-80% retained
- Poor quality: <70% retained (may need to relax parameters)

---

## Step 7: FastQC on processed reads [Challenge]

Now let's check the quality of our processed reads to verify improvement.

```bash
# Create output directory
mkdir -p analysis/qc/fastqc_filtered/

# Run FastQC on filtered reads
cat reads_paths.tab \
  | parallel -j 1 --colsep '\t' \
    'fastqc analysis/qc/fastp/{1}_filtered.fastq.gz \
       -o analysis/qc/fastqc_filtered -t 8'
```

### Compare Raw vs Filtered Quality

```bash
# Open both reports side-by-side
firefox analysis/qc/fastqc_raw/barcode10_fastqc.html \
        analysis/qc/fastqc_filtered/barcode10_filtered_fastqc.html &
```

**Expected improvements:**
- ✅ Higher mean quality scores
- ✅ More uniform quality distribution
- ✅ Tighter read length distribution
- ✅ Fewer low-quality reads

---

## Step 8: Comprehensive MultiQC Report

Aggregate all QC reports (raw, Porechop, Fastp, filtered) into one comprehensive report.

```bash
# Create comprehensive MultiQC report
cd analysis/qc/
multiqc . -o multiqc_comprehensive/ --force

# Return to project root
cd ~/nanopore_training
```

**This MultiQC report includes:**
- FastQC results (raw and filtered)
- Fastp filtering statistics
- Before/after comparison
- Sample-wise comparison

### View Comprehensive Report

```bash
# Open comprehensive MultiQC report
firefox analysis/qc/multiqc_comprehensive/multiqc_report.html &
```

**Key sections to review:**

**General Statistics table:**
- Shows all samples with read counts before/after filtering
- Quality metrics
- Percentage retained

**FastQC sections:**
- Compare raw vs filtered quality
- Check for improvements

**Fastp section:**
- Filtering statistics
- Quality before/after
- Length distribution changes

---

## Decision Tree: Proceed or Re-process?

```
Quality Check After Processing:
    ├─ ≥70% reads retained → ✓ Good, proceed to next step
    ├─ 50-70% retained → ⚠ Acceptable, note in report
    ├─ <50% retained → ✗ Poor quality
    │   └─ Options:
    │       ├─ Relax filtering parameters
    │       ├─ Check raw data quality
    │       └─ Consider re-sequencing

Read Quality After Filtering:
    ├─ Mean Q ≥ 10 → ✓ Good
    ├─ Mean Q 7-10 → ⚠ Acceptable
    └─ Mean Q < 7 → ✗ Poor quality, reconsider parameters

Read Length After Filtering:
    ├─ Mean ≥ 2kb → ✓ Excellent for assembly
    ├─ Mean 1-2kb → ✓ Good for most analyses
    ├─ Mean 500-1kb → ⚠ OK for taxonomy, challenging for assembly
    └─ Mean < 500bp → ✗ Too short for bacterial genomics
```

---

## Additional Resources

- [Porechop documentation](https://github.com/rrwick/Porechop)
- [Fastp publication](https://academic.oup.com/bioinformatics/article/34/17/i884/5093234)
- [Kraken2 manual](https://github.com/DerrickWood/kraken2/wiki)
- [Krona tools](https://github.com/marbl/Krona)
- [MultiQC documentation](https://seqera.io/multiqc/)
