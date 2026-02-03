# Windows Subsystem for Linux (WSL) installation guide

This guide will help you install WSL on Windows to run Linux-based bioinformatics tools.

## Prerequisites

- Windows 10 version 2004 or higher, or Windows 11
- At least 20 GB free disk space

## Installation steps

### Method 1: Simple installation (Windows 11 or Windows 10 version 2004+)

1. Open PowerShell or Command Prompt as **Administrator**
   - Right-click Start menu → "Windows Terminal (Admin)"

2. Run the following command:

```powershell
wsl --install
```

3. Restart your computer when prompted

4. After restart, Ubuntu will automatically install and ask you to:
   - Create a username (lowercase, no spaces)
   - Create a password (you won't see characters as you type)

### Method 2: Manual installation (Older Windows versions)

1. **Enable WSL Feature**

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

2. **Enable Virtual Machine Platform**

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

3. **Restart your computer**

4. **Download and install the WSL2 Linux kernel update**
   - Visit: https://aka.ms/wsl2kernel
   - Download and run the installer

5. **Set WSL2 as default**

```powershell
wsl --set-default-version 2
```

6. **Install Ubuntu from Microsoft Store**
   - Open Microsoft Store
   - Search for "Ubuntu 22.04 LTS"
   - Click "Get" to install

## Post-installation setup

### 1. Update Ubuntu

Before proceeding with the installation, it's important to ensure your system packages are up to date. This step updates the package lists and upgrades all installed packages to their latest versions.

```bash
# Refresh the package index,
sudo apt update

# Perform the actual upgrade with automatic confirmation (`-y` flag).
sudo apt upgrade -y
```

### 2. Install essential tools

```bash
sudo apt install -y build-essential curl wget git vim nano unzip ca-certificates
```

### 3. Verify installation

```bash
# Check Ubuntu version
lsb_release -a

# Check available disk space
df -h

# Check WSL version
wsl --list --verbose
```

## Accessing Windows files from WSL

Your Windows drives are mounted under `/mnt/`:

```bash
# Access C: drive
cd /mnt/c/

# Access D: drive
cd /mnt/d/

# Navigate to your Documents folder
cd /mnt/c/Users/YOUR_USERNAME/Documents/
```

## Accessing WSL Files from Windows

In Windows File Explorer, type:

```
\\wsl$\Ubuntu\home\YOUR_USERNAME
```

Or access via:
- File Explorer → Linux → Ubuntu

---

## Troubleshooting

### Issue: "WSL 2 requires an update to its kernel component"

**Solution**: Download and install the WSL2 kernel update from https://aka.ms/wsl2kernel

### Issue: Installation hangs or fails

**Solution**:
```powershell
# Reset WSL
wsl --shutdown
wsl --unregister Ubuntu-22.04
wsl --install
```

### Issue: "This app can't run on your PC"

**Solution**: Ensure virtualization is enabled in BIOS/UEFI settings

### Issue: Slow performance

**Solution**: Ensure you're using WSL2, not WSL1
```powershell
wsl --set-version Ubuntu-22.04 2
```

## Additional Resources

- [Official WSL Documentation](https://docs.microsoft.com/en-us/windows/wsl/)
- [WSL Best Practices](https://docs.microsoft.com/en-us/windows/wsl/setup/environment)

