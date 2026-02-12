[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

# CPG bioinformatics workshop Nepal - Feb 2026

## Centre for Pathogen Genomics (CPG), The University of Melbourne

This hands-on training focuses on analysing Oxford Nanopore Technologies (ONT) sequencing data for microbial pathogen detection. Participants will learn how to process and analyse nanopore sequencing data using web-based (Galaxy/CPG Portal) and command-line interface (CLI) tools.

### Prerequisites

- Basic understanding of molecular biology and microbiology
- Access to a computer with an internet connection
- Familiarity with command-line interface (helpful but not required)


### Learning Objectives

By the end of this training, participants will be able to:

- Understand the use of Galaxy and CPG Portal for bioinformatics analyses
- Understand the basics of using the command-line interface (CLI)
- Understand the bioinformatics workflow for pathogen detection using nanopore sequencing data
  
  - Perform quality control and preprocessing of nanopore reads
  - Perform taxonomic profiling to identify pathogens
  - **Optional**: Assemble bacterial genomes from processed nanopore reads
  - **Optional**: Detect antimicrobial resistance (AMR) genes

## Requirements - please set up before the training 🗂️🛠️

Before the start of the course, please create an account for the following web services (free):

- [Galaxy](https://usegalaxy.org.au/login/start) Click the `Register here` button at the bottom
- [CPG Portal](https://portal.cpg.unimelb.edu.au) Click the `Sign Up` button on the top right

If you want to use command-line tools, please ensure you have access to a Unix-based system (Linux or MacOS) or install WSL2 on Windows. Additionally, install conda for package management.

1. **Install WSL** (Windows users): Follow [WSL installation guide](docs/01-wsl-installation.md)
2. **Setup Conda Environment**: Follow [`conda` setup guide](docs/02-conda-environment-setup.md)
3. **Download data and databases**: Follow [Data download guide](docs/03-data-download.md)

## Precourse material - read/watch at your leisure 

Training material for pathogen detection using nanopore reads
- [Pathogen detection from (direct Nanopore) sequencing data using Galaxy - Foodborne Edition](https://training.galaxyproject.org/training-material/topics/microbiome/tutorials/pathogen-detection-from-nanopore-foodborne-data/tutorial.html#pathogen-detection-from-direct-nanopore-sequencing-data-using-ga)

Optional Videos to watch before the course starts:
- [A brief history of Computational Biology and Sequencing](https://youtu.be/idl6oq-MxbM?si=A3ShRWdwoVkjgXqk&t=575)
- [Introduction to Galaxy](https://www.youtube.com/watch?v=64oS5uXVRV0)
- [Galaxy training - Pathogen detection from nanopore sequencing data](https://www.youtube.com/watch?v=rGP-BKYwUbc)

Optional Publication to read:
- [Twenty years of bacterial genome sequencing](https://www.nature.com/articles/nrmicro3565) - Discusses the history of sequencing technology
- [So you want to be a computational biologist?](https://www.nature.com/articles/nbt.2740) - Advice by two bioinformaticians

## Workshop schedule/materials

1. [Introduction to Galaxy for Bioinformatics](https://training.galaxyproject.org/training-material/topics/microbiome/tutorials/pathogen-detection-from-nanopore-foodborne-data/tutorial.html#pathogen-detection-from-direct-nanopore-sequencing-data-using-ga)
2. [Basic Linux command-line skills for bioinformatics](docs/04-linux-cli-introduction.md)
3. [QC, data preprocessing, and taxonomic profiling of nanopore sequencing data](tutorials/01-QC-read-processing.md)
4. _Genome assembly and polishing of bacterial genomes from nanopore data_
5. _**AMR profiling from genome assemblies**_

## Training lecture zoom sessions - NPHL (11-16th Feb)

Join from PC, Mac, iOS or Android: [**zoom link**](https://unimelb.zoom.us/j/84078745303?pwd=JlG7X57vbG6HbWdoI2dXnbBs19WKif.1)  **Password**: `052674` 

**Download** full program schedule [ here](docs/schedule-NPHL.pdf)

## CPG ONT QC guidelines

1. [Setting up your PC for ONT QC analysis](docs/05-setup-cpg-ont-qc.md)
2. [Running ONT QC with the CPG guidelines](docs/06-run-cpg-ont-qc.md)

## Acknowledgments

- **Centre for Pathogen Genomics (CPG)**, **MDU-PHL**, and **The University of Melbourne** for funding and supporting this training
- **Galaxy Training Network** for the training materials
- **Kathmandu University**, **Shubham Biotech Nepal**, and **National Public Health Laboratory, Nepal** as partners in delivering this training
- All contributors and participants

**Happy Learning! 🧬🔬💻**

---

## License

This training material is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

