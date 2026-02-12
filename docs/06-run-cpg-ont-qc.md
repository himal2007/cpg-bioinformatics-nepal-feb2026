# Running ONT isolate QC

```sh
# login to unix environment in powershell (in windows)

wsl

# activate conda environment
conda activate cpgih_utility
```

Make sure that your data is on the **DESKTOP** in a folder labelled your **RUN NAME**.

In this folder, you will have a folder called 'fastq_pass', in which there will be folders named after the barcodes eg. 'barcode01', in which your fastq.gz files will reside.

Edit the `RENAMING.TSV` FILE (saved to share_file_templates directory on the desktop) to have the list of all the samples to be analysed (one per line) 

The format is 'barcode## TAB samplename' MAKE SURE THE SEPARATOR IS A TAB - example:

```sh
barcode25	Sample01
barcode26	Sample02
barcode27	Sample03
```

Edit the NAMES FILE (saved to share_file_templates directory on the desktop) to have the list of all the samples to be analysed (one per line, with no spaces) - example:

```sh
Sample01
Sample02
```

Run the following:

```sh
ont_seq [RUN_NAME]

#eg. 
ont_seq ONT_test
```
