# mount linux disk to path permanently

If you add a disk to your Linux server, you should manually attach the disk to the path you want your k8s cluster to use, for example `/var/lib/docker` if you use Docker, or `/var/lib/containerd` if you use `containerd`. Note that if you use a storage class, you should have a SEPARATE disk for that.

From my example, I will mount the disk to `/var/lib/containerd`, you can change it to your desired path.

## Steps to Mount a Disk to `/var/lib/containerd` permanently

### 1. Find your disk:

```bash
lsblk -f
```

Example output:

```bash
sdd    ext4     1.0      7740b599-faa8-4d6d-b965-d5bd298aab00
```

### 2. Format the disk (if new), use ext4 format if you like it :)

WARNING: FORMAT WILL LOSE ALL DATA IN the disk, only do ONCE

```bash
sudo mkfs.ext4 /dev/sdd
```

### 3. Backup existing containerd data (if needed)

```bash
sudo systemctl stop kubelet
sudo systemctl stop containerd
sudo mv /var/lib/containerd /var/lib/containerd.bak
# NOTE THAT IF PATH EXISTS -> cannot mount,
# so you can backup or remove it if you want.
```

### 4. Get the disk UUID

```bash
sudo blkid /dev/sdd # for example
```

Example:

```bash
/dev/sdd: UUID="7740b599-faa8-4d6d-b965-d5bd298aab00" TYPE="ext4"
```

### 5. Edit `/etc/fstab` in root user

```bash
vim /etc/fstab
```

Add line:

```bash
UUID=7740b599-faa8-4d6d-b965-d5bd298aab00 /var/lib/containerd ext4 noatime,nodiratime,discard 0 2
```

### 6. Mount and restore data

```bash
sudo mkdir -p /var/lib/containerd
sudo systemctl enable --now containerd
sudo mount -a
# if you backup the containerd above, use this
# if not just skip, the path will auto init on reboot
# sudo rsync -a /var/lib/containerd.bak/ /var/lib/containerd/
```

### 7. Restart services

```bash
sudo systemctl enable --now containerd
sudo systemctl enable --now kubelet
```

IMPORTANT: reboot the linux server to make sure everything is working fine,

Then check `lsblk -f` to see if the disk is mounted successfully or not. If the disk is not mounted, review the steps above to ensure all configurations are correct. If issues persist, consider checking the system logs for any error messages related to the mounting process.