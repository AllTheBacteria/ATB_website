---
title: Documentation
layout: docs
toc: true
---
__Full documentation is on [readthedocs ↗](https://allthebacteria.readthedocs.io/en/latest/).__

Some highlighted features are also documented here

## Searching and querying the assemblies

The ATB dataset has been indexed with [LexicMap](https://github.com/shenwei356/LexicMap) which supports
searching and alignment to the full dataset (i.e. a BLAST-like search) using sequences >100bp in length.

{{< tabs items="Local,AWS" >}}

  {{< tab >}}

    ### Local search after indexing assemblies yourself 
   
    This option requires a small (80Gb) download, but indexing the assemblies took 150Gb RAM, and 47 hours with 48 CPUs.
    Details on how to do this are here:
    https://allthebacteria.readthedocs.io/en/latest/lexicmap.html#building-an-index-and-searching-locally
    
    ### Local search with pre-built index 
    This option avoids the high RAM indexing, but it does mean you have a very large (5 Tb) download.
     
    Install `awscli` via conda.
    ```
    conda install -c conda-forge awscli
    ```

    Test access.
    ```
    aws s3 ls s3://allthebacteria-lexicmap/202408/ --no-sign-request

    # output
                                PRE genomes/
                                PRE seeds/
        2025-04-08 16:39:17      62488 genomes.chunks.bin
        2025-04-08 16:39:17   54209660 genomes.map.bin
        2025-04-08 22:32:35        619 info.toml
        2025-04-08 22:32:36     160032 masks.bin
    ```

    Download the index (it’s 5.24 TiB!!!, make sure you have enough disk space).

    ```
    aws s3 cp s3://allthebacteria-lexicmap/202408/ atb.lmi --recursive --no-sign-request

    # dirsize atb.lmi
    atb.lmi: 5.24 TiB (5,758,875,365,595)
        2.87 TiB      seeds
        2.37 TiB      genomes
        51.70 MiB      genomes.map.bin
    156.28 KiB      masks.bin
        61.02 KiB      genomes.chunks.bin
            619 B      info.toml
    ```

    [Install](https://bioinf.shenwei.me/LexicMap/installation/>) and [search](https://bioinf.shenwei.me/LexicMap/tutorials/search/) with LexicMap.
  {{< /tab >}}

  {{< tab >}}
    ### Searching on AWS EC2

    1. [Launch an EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/LaunchingAndUsingInstances.html)
    **in Europe London region (eu-west-2)** where the index is located.

    -  OS: Amazon Linux 2023 64-bit (**Arm**)
    -  Instance type (You might need to [increase the limit of CPUs](http://aws.amazon.com/contact-us/ec2-request)):

        -  c7g.8xlarge (32 vCPU, 64 GiB memory, 15 Gigabit, 1.3738 USD per Hour)
        -  c6gn.12xlarge (48 vCPU, 96 GiB memory, 75 Gigabit, 2.46 USD per Hour) (**recommended**)

    -  Storage: 20 GiB General purpose (gp3), only for storing queries and results.

    2. [Connect to the instance via online console or a ssh client](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect.html).

    3. Mount the LexicMap index with [mount-s3](https://github.com/awslabs/mountpoint-s3>) (it’s fast but still slower than local disks).

    ```
    # Install mount-s3. You might need to replace arm64 with x86_64 for other architectures
    wget https://s3.amazonaws.com/mountpoint-s3-release/latest/arm64/mount-s3.rpm
    sudo yum install -y ./mount-s3.rpm
    rm ./mount-s3.rpm

    # Mount the v0.2+202408 index
    mkdir -p atb.lmi
    UNSTABLE_MOUNTPOINT_MAX_PREFETCH_WINDOW_SIZE=65536 \
        mount-s3 --read-only --prefix 202408/ allthebacteria-lexicmap atb.lmi --no-sign-request
    ```

    4. Install LexicMap.

    ```
    # Check the latest version here: https://github.com/shenwei356/LexicMap/releases
    # You can also check the pre-release here: https://github.com/shenwei356/LexicMap/issues/10
    # Binary's path depends on the architecture of the CPUs: amd64 or arm64
    wget https://github.com/shenwei356/LexicMap/releases/download/v0.7.0/lexicmap_linux_arm64.tar.gz

    mkdir -p bin
    tar -zxvf lexicmap_linux_arm64.tar.gz -C bin
    rm lexicmap_linux_arm64.tar.gz
    ```

    5. [Upload queries](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/linux-file-transfer-scp.html>)
    ```
    # Here, we use a demo query
    wget https://github.com/shenwei356/LexicMap/raw/refs/heads/main/demo/bench/b.gene_E_faecalis_SecY.fasta
    ```

    6. Run LexicMap ([tutorial](https://bioinf.shenwei.me/LexicMap/tutorials/search/>)).

    ```
        # Create and enter a screen session
        screen -S lexicmap

        # Run
        #   Searching with b.gene_E_faecalis_SecY.fasta takes 20 minutes with c7g.8xlarge, 12.5 minutes with c6gn.12xlarge
        #   Searching with b.gene_E_coli_16S.fasta      takes 1h54m with c6gn.12xlarge.
        lexicmap search -d atb.lmi b.gene_E_faecalis_SecY.fasta -o query.lexicmap.txt.gz --debug
    ```

    7. Unmount the index.

    ```
        sudo umount atb.lmi
    ```
  {{< /tab >}}

{{< /tabs >}}



